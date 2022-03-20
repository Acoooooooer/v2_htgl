<template>
    <div class="search">
        <el-card>
            <!-- top -->
            <div class="hotsearch">
                <span>线上热门搜索</span>

                <el-dropdown>
                    <i class="el-icon-more"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>该页面</el-dropdown-item>
                        <el-dropdown-item>仅作展示</el-dropdown-item>
                        <el-dropdown-item>没用实际数据</el-dropdown-item>
                        <el-dropdown-item>其他模块</el-dropdown-item>
                        <el-dropdown-item>有真实</el-dropdown-item>
                        <el-dropdown-item>数据接口</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <!-- 图表 -->
            <div>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <line-chart :dataArr="dataArr() | bignum" title="搜索用户数">
                            <template #icon>
                                <span class="bignum">111252</span>
                                <span class="rightnum">15.3</span>
                                <span class="iconfont icon-sanjiao2"></span>
                            </template>
                        </line-chart>
                    </el-col>
                    <el-col :span="12">
                        <line-chart :dataArr="dataArr()" title="人均搜索次数">
                            <template #icon>
                                <span class="bignum">2.7</span>
                                <span class="rightnum">26.2</span>
                                <span slot="icon" class="iconfont icon-sanjiao1"></span>
                            </template>
                        </line-chart>
                    </el-col>
                </el-row>
            </div>
            <!-- 表格 -->
            <el-table border :data="[tableDate[page]]">
                <el-table-column label="排名" type="index" width="80" align="center"></el-table-column>
                <el-table-column label="搜索关键字" prop="a"></el-table-column>
                <el-table-column label="用户数" prop="b" sortable></el-table-column>
                <el-table-column label="周涨幅" prop="c" sortable></el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination
                layout="->, prev, pager, next"
                @current-change="currentChange"
                :page-size="1"
                :total="60"
            ></el-pagination>
        </el-card>
    </div>
</template>

<script>
import LineChart from './lineChart'
export default {
  name: 'SearchIndex',
  components: {
    LineChart
  },
  data () {
    const tableDate = new Array(61).fill({}).map(v => {
      const obj = {
        a: String.fromCharCode(parseInt(Math.random() * 100)),
        b: parseInt(Math.random() * 10000),
        c: parseInt(Math.random() * 10000)
      }
      return obj
    })

    return {
      tableDate,
      page: 1
    }
  },
  methods: {
    dataArr () {
      const arr = []
      for (let i = 0; i < 20; i++) {
        arr.push(parseInt(Math.random() * 100 + 1))
      }
      return arr
    },
    currentChange (val) {
      this.page = val
    }
  },
  filters: {
    bignum (arr) {
      return arr.map(v => v * 10000)
    }
  }
}
</script>

<style lang="less" scoped>
@hotsercHeight: 40px;
.search {
    .hotsearch {
        height: @hotsercHeight;
        border-bottom: 1px solid #eeeeee;
        margin-bottom: 10px;
        font-size: 17px;
        display: flex;
        justify-content: space-between;
        i {
            // position: absolute;
            margin-right: 15px;
            margin-top: 5px;
            cursor: pointer;
            transition: 0.4s;
        }
    }
}
</style>
