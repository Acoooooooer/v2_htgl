<!-- 柱状图 -->
<template>
  <div ref="box" class="charts">BarChart</div>
</template>

<script>
export default {
  name: 'BarChart',
  mounted () {
    const barChart = this.$echarts.init(this.$refs.box)
    const option = {
      xAxis: {
        show: false,
        type: 'category'

      },
      yAxis: {
        show: false
      },
      series: [{
        type: 'bar',
        data: [3600, 8636, 13653, 23613, 9653, 5998, 15236, 23613, 9653, 5998]
      }],
      tooltip: {
        show: true
      },
      grid: {
        top: 0,
        left: 3,
        right: 8,
        bottom: 10
      }
    }
    barChart.setOption(option)
  }
}
</script>

<style lang="less" scoped>
.charts {
  width: 100%;
  height: 50px;
}
</style>
