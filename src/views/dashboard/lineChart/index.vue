<template>
    <!-- 平滑曲线图 -->
    <div ref="box" class="charts">LineChart</div>
</template>

<script>
export default {
  name: 'LineChart',
  computed: {
    data () {
      let base = +new Date(1988, 9, 3)
      const oneDay = 24 * 3600 * 1000
      const dataArr = [[base, Math.random() * 300]]
      for (let i = 1; i < 20000; i++) {
        const now = new Date((base += oneDay))
        dataArr.push([+now, Math.round((Math.random() - 0.5) * 20 + dataArr[i - 1][1])])
      }
      return dataArr
    }
  },
  mounted () {
    // 初始化echarts
    const lineChart = this.$echarts.init(this.$refs.box)
    const option = {
      xAxis: {
        show: false,
        type: 'category'
      },
      yAxis: {
        show: false
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        formatter: function (params) {
          let result = ''
          const dotHtml = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:rgba(102, 0, 128, 0.5)"></span>'
          params.forEach((item) => {
            result += item.axisValue + '</br>' + dotHtml + item.data[1]
          })
          return result
        }
      },
      series: [
        {
          type: 'line',
          data: this.data,
          itemStyle: { // 拐点标志
            opacity: 0,
            borderJoin: 'round'
          },

          lineStyle: {
            color: 'purple'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: 'rgba(102, 0, 128, 0.5)', // 0% 处的颜色
                opacity: 0.5
              }, {
                offset: 1, color: '#ffffff' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }
          },
          smooth: true

        }
      ],
      grid: {
        left: 0,
        top: 2,
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
