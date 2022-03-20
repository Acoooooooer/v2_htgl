<template>
  <div class="category">
    <el-card>
      <!-- top -->
      <div class="shopsearch">
        <span>销售额类别占比</span>

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
      <pie-chart></pie-chart>
    </el-card>
  </div>
</template>

<script>
import PieChart from './pieChart'
export default {
  name: 'CateGory',
  components: {
    PieChart
  }
}
</script>

<style lang="less" scoped>
@hotsercHeight: 40px;
.category {
  .shopsearch {
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
