<template>
  <div class="Spu">
    <!-- 三级联动select -->
    <el-card>
      <card-three-select @getShopId="getCategory" :disabled="isShowTable"></card-three-select>
    </el-card>

    <el-card class="box-card">
      <!-- 表格 -->

      <keep-alive>
        <component :is="com"></component>
      </keep-alive>
    </el-card>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import SpuList from './components/spuList'
import AddSpu from './components/addSpu'
import AddSku from './components/addSku'
export default {
  name: 'SpuIndex',
  components: { SpuList, AddSpu, AddSku },
  data () {
    return {

    }
  },
  methods: {
    ...mapMutations({
      CHANGE_S_TABLE: (commit, poly) => commit('spu/CHANGE_S_TABLE', poly),
      CHANGE_S_FORM: (commit, poly) => commit('spu/CHANGE_S_FORM', poly),
      RESET_STATE: (commit, poly) => commit('spu/RESET_STATE')
    }),
    ...mapActions({
      getSpuDate: (dispatch, poly) => dispatch('spu/getSpuDate', poly)
    }),

    // 获取三级列表的id  =>  sForm
    getCategory (idList) {
      this.CHANGE_S_FORM({ ...idList })

      //  获取spu数据 接口
      this.getSpuDate({ ...this.pagination, ...this.sForm })
    }
  },
  computed: {
    ...mapState({
      sTable: state => state.spu.sTable,
      sForm: state => state.spu.sForm,
      pagination: state => state.spu.pagination,
      scene: state => state.spu.scene,
      isShowTable: state => state.spu.isShowTable
    }),
    com () {
      let comp = null
      switch (this.scene) {
        case 0:
          comp = 'SpuList'
          break
        case 1:
          comp = 'AddSpu'
          break
        case 2:
          comp = 'AddSku'
          break
      }

      return comp
    }
  },
  beforeDestroy () {
    this.RESET_STATE() // 重置
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
