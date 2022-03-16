<template>
  <div class="AddSku">
    AddSku
    <el-button @click="back" size="mini">返 回</el-button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'AddSku',
  methods: {
    ...mapMutations({
      CHANGE_SENCE: (commit, poly) => commit('spu/CHANGE_SENCE', poly),
      CHANGE_IS_SHOWTABLE: (commit, poly) => commit('spu/CHANGE_IS_SHOWTABLE', poly)
    }),
    back () {
      this.CHANGE_SENCE(0)
      this.CHANGE_IS_SHOWTABLE(true)
    }
  }
}
</script>

<style lang='less' scoped>
.AddSku {
}
</style>
