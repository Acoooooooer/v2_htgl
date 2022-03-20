<!-- 柱状图 -->
<template>
  <div ref="box" class="charts">BarChart</div>
</template>

<script>import { mapMutations, mapState } from 'vuex'

export default {
  name: 'BarChart',
  data () {
    return {
      barChart: null
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
          this.barChart.resize(obj)
          clearTimeout(time)
        }
      }, 200)
    }
  },
  mounted () {
    this.$nextTick(() => {
      const barChart = this.$echarts.init(this.$refs.box)
      this.barChart = barChart
      this.CHANGE_BARCHARTSINIT(barChart)
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
    })
  }
}
</script>

<style lang="less" scoped>
.charts {
  width: 100%;
  height: 50px;
}
</style>
