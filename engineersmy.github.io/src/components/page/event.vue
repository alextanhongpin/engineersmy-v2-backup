<template>
  <div class="page-event">
    <div class="col-12">
      <break rows="3"></break>

        <!--<span class="page-title">Events in Malaysia</span>-->
        <div class="search">
          <input class="search-input" type="search" @keyup="onSearch" v-model="keyword" placeholder="Search for events..."/>
        </div>

      <br>
      
      <small class="search-response" v-if="searchCount">Found <b>{{searchCount}}</b> {{searchCount === 1 ? 'event' : 'events' }}</small>
      
      <br>

      <div class="section" v-for="section in search">
        <div><b class="section-title">{{section.title}}</b></div>

        <br>

        <div v-for="(groups, index) in section.events"
          class="event-group"
          :class='{"is-today": checkToday(groups.length ? groups[0].date : -1)}'>

          <!--Start looping groups of events-->
          <div v-for="(event, i) in groups">
            <div 
              class="event"
              :class='{"is-expired": checkExpiry(event.date), "is-today": checkToday(event.date)}'>
              <span class="event-date"><b :style="{ 'visibility': i === 0 ? 'visible' : 'hidden' }">{{event.day}}</b>&nbsp;</span><a class="event-link" :href="event.url">{{event.title}}</a>
            </div>
          </div>
          <!--End looping group of events-->
        </div>

        <br>
        <br>
      </div>
    </div>
  </div>
</template>

<script>
import Break from '../atom/break.vue'
import moment from 'moment'
import elasticlunr from 'elasticlunr'
import uuidv4 from 'uuid/v4'
// import githubParser from '../../module/github-event-parser.js'
export default {
  name: 'page-event',
  components: { Break },
  data () {
    return {
      sections: [],
      search: [],
      searchCount: 0,
      keyword: ''
    }
  },
  beforeMount () {
    window.fetch('https://api.engineers.my/events')
    .then((body) => body.json())
    .then(this.filterEvents)
    .then(this.addId)
    .then((data) => {
      this.parseEvents(data)
      this.indexDocuments(data)
    }).catch(console.error)
  },
  methods: {
    filterEvents (data) {
      const dateObj = new Date()
      const year = dateObj.getFullYear()
      const month = dateObj.getMonth() + 1

      return data.months
      .filter(m => m.year >= year)
      .filter(m => m.month >= month)
    },
    addId (data) {
      return data.map((group) => {
        group.day = group.day.map((event) => {
          event.id = uuidv4()
          return event
        })
        return group
      })
    },
    parseEvents (data) {
      this.sections = data
      .map(({ year, month, month_string: monthString, day }) => {
        const title = [ monthString, year ].join(' ')
        const events = [...new Set(day.map(e => new Date(e.date).getTime()))]
        .reduce((arr, timestamp) => {
          arr.push(day
            .filter(e => new Date(e.date).getTime() === timestamp)
            .filter(e => new Date(e.date).getTime() >= new Date().setHours(0, 0, 0, 0))
          )
          return arr.filter(x => x.length)
        }, [])
        return { title, events }
      })

      this.search = this.sections
    },
    indexDocuments (data) {
      this.elasticlunr = elasticlunr(function () {
        this.addField('title')
        this.setRef('id')
        this.saveDocument(false)
      })
      data
      .map(({ day }) => {
        day.map(({ id, title }) => {
          this.elasticlunr.addDoc({
            id,
            title
          })
        })
      })
    },
    parseDate (timestamp) {
      return moment(timestamp).format('Do')
    },
    checkExpiry (timestamp) {
      if (!timestamp) {
        return false
      }
      const today = new Date().setHours(0, 0, 0, 0)
      const current = new Date(timestamp).getTime()
      return current < today
    },
    checkToday (timestamp) {
      if (!timestamp) {
        return false
      }
      const today = new Date().setHours(0, 0, 0, 0)
      const current = new Date(timestamp).setHours(0, 0, 0, 0)
      return current === today
    },
    checkArray (array) {
      return Array.isArray(array)
    },
    onSearch (evt) {
      if (!this.elasticlunr) return
      const ids = this.elasticlunr.search(this.keyword, {})
      .map(e => e.ref)
      if (!ids.length) {
        this.searchCount = 0
        this.search = [...this.sections]
        return
      }

      this.search = [...this.sections].map((data) => {
        if (!data) {
          return null
        }
        const events = data.events.map((event) => {
          return event.filter((evt) => ids.includes(evt.id))
        }).filter(e => e.length)
        return {
          events,
          title: data.title
        }
      }).filter(x => x.events.length)

      this.searchCount = this.search.reduce((a, b) => {
        return a + b.events.length
      }, 0)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

@import '../../styles/theme.scss';


.page-event {
  padding: 0 $block-20;
}

.col-12 {
  display: block;
  margin: auto;
  text-align: left;
}

.section-title {
  font-weight: bold;
}

.event-date {
  min-width: 40px;
}

.event-link:before {
  content: "○";
  display: inline-block;
  padding: 0 10px 0 0;
  font-weight: bold;
  color: $silver;
}

.event {
  @extend %flex;
  color: $tundora;
  line-height: 40px;
  vertical-align: middle;
  font-size: 14px;
}

.event-type {
  font-weight: bold;
  margin: $block-20 0 $block-10;
  text-transform: uppercase;
  font-size: 12px;
  color: $dove-gray;
}

.event-link {
  @extend %no-link;
}

.event-link:hover {
  color: $dodger-blue;
  text-decoration: underline;
}

.event-link:visited {
  color: $silver;
}

.event-date b {
  font-weight: bold;
  margin-right: 12px;
  font-size: 12px;
  display: inline-block;
}

.event-group {
  border-bottom: 1px solid #EEEEEE;
}

.event-group.is-today {
  box-shadow: 0 2.5px 10px rgba(0, 0, 0, .2);
  border: none;
  padding: 0 $block-10;
  border-radius: $block-10;
  margin: 0 0 $block-10 0;
}

.event-group.is-today .event-date b {
  // border: 1px solid #DCDCDC;
  // width: 45px;
  // text-align: center;
  // border-radius: 5px;
  color: $dodger-blue;
}
.search {
  text-align: center;
}
.search-input {
  margin: auto;
  height: 35px;
  display: block;
  font-family: Arial;
  font-size: 14px;
  max-width: 360px;
  width: 100%;
  border: 3px solid $mercury;
  border-radius: 5px;
  padding: 0 10px;
  outline: none;
  transition: .174s all ease-out;
}


.search-input:focus { 
  border-color: rgba($dodger-blue, .5);
}

.search-response {
  font-size: 14px;
  color: $dove-gray;
  display: block;
}
</style>
