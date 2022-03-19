<template>
  <div class="TradeMarkIdex">
    <template v-if="$store.state.trademark.isShow">
      <router-view></router-view>
    </template>
    <div v-else>
      <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0" @click="showAddTbale">添加</el-button>

      <!-- 对话框 -->
      <el-dialog title="修改品牌" :visible.sync="visible">
        <!-- mixin 进的数据 -->
        <el-form style="width: 80%" :model="tmform" ref="tmform" :rules="rules">
          <form-trade
            :tmform="tmform"
            :handleAvatarSuccess="handleAvatarSuccess"
            :beforeAvatarUpload="beforeAvatarUpload"
            @changeTmName="changeTmName"
            @claerLogoUrl="claerLogoUrl"
          />
          <!-- <el-form-item label="品牌名称" label-width="'100px'" required prop="tmName">
            <el-input autocomplete="off" v-model="tmform.tmName"></el-input>
          </el-form-item>
          <el-form-item label="品牌LOGO" label-width="'100px'" required prop="logoUrl">
            <el-upload
              class="avatar-uploader"
              action="/dev-api/admin/product/fileUpload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件, 且不超过500kb
              </div>
              <img v-if="tmform.logoUrl" :src="tmform.logoUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>-->
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="OK">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 列表 -->
      <el-table style="width: 100%" :data="list" stripe lazy border>
        <el-table-column prop="id" label="序号" width="100" align="center">
          <template slot-scope="{ $index }">
            <span>{{ $index + 1 + (page - 1) * limit }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="tmName" label="品牌名称" show-overflow-tooltip></el-table-column>

        <el-table-column prop="logoUrl" label="品牌LOGO">
          <template slot-scope="{ row, $index }">
            <el-image>
              <div slot="error" class="image-slot">
                <span v-if="!row.logoUrl" class="el-icon-picture-outline"></span>
                <img v-else :src="row.logoUrl" :key="$index" class="logo_url" alt="err" />
              </div>
            </el-image>
          </template>
        </el-table-column>

        <el-table-column prop="timer" label="日期"></el-table-column>

        <el-table-column prop="prop" label="操作">
          <template slot-scope="{ row }">
            <el-button
              type="warning"
              icon="el-icon-edit"
              size="mini"
              @click="undateTradeMark(row)"
            >修改</el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              class="delete"
              @click="del(row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页器 -->
      <el-pagination
        :current-page="page"
        :total="total"
        :page-size="limit"
        :pager-count="7"
        :page-sizes="[5, 8, 12]"
        layout="total , prev , pager, next, jumper,->,sizes"
        style="margin-top: 20px; text-align: center"
        @size-change="sizeChange"
        @current-change="getPageList"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import PinaiMixin from './mixin/PinaiMixin'
import FormTrade from './components/formtrade'
export default {
  name: 'TradeMarkIdex',
  mixins: [PinaiMixin],
  components: { FormTrade },
  data () {
    return {
      page: 1, // 页码
      limit: 8, // 展示数据条数
      total: 0, // 总数据量
      list: [], // 数据列表
      visible: false
    }
  },
  methods: {
    // 拉取table数据
    async getPageList (pager = this.page) {
      this.page = pager
      // 品牌列表
      const { page, limit, $timer } = this
      const result = await this.$apis.trademark.reqTradeMarkList(page, limit)

      if (result.code === 200) {
        const { records, total } = result.data
        this.list = records.map((v, i) => {
          v.timer = $timer(
            $timer().valueOf() - parseInt(Math.random() * 1000000000)
          ).format('L LTS')
          if (v.tmName.includes('硅')) {
            v.tmName = '这是一个名字'
            v.logoUrl = 'http://47.93.148.192:8080/group1/M00/05/42/rBHu8mIz4dGATw5xAAZVHSssuyo174.jpg'
          }
          return v
        })
        this.total = total
      }
    },
    sizeChange (limit) {
      // 数据条数变化
      this.limit = limit
      this.getPageList()
    },
    // 添加
    showAddTbale () {
      // this.visible = true
      this.$router.push('/trademark/additem')
    },
    // 修改
    undateTradeMark (row) {
      this.tmform = { ...row } // 浅拷贝
      this.visible = true
    },
    // 删除
    del (row) {
      this.$confirm('是否删除该列?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const result = await this.$apis.trademark.resDelete(row.id)
        this.$message({
          type: result.code === 200 ? 'success' : 'error',
          message: result.code === 200 ? '删除成功!' : '删除失败'
        })
        if (result.code === 200) {
          // 当删到最后一条时
          this.getPageList(this.list.length === 1 && this.page > 1 ? this.page - 1 : this.page)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  mounted () {
    this.getPageList()
  }
}
</script>

<style lang='less'>
.TradeMarkIdex {
  .image-slot {
    width: 50px;
    height: 50px;
    span {
      border: 1px solid #aaaaaa;
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  // .el-form{
  //   margin: 0 auto;
  // }
  .inp {
    //   width: 80%;
    margin-left: 10px;
    position: absolute;
  }
  .el-upload__tip {
    margin-left: 92px;
  }
}
</style>

<style style='less' scoped>
.logo_url {
  width: 50px;
  height: 50px;
}
.delete {
  margin-left: 30px;
}
.image-slot {
  width: 50px;
  height: 50px;
}
</style>
