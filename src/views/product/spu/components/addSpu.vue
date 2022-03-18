<template>
  <div class="AddSpu">
    <el-form ref="form" label-width="80px" @submit.native.prevent :model="spuData">
      <!--  -->
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spuData.spuName"></el-input>
      </el-form-item>
      <!--  -->
      <el-form-item label="品牌">
        <el-select placeholder="请选择活动区域" v-model="spuData.tmId">
          <el-option v-for="(v, i) in tradmarkData" :key="i" :label="v.tmName" :value="v.id"></el-option>
        </el-select>
      </el-form-item>
      <!--  -->
      <el-form-item label="SPU描述">
        <el-input type="textarea" rows="4" placeholder="SPU描述" v-model="spuData.description"></el-input>
      </el-form-item>
      <!--  -->
      <el-form-item label="SPU图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="spuImage"
          :on-success="updateSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-form-item>
      <!--  -->
      <el-form-item label="销售属性">
        <el-select v-model="attrSelId" :placeholder="`还有${filsale.length}项未选`">
          <el-option v-for="(v, i) in filsale" :key="i + v.name" :label="v.name" :value="v.id"></el-option>
        </el-select>
        <!--  -->
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrSelId"
          @click="addAttrHandle"
        >添加销售属性</el-button>
        <!--  -->
        <el-table border :data="spuData.spuSaleAttrList">
          <el-table-column
            v-for="(v, i) in  addTab.tableProp"
            :key="v + i"
            :label="addTab.tableLabel[i]"
            :align="v === 'id' ? 'center' : ''"
            :prop="v"
            :width="addTab.tableWidth[i]"
          >
            <template slot-scope="{row, $index}">
              <!--  -->
              <span v-if="v === 'id'">{{ $index + 1 }}</span>
              <!--  -->
              <span v-if="v === 'saleAttrName'">{{ row.saleAttrName }}</span>
              <!--  -->
              <span v-if="v === 'spuSaleAttrValueList'">
                <el-tag
                  v-for="(tag, index) in row.spuSaleAttrValueList"
                  :key="tag.saleAttrValueName + index"
                  closable
                  :disable-transitions="false"
                  v-show="!tag.isChecked"
                  @close="handleClose(index, row)"
                >{{ tag.saleAttrValueName }}</el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="row.inputVisible"
                  v-model="row.saleAttrValueName"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(row)"
                  @blur="handleInputConfirm(row)"
                ></el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="addSelectAttrVaule(row)"
                >+ 添 加</el-button>
                <!-- {{ row.spuSaleAttrValueList }} -->
              </span>
              <!--  -->
              <span v-if="v === 'timer'">{{ row.timer }}</span>
              <!--  -->
              <span v-if="v === 'active'">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="delAttrHandle($index)"
                >删 除</el-button>
              </span>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <!--  -->
      <el-form-item>
        <el-button @click="ok">确 定</el-button>
        <el-button @click="back">返 回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
export default {
  name: 'AddSpu',
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      addTab: {
        tableLabel: ['序号', '属性名', '属性值列表', '日期', '操作'],
        tableWidth: [100, 280, '', 230, 300],
        tableProp: ['id', 'saleAttrName', 'spuSaleAttrValueList', 'timer', 'active']
      },
      attrSelId: '' // 收集未选择的销售属性的id
    }
  },
  methods: {
    ...mapMutations({
      CHANGE_SENCE: (commit, poly) => commit('spu/CHANGE_SENCE', poly),
      CHANGE_IS_SHOWTABLE: (commit, poly) => commit('spu/CHANGE_IS_SHOWTABLE', poly),
      RESET_ADD_DATA: (commit, poly) => commit('spu/RESET_ADD_DATA', poly),
      SET_SPUSALEATTRLIST: (commit, poly) => commit('spu/SET_SPUSALEATTRLIST', poly),
      DEL_SPUSALEATTRLIST: (commit, poly) => commit('spu/DEL_SPUSALEATTRLIST', poly),
      CHANGE_SPU_IMAGE: (commit, poly) => commit('spu/CHANGE_SPU_IMAGE', poly)
    }),
    ...mapActions({
      saveOrUpdateSpu: (dispatch, poly) => dispatch('spu/saveOrUpdateSpu', poly)
    }),
    // 修改 或 添加
    ok () {
      this.saveOrUpdateSpu(this.spuData)
      console.log(this.spuData)
    },
    // 返回
    back () {
      this.CHANGE_SENCE(0)
      this.CHANGE_IS_SHOWTABLE(true)
      this.RESET_ADD_DATA()
    },
    // 移除
    handleRemove (file, fileList) {
      this.CHANGE_SPU_IMAGE(fileList)
      // this.spuImageList = fileList
    },
    // 大图查看
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 图片上传成功
    updateSuccess (response, file, fileList) {
      this.CHANGE_SPU_IMAGE(fileList)
      // this.spuImageList = fileList
    },

    // 添加销售属性行
    addAttrHandle () {
      const { id, name } = this.filsale.find(v => v.id === this.attrSelId)

      const attrData = this.timer([{
        baseSaleAttrId: this.attrSelId,
        id: 0,
        isChecked: false,
        saleAttrName: name,
        spuSaleAttrValueList: [],
        spuId: id || ''
      }])

      this.SET_SPUSALEATTRLIST(attrData[0])
      this.attrSelId = ''
    },
    // 删除销售属性行
    delAttrHandle (num) {
      this.DEL_SPUSALEATTRLIST(num)
    },
    // 添加销售属性标签
    addSelectAttrVaule (row) {
      this.$set(row, 'inputVisible', true)
      this.$set(row, 'saleAttrValueName', '')
      this.$nextTick(_ => {
        this.$refs.saveTagInput[0].$refs.input.focus()
      })
    },
    // input 表单失焦
    handleInputConfirm (row) {
      row.inputVisible = false
      const { baseSaleAttrId, saleAttrValueName, saleAttrName, spuId } = row
      const ishas = row.spuSaleAttrValueList.every(v => v.saleAttrValueName !== saleAttrValueName)
      if (saleAttrValueName.trim() && ishas) {
        row.spuSaleAttrValueList.push({
          // id,
          saleAttrName,
          baseSaleAttrId,
          saleAttrValueName,
          isChecked: false,
          spuId
        })
      }
    },
    // 移除对应的标签
    handleClose (index, row) {
      row.spuSaleAttrValueList.splice(index, 1)
    }

  },
  computed: {
    ...mapState({
      spuData: store => store.spu.spuData,
      tradmarkData: store => store.spu.tradmarkData,
      spuImage: store => store.spu.spuImage,
      saleAttrList: store => store.spu.saleAttrList
    }),
    ...mapGetters(['filsale', 'timer'])
  },
  watch: {

  }

}
</script>

<style lang='less' scoped>
.AddSpu {
  .avatar-uploader {
    border: 1px dashed;
    width: 178px;
    height: 178px;
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .el-upload:hover {
      border-color: #409eff;
    }
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

  .el-tag {
    cursor: pointer;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
}
</style>
