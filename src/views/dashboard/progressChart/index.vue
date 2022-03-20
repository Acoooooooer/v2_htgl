<template>
  <div ref="box" class="charts">
    progressChart
    <div style="width:3px;height:15px;background:red"></div>
  </div>
</template>

<script>import { mapMutations, mapState } from 'vuex'

export default {
  name: 'progressChart',
  props: ['data'],
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
        if (this.$refs.box.offsetWidth) {
          const obj = {
            width: this.$refs.box.offsetWidth,
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
      const lineChart = this.$echarts.init(this.$refs.box)
      this.lineChart = lineChart
      this.CHANGE_BARCHARTSINIT(lineChart)

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
    })
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
