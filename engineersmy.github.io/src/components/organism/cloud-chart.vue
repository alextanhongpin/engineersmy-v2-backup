<template>
  <div class="chart">
    <div class="chart-svg"></div>
  </div>
</template>

<script>
import chart from '../../module/chart/index.js'
export default {
  name: 'cloudchart',
  mounted () {
    chart.cloud('.chart-svg')
  }
}
</script>

<style lang='scss' scoped>
@import '../../styles/theme.scss';
.chart {
  width: 100%;
  height: 100%;
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

</style>