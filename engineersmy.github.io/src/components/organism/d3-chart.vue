<template>
  <div class="chart">
    <break rows="3"></break>

    <!--Section: Abstract that explains that the page is about-->
    <div class="chart-info">

      <h2 class="chart-heading">Github user density in Malaysia</h2>
      
      <br>

      <h4 class="chart-subheading">Shows the number of users from Malaysia that joined Github (from 2008 until June 2017).</h4>

      <br>
      <br>

      <h4 class="chart-heuristic-heading">The following criteria has to be met for the users to be included:</h4>

      <br>

      <ul class="chart-heuristic">
        <li>has 'Malaysia' in the location</li>
      </ul>
    </div>

    <break rows="3"></break>

    <!--Section: Display the chart component-->
    <div class="chart-user"></div>

    <break rows="3"></break>

    <!--Section: Abstract that explains that the page is about-->
    <div class="chart-info">

      <h2 class="chart-heading">Top 20 Programming Languages used in Malaysia</h2>
      
      <br>

      <h4 class="chart-subheading">Shows the frequency of the languages used based on data from Github Users in Malaysia (from 2008 until June 2017).</h4>

      <br>
      <br>

      <h4 class="chart-heuristic-heading">The following criteria has to be met for the Github repos to be included:</h4>

      <br>

      <ul class="chart-heuristic">
        <li>has 'Malaysia' in the location</li>
        <li>only public repos are included</li>
        <li>private and forked repos are excluded</li>
        <li>only repos with the language tag is included</li>
        <li>one repo may have multiple languages (e.g. javascript, html, css)</li>
      </ul>
    </div>

    <break rows="3"></break>

    <!--Section: Display the chart component-->
    <div class="chart-svg" :class="namespace"></div>

    <div class="chart-svg chart-cloud"></div>

    <!--Add extra padding below for scrolling-->
    <break rows="10"></break>
  </div>
</template>

<script>
import Break from '../atom/break.vue'
import chart from '../../module/chart/index.js'
export default {
  name: 'd3-chart',
  components: {
    Break
  },
  props: ['namespace'],
  mounted () {
    chart.language(['.', this.namespace].join(''))
    chart.user('.chart-user')
    chart.cloud('.chart-cloud')
  }
}
</script>

<style lang='scss' scoped>
@import '../../styles/theme.scss';
.chart {
  width: 100%;
  height: 100%;
}

.chart-abstract {
  margin: auto;
  width: 100%;
}

.chart-heading {
  font-weight: bold;
}

.chart-subheading {
  color: $dove-gray;
}

.chart-svg {
  max-width: 960px;
  max-height: 640px;
  width: 100%;
  height: 100%;
}
.chart-heuristic-heading {
  font-weight: bold;
}

.chart-heuristic {
  @extend %list;
  color: $dove-gray;
}

</style>