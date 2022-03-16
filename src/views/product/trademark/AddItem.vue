<template>
  <div>
    <h3>添加品牌</h3>
    <div class="add-pinpai">
      <div class="footer">
        <el-form style="width: 80%" ref="tmform" :model="tmform" :rules="rules">
          <form-trade
            :tmform="tmform"
            :handleAvatarSuccess="handleAvatarSuccess"
            :beforeAvatarUpload="beforeAvatarUpload"
            @changeTmName="changeTmName"
            @claerLogoUrl="claerLogoUrl"
          />
        </el-form>
        <el-button @click="back">返 回</el-button>
        <el-button type="primary" @click="OK">确 定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import PinaiMixin from './mixin/PinaiMixin'
import FormTrade from './components/formtrade'
export default {
  name: 'AddItem',
  props: ['a'],
  mixins: [PinaiMixin],
  components: { FormTrade },
  data () {
    return {
      timeout: null
    }
  },
  methods: {
    back () {
      this.$router.push('/trademark')
    },
    // 修改 this.tmform.tmName
    changeTmName (tmName) {
      this.tmform.tmName = tmName
    }
  },

  watch: {
    tmform: {
      deep: true,
      handler: function () {
        // 防抖
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          localStorage.tmform = JSON.stringify(this.tmform)
        }, 800)
      }
    }
  },

  beforeRouteEnter (to, form, next) {
    next((vm) => {
      vm.tmform = localStorage.tmform ? JSON.parse(localStorage.tmform) : vm.tmform
    })
  }
}
</script>

<style scoped lang='less'>
.add-pinpai {
  margin: 30px;
}
.footer {
  margin-left: 60px;
  margin-top: 80px;
  .el-button {
    margin-left: 20px;
  }
}
</style>
