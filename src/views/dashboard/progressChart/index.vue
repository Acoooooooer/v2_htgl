<template>
    <div ref="box" class="charts">progressChart

        <div style="width:3px;height:15px;background:red"></div>

    </div>
</template>

<script>
export default {
  name: 'progressChart',
  props: ['data'],
  mounted () {
    const lineChart = this.$echarts.init(this.$refs.box)
    const option = {
      xAxis: {
        show: false,
        min: 0,
        max: 100
      },
      yAxis: {
        show: false,
        type: 'category' // 均分
      },
      series: [{
        type: 'bar',
        data: [parseInt(this.data)],
        barWidth: 10,
        color: 'yellowgreen',
        showBackground: true,
        backgroundStyle: {
          color: '#eee'
        },
        label: {
          show: true,
          formatter: '|',
          position: 'right'
        }
      }],
      tooltip: {
        show: true,
        formatter: (v) => v.value + '%'
      },
      grid: {
        top: 0,
        left: 3,
        right: 8,
        bottom: 10
      }
    }
    lineChart.setOption(option)
  }
}
</script>

<style lang="less" scoped>
.charts {
    width: 100%;
    height: 50px;
    color: rgba(102, 0, 128, 0.692);
}
</style>
