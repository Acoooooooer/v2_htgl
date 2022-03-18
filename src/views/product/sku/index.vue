<template>
  <div>
    <!-- 表格 -->
    <el-table border :data="[{}]">
      <el-table-column prop="skuName" type="index" label="序号" align="center" width="100"></el-table-column>
      <el-table-column prop="price" label="名称"></el-table-column>
      <el-table-column prop="weight" label="描述"></el-table-column>
      <el-table-column prop="createTime" label="默认图片" width="120"></el-table-column>
      <el-table-column prop="skuDefaultImg" label="重量(KG)" width="100"></el-table-column>
      <el-table-column prop="skuDefaultImg" label="价格(元)" width="100"></el-table-column>
      <el-table-column prop="skuDefaultImg" label="操作"></el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      style="text-align:center"
      :current-page="1"
      :page-sizes="[5, 8, 12]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, -> , jumper"
      :total="50"
    ></el-pagination>
  </div>
</template>

<script>import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'SkuIdex',
  data () {
    return {}
  },
  methods: {
    ...mapMutations({

    }),
    ...mapActions({
      skuList: (dispatch, poly) => dispatch('sku/skuList', poly)
    })
  },
  computed: {
    ...mapState({

    })
  }
}
</script>

<style style='less' scoped>
</style>
