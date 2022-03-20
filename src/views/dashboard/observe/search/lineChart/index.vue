<template>
  <div class="LineChart">
    <div class="top">
      <span class="search_user_num">{{ title }}</span>
      <span class="iconfont icon-Info"></span>
    </div>
    <div class="number">
      <slot name="icon"></slot>
    </div>
    <div class="box" ref="charts"></div>
  </div>
</template>

<script>import { mapMutations, mapState } from 'vuex'

export default {
  name: 'LineChart',
  props: ['dataArr', 'title'],
  data () {
    return {
      lineChart: null
    }
  },
  methods: {
    ...mapMutations({
      CHANGE_BARCHARTSINIT: (commit, poly) => commit('dash/CHANGE_BARCHARTSINIT', poly)
    })
  },
  computed: {
    ...mapState({
      opened: store => store.app.sidebar.opened
    })
  },
  watch: {
    opened (v) { // 监听侧边栏开关
      const time = setTimeout(() => {
        if (this.$refs.charts.offsetWidth) {
          const obj = {
            width: this.$refs.charts.offsetWidth,
            animation: {
              duration: 50,
              easing: 'ease-out'
            }
          }
          this.lineChart.resize(obj)
          clearTimeout(time)
        }
      }, 200)
    }
  },
  mounted () {
    this.$nextTick(() => {
      const lineChart = this.$echarts.init(this.$refs.charts)
      this.lineChart = lineChart
      this.CHANGE_BARCHARTSINIT(lineChart)

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
          trigger: 'axis'
        },
        series: [
          {
            type: 'line',
            data: this.dataArr,
            smooth: true,
            itemStyle: { // 拐点标志
              opacity: 0,
              borderJoin: 'round'
            },
            lineStyle: {
              color: 'rgba(102, 0, 128)'
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
            }
          }
        ]
      }
      lineChart.setOption(option)
    })
  }
}
</script>

<style lang="less" scoped>
.LineChart {
  .box {
    width: 100%;
    height: 100px;
  }

  .search_user_num {
    display: inline-block;
    margin-right: 15px;
  }
  .top {
    margin-top: 15px;
  }
  .iconfont {
    margin-left: 15px;
  }
  .number {
    .bignum {
      font-size: 24px;
    }
    margin-top: 25px;
    .rightnum {
      display: inline-block;
      margin-left: 15px;
      color: #aaaaaa;
    }
  }
}
</style>
