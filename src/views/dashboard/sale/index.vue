<template>
  <div class="SaleIndex">
    <el-card>
      <div class="flexbox">
        <!-- 顶部左侧 -->
        <el-tabs v-model="activeName" @tab-click="handleClick" class="left">
          <el-tab-pane v-for="(v, i) in tabs" :key="i" :label="v" :name="v">
            <el-row :gutter="10">
              <el-col :span="16">
                <slot name="echarts" :$index="i"></slot>
              </el-col>
              <el-col :span="8">
                <div class="collist">
                  <div v-for="(val, index) in leftList" :key="index + 999" class="spanlist">
                    <span class="radis">{{ index + 1 }}</span>
                    <span>{{ val.name }}</span>
                    <span class="ringhtspan">{{ val.content }}</span>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
        <!-- 顶部右侧 -->
        <div class="right">
          <span v-for="(v, i) in spans" :key="i" :data="i" @click="clickSpan(i)">{{ v }}</span>
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
            class="picker"
            @change="clickPicker"
          ></el-date-picker>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>import { mapMutations, mapState } from 'vuex'

// import LineChart from './lineChart'
export default {
  name: 'SaleIndex',
  props: ['tabs', 'num', 'spans', 'leftList'],
  //   components: {
  //     LineChart
  //   },
  data () {
    return {
      activeName: '请传入tabs',
      value1: ''
    }
  },
  methods: {
    ...mapMutations({
      CHANGE_ACTIVENAME: (commit, poly) => commit('dash/CHANGE_ACTIVENAME', poly)
    }),
    handleClick (tab, event) {
      //   console.log(tab, event)
    },
    clickSpan (num) {
      const end = new Date()
      const start = new Date()
      if (num === 1) {
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      } else if (num === 2) {
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      } else if (num === 3) {
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
      }
      this.value1 = [start, end]

      this.$emit('clicktime')
    },
    clickPicker () {
      this.$emit('clicktime')
    }
  },
  watch: {
    num: {
      immediate: true,
      handler: function () {
        const { tabs, num } = this
        this.activeName = tabs[num]
      }
    },
    activeName (newValue) {
      this.CHANGE_ACTIVENAME(newValue)
    }
  },
  computed: {
    ...mapState({
      barChartsInit: store => store.dash.barChartsInit,
      opened: store => store.app.sidebar.opened
    })
  }
}
</script>

<style lang="less" scoped>
.get(@b) when (@b<4) {
  &:nth-of-type(@{b}) {
    .radis {
      border-radius: 50%;
      background-color: black;
      color: white;
    }
  }
  .get(@b+1);
}
.SaleIndex {
  margin-top: 15px;
  .el-tabs {
    /deep/ .el-tabs__item {
      font-size: 16px;
    }
  }
  .flexbox {
    display: flex;
    position: relative;
    .left {
      width: 100%;
      .collist {
        margin: 40px;

        .spanlist {
          margin-top: 15px;

          .get(1);
          .radis {
            display: inline-block;
            width: 18px;
            height: 18px;
            text-align: center;
            line-height: 18px;
            color: black;
          }
          .ringhtspan {
            float: right;
          }
          span {
            margin: 0 15px;
          }
        }
      }
    }
    .right {
      position: absolute;
      right: 20px;
      z-index: 99999;
      font-size: 15px;
      span {
        margin: 0 6px;
        display: inline-block;
        color: #777;
        cursor: pointer;
        transition: 0.3s;
        &:hover {
          color: black;
        }
        &:last-of-type {
          margin-right: 25px;
        }
      }

      .picker {
        width: 220px;
      }
    }
  }
}
</style>
