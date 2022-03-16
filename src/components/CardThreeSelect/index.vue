<template>
  <div class="CardThreeSelect">
    <el-form :inline="true" class="demo-form-inline" :model="cForm">
      <el-form-item label="一级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category1Id"
          @change="handler1"
          :disabled="!disabled"
        >
          <el-option v-for="(v, i) in category1" :label="v.name" :value="v.id" :key="v.name + i"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="二级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category2Id"
          @change="handler2"
          :disabled="!disabled"
        >
          <el-option v-for="(v, i) in category2" :label="v.name" :value="v.id" :key="v.name + i"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="三级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category3Id"
          @change="handler3"
          :disabled="!disabled"
        >
          <el-option v-for="(v, i) in category3" :label="v.name" :value="v.id" :key="v.name + i"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CardThreeSelect',
  props: ['disabled'],
  data () {
    return {
      category1: [],
      category2: [],
      category3: [],
      cForm: {
        category1Id: '',
        category2Id: '',
        category3Id: ''
      }

    }
  },
  mounted () {
    this.getCategory1List()
  },
  methods: {
    // 获取一级分类
    async getCategory1List () {
      const result = await this.$apis.attr.reqGetCategory1()
      if (result.code === 200) {
        this.category1 = result.data
        this.handler1(result.data[0].id)
        this.cForm.category1Id = ''
      }
    },
    // 获取二级分类
    async handler1 (id) {
      const result = await this.$apis.attr.reqGetCategory2(id)
      if (result.code === 200) {
        this.$nextTick(() => {
          this.category2 = result.data
          this.handler2(result.data[0].id)
          this.cForm.category2Id = ''
          this.cForm.category3Id = ''
        })
      }
    },
    // 获取三级分类
    async handler2 (id) {
      const result = await this.$apis.attr.reqGetCategory3(id)
      if (result.code === 200) {
        this.category3 = result.data
        this.cForm.category3Id = ''
      }
    },
    // 三级事件回调
    handler3 () {
      const isNullStr = Object.keys(this.cForm).some(v => this.cForm[v] === '')
      if (!isNullStr) this.$emit('getShopId', { ...this.cForm })
    }

  }
}
</script>

<style lang='less' scoped>
.CardThreeSelect {
  .el-form-item {
    margin-right: 50px;
  }
}
</style>
