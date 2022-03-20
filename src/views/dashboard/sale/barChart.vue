<template>
  <div class="BarChart" ref="box" style="width:100%"></div>
</template>

<script>import { mapMutations, mapState } from 'vuex'

export default {
  name: 'BarChart',
  props: ['barData', 'title'],
  data () {
    return {
      barCharts: null
    }
  },
  methods: {
    ...mapMutations({
      CHANGE_BARCHARTSINIT: (commit, poly) => commit('dash/CHANGE_BARCHARTSINIT', poly)
    })
  },
  computed: {
    ...mapState({
      opened: store => store.app.sidebar.opened,
      activeName: store => store.dash.activeName
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
          this.barCharts.resize(obj)
          clearTimeout(time)
        }
      }, 200)
    },
    activeName () { // 监听tabs变化
      this.barCharts.resize()
    }
  },

  mounted () {
    this.$nextTick(() => {
      const barCharts = this.$echarts.init(this.$refs.box)
      this.barCharts = barCharts
      this.CHANGE_BARCHARTSINIT(barCharts)

      const option = {
        title: {
          text: this.title + '趋势'
        },
        xAxis: {
          show: true,
          // type: 'category',
          data: new Array(12).fill(0).map((v, i) => i + 1 + '月')
        },
        yAxis: {
          show: true
          // type: 'category'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            shadowStyle: {
              color: 'rgba(150,150,150,0.2)'
            }
          }
        },
        series: [
          {
            type: 'bar',
            data: this.barData,
            barWidth: 25
          }
        ],
        grid: {
          left: 30,
          top: 40,
          right: 0,
          bottom: 20
        }
      }

      barCharts.setOption(option)
    })
  }

}
</script>

<style lang="less" scoped>
.BarChart {
  width: 100%;
  height: 300px;
}
</style>
