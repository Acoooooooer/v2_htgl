<template>
  <div class="dashboard-container">
    <!-- <el-button @click="aaa">++</el-button> -->
    <!-- 顶部四个卡片 -->
    <card-dash-board :num="4" :titles="titles" :counts="counts" :footers="footers" class="board">
      <template #charts="{ $index: i }">
        <div v-if="i === 0" class="index0">
          <span>周同比</span>
          <span data-num>56.67%</span>
          <span class="iconfont icon-sanjiao2"></span>
          <span data-num>日同比</span>
          <span data-num>19.16%</span>
          <span class="iconfont icon-sanjiao1"></span>
        </div>
        <div v-if="i === 1">
          <line-chart />
        </div>
        <div v-if="i === 2">
          <bar-chart />
        </div>
        <div v-if="i === 3">
          <progress-chart :data="counts[3]" />
        </div>
      </template>
    </card-dash-board>
    <!-- 中间tabs -->
    <Sale :tabs="tabs" :num="0" :spans="spans" :leftList="leftList" @clicktime="clicktime">
      <template #echarts="{ $index: i }">
        <sale-bar-chart v-if="i == 0" :barData="line1" :title="tabs[i]"></sale-bar-chart>
        <sale-bar-chart v-else :barData="line2" :title="tabs[i]"></sale-bar-chart>
      </template>
    </Sale>
    <!-- 底部 -->
    <observe-index></observe-index>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import LineChart from './lineChart'
import BarChart from './barChart'
import ProgressChart from './progressChart'
import Sale from './sale'
import SaleBarChart from './sale/barChart'
import ObserveIndex from './observe'

export default {
  name: 'DashBoard',
  components: {
    LineChart,
    BarChart,
    ProgressChart,
    Sale,
    SaleBarChart,
    ObserveIndex
  },
  data () {
    return {
      // map: require('@/map.json')
      titles: ['总销售额', '访问量', '支付笔数', '运营活动效果'],
      counts: ['￥ 126560', '88460', '88460', `${parseInt(Math.random() * 100)}%`],
      footers: ['日销售额 ￥12423', '日访问量 1442', '转化率 65%', '同化比 18%'],
      tabs: ['销售额', '访问量'],
      spans: ['今日', '本周', '本月', '本年'],
      line1: new Array(12).fill(0).map(v => parseInt(Math.random() * 100 + 20)),
      line2: new Array(12).fill(0).map(v => parseInt(Math.random() * 100 + 20)),

      leftList: []
    }
  },
  methods: {
    ...mapMutations({
      CHANGE_BARCHARTSINIT: (commit, poly) => commit('dash/CHANGE_BARCHARTSINIT', poly)
    }),

    aaa () {
      // const routeObj = {
      //   path: 'dashboard/test', // 这里要把父路由的路径也带上
      //   name: 'test',
      //   meta: { title: '测试路由test', icon: 'icon' },
      //   component: () => import('./test.vue')
      // }
      // this.$router.addRoute('dashboard', routeObj)
      // console.log(this.$route)
    },

    leftlisted () {
      let num = parseInt(Math.random() * 7)
      const nameList = ['肯德基', '麦当劳', '海底捞', '汉堡王', '魏家凉皮', '兰州拉面', '康师傅']
      const random = () => {
        if (!nameList[num]) {
          num = parseInt(Math.random() * 7)
          random()
        }
      }
      return new Array(7).fill({}).map(v => {
        random()
        const obj = {
          name: nameList[num],
          content: parseInt(Math.random() * 1000000 + 10000)
        }
        nameList.splice(num, 1)
        return obj
      })
    },
    clicktime () {
      this.leftList = this.leftlisted()
    }
  },
  computed: {
    ...mapState({
      barChartsInit: store => store.dash.barChartsInit,
      opened: store => store.app.sidebar.opened
    })
  },
  mounted () {
    this.leftList = this.leftlisted()
    window.onresize = () => {
      this.barChartsInit.forEach(echartInit => {
        echartInit.resize({
          width: 'auto'
        })
      })
    }
  },
  beforeDestroy () {
    this.CHANGE_BARCHARTSINIT([])
    window.onresize = null
  }
}
</script>

<style lang="less" scoped>
.dashboard {
  &-container {
    margin: 30px;

    .index0 {
      height: 44px;
      font-size: 14px;
      span[data-num] {
        display: inline-block;
        margin: 0 3px 0 10px;
      }
      .iconfont {
        font-size: 12px;
        margin-right: 5px;
      }
    }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
