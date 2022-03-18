<template>
  <!-- SPU列表结构 -->
  <div class="SpuList">
    <el-button
      type="primary"
      icon="el-icon-plus"
      :disabled="!sForm.category3Id"
      @click="changeScene(1)"
    >添加SPU</el-button>

    <el-table
      border
      stripe
      style="width: 100%;margin:15px 0;"
      :data="sTable.spuList"
      empty-text="暂无数据，请选择分类类型"
    >
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
              @click="changeScene(2, row)"
            ></hin-button>
            <hin-button
              type="warning"
              icon="el-icon-edit"
              size="mini"
              content="修改spu"
              @click="changeScene(1, row)"
            ></hin-button>
            <hin-button
              type="info"
              icon="el-icon-info"
              size="mini"
              @click="watchSkuList(row)"
              content="查看当前spu的sku列表"
            ></hin-button>
            <el-popconfirm
              style="margin-left:10px"
              confirm-button-text="确定"
              cancel-button-text="取消"
              icon="el-icon-info"
              icon-color="red"
              title="确定删除码？"
              @confirm="delSpuList(row)"
            >
              <hin-button
                slot="reference"
                type="danger"
                icon="el-icon-delete"
                size="mini"
                content="删除spu"
              ></hin-button>
            </el-popconfirm>
            <!-- <hin-button text='添加spu' size='mini'/> -->
            <!-- 查看当前spu的sku列表 -->
            <el-dialog
              top="8vh"
              :title="`${rowdata.spuName} 的Sku列表`"
              :visible.sync="dialogTableVisible"
              @closed="closedDiolog"
              append-to-body
            >
              <el-table :data="skuFromSpuList" border v-loading="loading">
                <el-table-column prop="skuName" label="名称" width="150"></el-table-column>
                <el-table-column prop="price" label="价格" width="200"></el-table-column>
                <el-table-column prop="weight" label="重量"></el-table-column>
                <el-table-column prop="createTime" label="创建时间"></el-table-column>
                <el-table-column prop="skuDefaultImg" label="图片">
                  <template slot-scope="{row}">
                    <el-image
                      style="width: 100px; height: 100px"
                      :src="row.skuDefaultImg"
                      fit="fit"
                    ></el-image>
                  </template>
                </el-table-column>
              </el-table>
            </el-dialog>
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
      dialogTableVisible: false,
      rowdata: {},
      loading: true
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
      CHANGE_SPU_IMAGE: (commit, poly) => commit('spu/CHANGE_SPU_IMAGE', poly),
      CHANGE_SKUDATA: (commit, poly) => commit('spu/CHANGE_SKUDATA', poly),
      CHANGE_SKUFROMSPULIST: (commit, poly) => commit('spu/CHANGE_SKUFROMSPULIST', poly)

    }),
    ...mapActions({
      getSpuDate: (dispatch, poly) => dispatch('spu/getSpuDate', poly),
      getSpuById: (dispatch, poly) => dispatch('spu/getSpuById', poly),
      getTrademarkList: (dispatch, poly) => dispatch('spu/getTrademarkList', poly),
      spuImageList: (dispatch, poly) => dispatch('spu/spuImageList', poly),
      baseSaleAttrList: (dispatch, poly) => dispatch('spu/baseSaleAttrList', poly),
      deleteSpu: (dispatch, poly) => dispatch('spu/deleteSpu', poly),
      skuImageList: (dispatch, poly) => dispatch('spu/skuImageList', poly),
      skuSaleAttrList: (dispatch, poly) => dispatch('spu/skuSaleAttrList', poly),
      skuAttrInfoList: (dispatch, poly) => dispatch('spu/skuAttrInfoList', poly),
      skuFindBySpuId: (dispatch, poly) => dispatch('spu/skuFindBySpuId', poly)
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
    // 切换页面
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
      if (num === 2) {
        this.skuImageList(row.id)
        this.skuSaleAttrList(row.id)
        this.skuAttrInfoList(this.sForm)

        this.CHANGE_SKUDATA({
          category3Id: row.category3Id,
          spuId: row.id,
          tmId: row.tmId,
          spuName: row.spuName
        })
      }
    },
    // 删除spulist
    delSpuList (row) {
      this.deleteSpu(row.id)
    },
    // 查看当前spu的sku列表
    watchSkuList (row) {
      this.dialogTableVisible = true
      this.rowdata = row
      this.skuFindBySpuId(row.id)
        .then(res => {
          const time = setTimeout(() => {
            this.loading = false
            clearTimeout(time)
          }, 500)
        })
    },
    // diolog关闭动画完成后
    closedDiolog () {
      this.CHANGE_SKUFROMSPULIST([])
      this.loading = true
    }

  },
  computed: {
    ...mapState({
      sTable: state => state.spu.sTable,
      sForm: state => state.spu.sForm,
      pagination: state => state.spu.pagination,
      skuFromSpuList: state => state.spu.skuFromSpuList
    })
  }

}
</script>

<style lang='less' scoped>
// .SpuList {
// }
</style>
