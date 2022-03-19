<template>
  <div>
    <!-- 表格 -->
    <el-table border :data="skuList" v-loading="loading">
      <el-table-column
        prop="id"
        type="index"
        :index="typedIndex"
        label="序号"
        align="center"
        width="100"
      ></el-table-column>
      <el-table-column prop="skuName" label="名称"></el-table-column>
      <el-table-column prop="skuDesc" label="描述"></el-table-column>
      <el-table-column prop="defaultImage" label="默认图片" width="120">
        <template slot-scope="{row}">
          <el-image :src="row.skuDefaultImg" style="width:100px;height:100px"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量(KG)" width="100"></el-table-column>
      <el-table-column prop="price" label="价格(元)" width="100"></el-table-column>
      <el-table-column prop="active" label="操作" width="230" align="center">
        <template slot-scope="{row}">
          <el-tooltip
            effect="dark"
            :content="row.isSale === 1 ? '点击下架' : '点击上架'"
            placement="bottom"
          >
            <el-button
              v-if="row.isSale === 1"
              type="success"
              icon="el-icon-sort-up"
              @click="sortUp(row)"
              size="mini"
            ></el-button>
            <el-button v-else icon="el-icon-sort-down" size="mini" @click="sortDown(row)"></el-button>
          </el-tooltip>

          <!-- <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(row)"></el-button> -->
          <el-button type="info" icon="el-icon-info" size="mini" @click="inof(row)"></el-button>

          <el-popconfirm
            confirm-button-text="好的"
            cancel-button-text="不用了"
            icon="el-icon-info"
            icon-color="red"
            title="这是一段内容确定删除吗？"
            @confirm="del(row)"
            style="marginLeft:10px"
          >
            <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini"></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 抽屉 -->
    <el-drawer
      title="数据详情"
      :visible.sync="drawer"
      direction="rtl"
      size="50%"
      :before-close="handleClose"
    >
      <el-row v-for="(v, i) in drawerArr" :key="i">
        <el-col :span="5">{{ v }}:</el-col>
        <el-col :span="16" v-if="i == 0">{{ drawerData.skuName }}</el-col>
        <el-col :span="16" v-if="i == 1">{{ drawerData.createTime }}</el-col>
        <el-col :span="16" v-if="i == 2">{{ drawerData.skuDesc }}</el-col>
        <el-col :span="16" v-if="i == 3">
          <div style="marginTop:3px">{{ drawerData.price }} 元</div>
        </el-col>
        <el-col :span="16" v-if="i == 4">
          <div style="marginTop:5px">{{ drawerData.weight }} kg</div>
        </el-col>
        <el-col :span="16" v-if="i == 5">
          <el-tag v-for="(tag, i) in drawerData.skuAttrValueList" :key="i">{{ tag.valueName }}</el-tag>
        </el-col>
        <!-- 轮播 -->
        <el-col :span="16" v-if="i == 6">
          <el-carousel
            :interval="4000"
            type="card"
            height="200px"
            :indicator-position="skuImageListLength == 1 ? 'none' : 'outside'"
            v-if="skuImageListLength"
          >
            <el-carousel-item
              class="card"
              v-for="(item, index) in drawerData.skuImageList"
              :key="index"
            >
              <div class="image">
                <el-image :src="item.imgUrl" fit="contain"></el-image>
              </div>
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-carousel-item>
          </el-carousel>
          <span v-else>暂无图片</span>
        </el-col>
      </el-row>
    </el-drawer>
    <!-- 分页 -->
    <el-pagination
      style="text-align:center"
      :current-page="pagination.page"
      :page-sizes="pagination.sizes"
      :page-size="pagination.limit"
      layout="total, prev, pager, next, jumper, ->, sizes"
      :total="pagination.total"
      @current-change="currentChange"
      @size-change="sizeChange"
    ></el-pagination>
  </div>
</template>

<script>import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'SkuIdex',
  data () {
    return {
      drawer: false, // 抽屉开关
      drawerArr: ['名称', '创建时间', '描述', '价格', '重量', '平台属性', '商品图片']
    }
  },
  methods: {
    ...mapMutations({
      CHANGE_PAGINATION: (commit, poly) => commit('sku/CHANGE_PAGINATION', poly),
      CHANGE_LOADING: (commit, poly) => commit('sku/CHANGE_LOADING', poly)
    }),
    ...mapActions({
      skuListAsync: (dispatch, poly) => dispatch('sku/skuListAsync', poly),
      sortUpOnSale: (dispatch, poly) => dispatch('sku/sortUpOnSale', poly),
      sortDownCancelSale: (dispatch, poly) => dispatch('sku/sortDownCancelSale', poly),
      getSkuById: (dispatch, poly) => dispatch('sku/getSkuById', poly),
      deleteSku: (dispatch, poly) => dispatch('sku/deleteSku', poly)
    }),
    // 分页器 页码变化时
    currentChange (num) {
      this.CHANGE_LOADING(true)
      this.CHANGE_PAGINATION({ page: num })
      this.skuListAsync(this.pagination)
    },
    // 分页器 页面条数变化时
    sizeChange (num) {
      this.CHANGE_LOADING(true)
      this.CHANGE_PAGINATION({ limit: num })
      this.skuListAsync(this.pagination)
    },
    // 自定义索引
    typedIndex (index) {
      const { limit, page } = this.pagination
      return limit * (page - 1) + index + 1
    },
    // 下架按钮
    sortDown (row) {
      row.isSale = 1
      this.sortUpOnSale(row.id)
    },
    // 上架按钮
    sortUp (row) {
      row.isSale = 0
      this.sortDownCancelSale(row.id)
    },
    // 编辑
    edit () {
      this.$message.closeAll()
      this.$message('还不能使用')
    },
    // 抽屉关闭前
    handleClose (done) {
      done()
    },
    // 查看
    inof (row) {
      this.getSkuById(row.id)
        .then(res => {
          console.log({ ...this.drawerData })
          this.drawer = true
        }).catch((message) => {
          this.$message.closeAll()
          this.$message({ type: 'error', message })
        })
    },
    // 删除
    del (row) {
      console.log(row)
      this.deleteSku(row.id)
    }
  },
  computed: {
    ...mapState({
      pagination: store => store.sku.pagination,
      skuList: store => store.sku.skuList,
      loading: store => store.sku.loading,
      drawerData: store => store.sku.drawerData
    }),
    skuImageListLength () {
      return this.drawerData.skuImageList && this.drawerData.skuImageList.length
    }

  },

  mounted () {
    this.skuListAsync(this.pagination)
  }
}
</script>

<style lang='less' scoped>
.el-row {
  margin: 15px 0;
  .el-col-5 {
    text-align: right;
    font-size: 18px;
    font-weight: bold;
  }
}
.el-col {
  margin: 10px;
}
.el-tag {
  margin: 3px 5px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-drawer__body {
  margin-top: 30px;
}
.card {
  background-color: #ffffff !important;
}

.image {
  width: 100%;
  height: 100%;
  .el-image {
    width: 100%;
    height: 100%;
  }
}
</style>
