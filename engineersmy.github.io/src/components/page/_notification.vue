<template>
  <div class='page-data'>
    {{ locale }}
    {{ $t('message.greet', locale) }}
    {{ $t('formatter.moment', { date: new Date(), format: 'YYYY MMM DD' }) }}
    <button v-on:click='toastNotification'>Show notification</button>

    <d3-chart></d3-chart>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// Bad, don't access the methods directly
// import draw from '../../module/chart.js'
import D3Chart from '../organism/chart'
export default {
  name: 'page-data',
  components: {
    D3Chart
  },
  computed: {
    ...mapGetters('locale', [
      'locale'
    ])
  },
  methods: {
    ...mapActions('notification', {
      'showNotification': 'show'
    }),
    toastNotification () {
      this.showNotification({
        title: 'Hello World',
        description: 'This is an example notification'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
