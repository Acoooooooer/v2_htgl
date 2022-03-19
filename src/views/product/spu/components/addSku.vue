<template>
  <div class="AddSku">
    <el-form ref="allForm" label-width="80px" @submit.native.prevent :data="skuData">
      <!-- SPU名称 -->
      <el-form-item label="SPU名称">
        <span>{{ skuData.spuName }}</span>
      </el-form-item>

      <!-- SKU名称 -->
      <el-form-item label="SKU名称" prop="skuName">
        <el-input placeholder="SKU名称" v-model="skuData.skuName"></el-input>
      </el-form-item>

      <!-- 价格(元) -->
      <el-form-item label="价格(元)" prop="price">
        <el-input placeholder="价格(元)" type="number" v-model="skuData.price"></el-input>
      </el-form-item>

      <!-- 重量(千斤) -->
      <el-form-item label="重量(千斤)" prop="weight">
        <el-input placeholder="重量(千斤)" type="number" v-model="skuData.weight"></el-input>
      </el-form-item>

      <!-- 规则描述 -->
      <el-form-item label="规则描述" prop="skuDesc">
        <el-input type="textarea" rows="5" placeholder="规则描述" v-model="skuData.skuDesc"></el-input>
      </el-form-item>

      <!-- 平台属性 -->
      <el-form-item label="平台属性">
        <el-form ref="ptForm" inline label-width="80px" :data="skuData">
          <!-- 屏幕尺寸 -->
          <el-form-item
            v-for="(attr, i) in attrInfoList"
            :key="attr.attrName + i"
            :label="attr.attrName"
          >
            <el-select v-model="attr.idAndAttrId" placeholder="请选择">
              <el-option
                v-for="(val, ind) in attr.attrValueList"
                :key="val.valueName + ind"
                :label="val.valueName"
                :value="`${val.id}:${val.attrId}`"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <!-- 销售属性 -->
      <el-form-item label="销售属性">
        <el-form ref="colorForm" inline label-width="80px">
          <!-- 颜色 -->
          <el-form-item
            v-for="(attr, i) in skuSaleAttrList"
            :key="attr.saleAttrName + i"
            :label="attr.saleAttrName"
          >
            <el-select v-model="attr.idAndValueId" placeholder="请选择">
              <el-option
                v-for="(val, ind) in attr.spuSaleAttrValueList"
                :key="val.saleAttrName + ind"
                :label="val.saleAttrValueName"
                :value="`${attr.id}:${val.id}`"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <!-- 图片列表 -->
      <el-form-item label="图片列表">
        <el-table
          ref="imgTabel"
          tooltip-effect="dark"
          style="width: 100%"
          border
          :data="kTable.spuList"
          @selection-change="handleSelectionChange"
        >
          <!-- <el-table-column type="selection" width="55"></el-table-column> -->
          <el-table-column type="selection" width="80"></el-table-column>
          <el-table-column
            v-for="(v, i) in kTable.tableProp"
            :key="v + i"
            :label="kTable.tableLabel[i]"
            :width="kTable.tableWidth[i]"
            :prop="v"
          >
            <template slot-scope="{row}">
              <el-image v-if="v === 'imgUrl'" style="width: 100px; " :src="row.imgUrl"></el-image>
              <span v-if="v === 'imgName'">{{ row.imgName }}</span>
              <div v-if="v === 'active'">
                <el-button
                  v-if="row.isDefault === 0"
                  type="primary"
                  size="mini"
                  @click="defaultHanlde(row, 1)"
                >设为默认</el-button>
                <el-button v-else size="mini" @click="defaultHanlde(row)">默认</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="ok">确 定</el-button>
        <el-button @click="back">返 回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'AddSku',
  date () {
    return {
      imageList: []
    }
  },
  methods: {
    ...mapMutations({
      CHANGE_SENCE: (commit, poly) => commit('spu/CHANGE_SENCE', poly),
      CHANGE_IS_SHOWTABLE: (commit, poly) => commit('spu/CHANGE_IS_SHOWTABLE', poly),
      RESET_SKUDATA: (commit, poly) => commit('spu/RESET_SKUDATA', poly),
      CHANGE_SKUDATA: (commit, poly) => commit('spu/CHANGE_SKUDATA', poly),
      RESET_ADD_DATA: (commit, poly) => commit('spu/RESET_ADD_DATA', poly)
    }),
    ...mapActions({
      skuSaveSkuInfo: (dispatch, poly) => dispatch('spu/skuSaveSkuInfo', poly)
    }),
    // 确定
    ok () {
      this.skuSaveSkuInfo(this.imageList)
    },
    // 返回
    back () {
      this.RESET_SKUDATA()
      this.RESET_ADD_DATA()
      this.CHANGE_SENCE(0)
      this.CHANGE_IS_SHOWTABLE(true)
    },
    // 多选框改变时
    handleSelectionChange (val) {
      console.log(val)
      this.imageList = val
    },
    // 设置默认
    defaultHanlde (row, num) {
      this.kTable.spuList.forEach(v => { v.isDefault = 0 })
      num && (row.isDefault = num)
      this.CHANGE_SKUDATA({ skuDefaultImg: row.imgUrl })
      console.log(row)
    }
  },
  computed: {
    ...mapState({
      kTable: store => store.spu.kTable,
      skuData: store => store.spu.skuData,
      attrInfoList: store => store.spu.attrInfoList,
      skuSaleAttrList: store => store.spu.skuSaleAttrList
    })
  }
}
</script>

<style lang='less' scoped>
.AddSku {
  margin: 15px;
}
</style>
