<template>
  <div class="pieChart">
    <div ref="box" class="charts"></div>
  </div>
</template>

<script>import { mapMutations, mapState } from 'vuex'

export default {
  name: 'PieChart',
  data () {
    return {
      pieChart: null
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
          this.pieChart.resize(obj)
          clearTimeout(time)
        }
      }, 200)
    }
  },
  mounted () {
    this.$nextTick(() => {
      const pieChart = this.$echarts.init(this.$refs.box)
      this.pieChart = pieChart
      this.CHANGE_BARCHARTSINIT(pieChart)

      const option = {
        title: {
          text: '视频广告',
          subtext: '300',
          left: 'center',
          top: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '80%'],
            avoidLabelOverlap: true,
            itemStyle: {
              borderRadius: 3,
              borderColor: '#fff',
              borderWidth: 1
            },
            label: {
              show: true,
              fontSize: 14
            },

            data: [
              { value: 300, name: '视频广告' },
              { value: 484, name: '邮件营销' },
              { value: 580, name: '联盟广告' },
              { value: 735, name: '直接访问' },
              { value: 1048, name: '搜索引擎' }
            ]
          }
        ]
      }

      pieChart.on('mousemove', (v) => {
        pieChart.setOption({
          title: {
            text: v.name,
            subtext: v.value
          }
        })
      })
      pieChart.setOption(option)
    })
  }
}
</script>

<style lang="less" scoped>
.pieChart {
  .charts {
    width: 100%;
    height: 329px;
  }
}
</style>
