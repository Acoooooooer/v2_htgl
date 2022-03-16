<template>
  <div class="Spu">
    <!-- 三级联动select -->
    <el-card>
      <card-three-select @getShopId="getCategory" :disabled="isShowTable"></card-three-select>
      {{ sForm }}
    </el-card>

    <el-card class="box-card">
      <el-button type="primary" icon="el-icon-plus">添加SPU</el-button>

      <keep-alive>
        <component :is="com"></component>
      </keep-alive>
      <!-- 表格 -->
    </el-card>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import SpuList from './components/spuList'
export default {
  name: 'SpuIndex',
  components: { SpuList },
  data () {
    return {
      isShowTable: true // 三级联动是否可选
    }
  },
  methods: {
    ...mapMutations({
      CHANGE_S_TABLE: (commit, poly) => commit('CHANGE_S_TABLE', poly),
      CHANGE_S_FORM: (commit, poly) => commit('CHANGE_S_FORM', poly)
    }),
    ...mapActions({
      getSpuList: (dispatch, poly) => dispatch('getSpuList', poly)
    }),

    // 获取三级列表的id  =>  sForm
    getCategory (idList) {
      this.CHANGE_S_FORM({ ...idList })
      this.getSpuList()
    },

    handle (v) {
      console.log(v)
    }
  },
  computed: {
    ...mapState({
      sTable: state => state.spu.sTable,
      sForm: state => state.spu.sForm
    }),
    com () {
      const comp = 'SpuList'
      return comp
    }
  }

}
</script>

<style lang='less' scoped>
.Spu {
  .el-card {
    margin: 20px 0;
  }
}
</style>
