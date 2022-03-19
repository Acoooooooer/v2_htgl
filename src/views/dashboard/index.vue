<template>
  <div class="dashboard-container">
    <card-dash-board :num="4" :titles="titles" :counts="counts" :footers="footers">
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
          <line-chart></line-chart>
        </div>
        <div v-if="i === 2">
          <bar-chart></bar-chart>
        </div>
        <div v-if="i === 3">
          <progress-chart :data="counts[3]"></progress-chart>
        </div>
      </template>
    </card-dash-board>
    <div class="dashboard-text">name: {{ name }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LineChart from './lineChart'
import BarChart from './barChart'
import ProgressChart from './progressChart'

export default {
  name: 'DashBoard',
  components: {
    LineChart,
    BarChart,
    ProgressChart
  },
  data () {
    return {
      // map: require('@/map.json')
      titles: ['总销售额', '访问量', '支付笔数', '运营活动效果'],
      counts: ['￥ 126560', '88460', '88460', `${parseInt(Math.random() * 100)}%`],
      footers: ['日销售额 ￥12423', '日访问量 1442', '转化率 65%', '同化比 18%']
    }
  },
  computed: {
    ...mapGetters(['name'])
  }

}
</script>

<style lang="less" scoped>
.dashboard {
  &-container {
    margin: 30px;

    .index0 {
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
