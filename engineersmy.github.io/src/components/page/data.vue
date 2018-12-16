<template>
  <div class="page-data">
    <div class="col-12">

      <br>
      <br>

      <div>
        <input 
          class="github-search"
          @keyup="onSearch" 
          type="input" 
          placeholder="Enter your Github username to find similar users"
        />
        <div class="github-search-placeholder" v-if="message.length"> {{message}} </div>
      </div>

      <div>
        <br>
        <div class="match-title" v-if="matches.length">
          Hi {{username}}! We found {{matches.length}} users that are similar to you:
        </div>
        <br>
        <div v-for="match in matches"
          class="github-user"
          >
          <a class="github-user-link" :href="match.url"
            :title="match.username"
            target="_blank"
            >
            <div 
              class="github-photo"
              :style="{background: 'url(' + match.avatarUrl + ') no-repeat center center / cover'}"
            ></div>
            <span>{{ match.username }}</span>
          </a>
        </div>
      </div>

      <br>
      <br>
      <br>

      <div class="chart-title">
        <h2>Registered Github Users in Malaysia over years</h2>
      </div>

      <br>
      <br>
      <br>

      <chartist
        ratio="ct-major-second"
        type="Bar"
        :data="chartData"
        :options="chartOptions"
        :eventHandlers="chartEventHandlers"
      ></chartist>

      <br>
      <br>

      <div class="chart-title">
        <h2>Top 10 languages used by Github users in Malaysia</h2>
      </div>
      
      <br>
      <br>
      <br>

      <chartist
        ratio="ct-major-second"
        type="Pie"
        :data="pieData"
        :options="pieOptions"
        :responsiveOptions="pieResponsiveOptions"
        :eventHandlers="pieEventHandlers"
      ></chartist>

      <cloud-chart/>
    </div>
  </div>
</template>

<script>
// Bad, don't access the methods directly
// import draw from '../../module/chart.js'
import CloudChart from '../organism/cloud-chart'
import recommendations from '../../data/recommendation.json'
import users from '../../data/user'
import languages from '../../data/language'

export default {
  name: 'page-data',
  beforeMount () {
    this.matches = []
    this.message = ''
    this.username = ''
  },
  components: {
    CloudChart
  },
  methods: {
    onSearch (evt) {
      if (this.searchTimeout) {
        window.clearTimeout(this.searchTimeout)
      }
      const username = evt.currentTarget.value
      if (!username.trim().length) {
        this.matches = []
        this.message = ''
        this.username = ''
        return
      }

      this.searchTimeout = window.setTimeout(() => {
        const user = recommendations.find(u => u.username.toLowerCase() === username.toLowerCase())

        if (!user) {
          this.matches = []
          this.message = 'No results found. You probably do not have any matches or your location is not set to Malaysia.'
          this.username = ''
          return
        }
        this.matches = user.matches_info
        this.message = ''
        this.username = user.username
      }, 250)
    }
  },
  data () {
    return {
      matches: this.matches,
      message: this.message,
      username: this.username,
      chartData: users,
      chartEventHandlers: [{
        event: 'draw',
        fn (data) {
          if (data.type === 'bar') {
            data.element.animate({
              y2: {
                // The delay when we like to start the animation
                begin: 500 + data.seriesIndex * 100,
                // Duration of the animation
                dur: 150,
                // The value where the animation should start
                from: data.y1,
                // The value where it should end
                to: data.y2
              },
              opacity: {
                begin: data.seriesIndex * 100,
                dur: 150,
                from: 0,
                to: 1
              }
            })
          } else if (data.type === 'grid') {
            const seq = data.index
            const delays = 100
            const durations = 250
            const pos1Animation = {
              begin: seq * delays,
              dur: durations,
              from: data[data.axis.units.pos + '1'] - 30,
              to: data[data.axis.units.pos + '1'],
              easing: 'easeOutQuart'
            }

            const pos2Animation = {
              begin: seq * delays,
              dur: durations,
              from: data[data.axis.units.pos + '2'] - 100,
              to: data[data.axis.units.pos + '2'],
              easing: 'easeOutQuart'
            }

            const animations = {}
            animations[data.axis.units.pos + '1'] = pos1Animation
            animations[data.axis.units.pos + '2'] = pos2Animation
            animations['opacity'] = {
              begin: seq * delays,
              dur: durations,
              from: 0,
              to: 1,
              easing: 'easeOutQuart'
            }

            data.element.animate(animations)
          }
        }
      }],
      chartOptions: {
        fullWidth: true,
        height: 400,
        distributeSeries: true,
        chartPadding: {
          bottom: 40,
          left: 40
        },
        plugins: [
          this.$chartist.plugins.ctAxisTitle({
            axisX: {
              axisTitle: 'Year',
              axisClass: 'ct-axis-title-test',
              offset: {
                x: 0,
                y: 40
              },
              textAnchor: 'middle'
            },
            axisY: {
              axisTitle: 'Registered users',
              axisClass: '',
              offset: {
                x: -60,
                y: 30
              },
              flipTitle: true
            }
          }),
          this.$chartist.plugins.ctAccessibility({
            caption: 'Registered Github users versus year',
            seriesHeader: 'Registered Github users',
            summary: 'A graphic that shows the number of registered users for Github over years in Malaysia',
            valueTransform (value) {
              return value + ' users'
            }
            // visuallyHiddenStyles: true
          })
        ]
      },
      pieEventHandlers: [{
        event: 'draw',
        fn: (data) => {
          if (data.type === 'slice') {
            // Get the total path length in order to use for dash array animation
            const pathLength = data.element._node.getTotalLength()

            // Set a dasharray that matches the path length as prerequisite to animate dashoffset
            data.element.attr({
              'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
            })

            // Create animation definition while also assigning an ID to the animation for later sync usage
            const animationDefinition = {
              'stroke-dashoffset': {
                id: 'anim' + data.index,
                dur: 150,
                from: -pathLength + 'px',
                to: '0px',
                // easing: this.$chartist.Svg.Easing.easeOutQuint,
                // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
                fill: 'freeze'
              }
            }

            // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
            if (data.index !== 0) {
              animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end'
            }

            // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
            data.element.attr({
              'stroke-dashoffset': -pathLength + 'px'
            })

              // We can't use guided mode as the animations need to rely on setting begin manually
              // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
            data.element.animate(animationDefinition, false)
          }
        }
      }],
      pieData: languages,
      pieOptions: {
        fullWidth: true,
        height: 400,
        labelInterpolationFnc (value) {
          return value
        },
        donut: true
      },
      pieResponsiveOptions: [
        ['screen and (max-width: 640px)', {
          chartPadding: 40,
          labelOffset: 60,
          labelDirection: 'explode',
          labelInterpolationFnc (value) {
            return value
          }
        }],
        ['screen and (min-width: 1024px)', {
          chartPadding: 40,
          labelOffset: 60
        }]
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../styles/theme.scss';
.page-data {
  text-align: center;
  padding: 0 $block-20;
}

.col-12 {
  display: block;
  margin: auto;
  text-align: left;
}

.github-search {
  height: 40px;
  width: 100%;
  font-size: 16px;
  display: block;
  border-radius: 5px;
  padding: 0 5px;
  border: 2px solid $mercury;
}

.github-search-placeholder {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: $dove-gray;
  font-style: italic;
}

.github-user {
  line-height: 40px;
  height: 40px;
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  padding: 0 $block-10;
  border-radius: 7px;
}

.github-user:hover {
  background: rgba($dodger-blue, .1);
}

.github-user-link {
  @extend %no-link;
}

.github-photo {
  height: 30px;
  width: 30px;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
  line-height: 30px;
  border: 1px solid $mercury;
}

.match-title {
  font-size: 14px;
  font-weight: 600;
  padding: 0 $block-10;
}
.chart-title {
  font-weight: bold;
  text-align: center;
}
</style>
