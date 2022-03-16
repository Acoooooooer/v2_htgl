<template>
  <!-- SPU列表结构 -->
  <div class="SpuList">
    <el-button
      type="primary"
      icon="el-icon-plus"
      :disabled="!sForm.category3Id"
      @click="changeScene(1)"
    >添加SPU</el-button>

    <el-table border stripe style="width: 100%;margin:15px 0;" :data="sTable.spuList">
      <el-table-column
        v-for="(v, i) in 5"
        :key="i"
        :prop="sTable.tableProp[i]"
        :label="sTable.tableLabel[i]"
        :width="sTable.tableWidth[i]"
        :align="i === 0 ? 'center' : ''"
      >
        <template slot-scope="{ row, $index }">
          <!--  -->
          <span v-if="sTable.tableProp[i] === 'id'">{{ $index + 1 }}</span>
          <!--  -->
          <span v-if="sTable.tableProp[i] === 'spuName'">{{ row.spuName }}</span>
          <!--  -->
          <span v-if="sTable.tableProp[i] === 'description'">{{ row.description }}</span>
          <!--  -->
          <span v-if="sTable.tableProp[i] === 'timer'">{{ row.timer }}</span>
          <!--  -->
          <div v-if="sTable.tableProp[i] === 'active'">
            <hin-button
              type="success"
              icon="el-icon-plus"
              size="mini"
              content="添加sku"
              @click="changeScene(2)"
            ></hin-button>
            <hin-button
              type="warning"
              icon="el-icon-edit"
              size="mini"
              content="修改spu"
              @click="changeScene(1, row)"
            ></hin-button>
            <hin-button type="info" icon="el-icon-info" size="mini" content="查看当前spu的sku列表"></hin-button>
            <hin-button type="danger" icon="el-icon-delete" size="mini" content="删除spu"></hin-button>
            <!-- <hin-button text='添加spu' size='mini'/> -->
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <el-pagination
      :pager-count="7"
      layout="total , prev , pager, next, jumper, ->, sizes"
      style="margin-top: 20px; text-align: center"
      :page-size="pagination.limit"
      :page-sizes="pagination.sizes"
      :total="pagination.total"
      :current-page="pagination.page"
      @current-change="currentChange"
      @size-change="sizeChange"
    ></el-pagination>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
export default {
  name: 'SpuList',

  data () {
    return {

    }
  },
  mounted () {
  },

  methods: {
    ...mapMutations({
      CHANGE_S_TABLE: (commit, poly) => commit('spu/CHANGE_S_TABLE', poly),
      CHANGE_C_FORM: (commit, poly) => commit('spu/CHANGE_S_FORM', poly),
      CHANGE_PAGIN: (commit, poly) => commit('spu/CHANGE_PAGIN', poly),
      CHANGE_SENCE: (commit, poly) => commit('spu/CHANGE_SENCE', poly),
      CHANGE_IS_SHOWTABLE: (commit, poly) => commit('spu/CHANGE_IS_SHOWTABLE', poly),
      CHANGE_SPU_IMAGE: (commit, poly) => commit('spu/CHANGE_SPU_IMAGE', poly)

    }),
    ...mapActions({
      //  获取spu数据 接口
      getSpuDate: (dispatch, poly) => dispatch('spu/getSpuDate', poly),
      getSpuById: (dispatch, poly) => dispatch('spu/getSpuById', poly),
      getTrademarkList: (dispatch, poly) => dispatch('spu/getTrademarkList', poly),
      spuImageList: (dispatch, poly) => dispatch('spu/spuImageList', poly),
      baseSaleAttrList: (dispatch, poly) => dispatch('spu/baseSaleAttrList', poly)
    }),
    // 页码改变
    currentChange (page = 1) {
      this.CHANGE_PAGIN({ page })
      this.getSpuDate({ ...this.pagination, ...this.sForm })
    },
    // 页面条数改变
    sizeChange (limit) {
      this.CHANGE_PAGIN({ limit, page: 1 })
      this.getSpuDate({ ...this.pagination, ...this.sForm })
    },
    changeScene (num, row) {
      this.CHANGE_SENCE(num)
      this.CHANGE_IS_SHOWTABLE(false)

      if (row) {
        this.getSpuById(row.id)
        this.spuImageList(row.id)
      }
      if (num === 1) {
        this.getTrademarkList()
        this.baseSaleAttrList()
      }
    }

  },
  computed: {
    ...mapState({
      sTable: state => state.spu.sTable,
      sForm: state => state.spu.sForm,
      pagination: state => state.spu.pagination
    })
  }

}
</script>

<style lang='less' scoped>
.SpuList {
}
</style>
