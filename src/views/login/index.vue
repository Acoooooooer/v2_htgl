<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      label-position="left"
      @submit.native.prevent
    >
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>

      <el-form-item prop="username">
        <span class="icon-container">
          <span class="iconfont icon-yonghu"></span>
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="icon-container">
          <span class="iconfont icon-suo"></span>
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          autocomplete="off"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <span :class="['iconfont', `icon-${passwordType ? 'biyan' : 'yanjing'}`]"></span>
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
      >登录</el-button>

      <!-- <el-button @click.native.prevent="aaa">获取列表</el-button> -->

      <div class="tips">
        <span style="margin-right: 20px;">管理权限</span>
        <span style="margin-right: 20px">
          username:
          <span class="user">admin</span>
        </span>
        <span>
          password:
          <span class="pwd">111111</span>
        </span>
      </div>
      <div class="tips">
        <span style="margin-right: 20px;">普通权限</span>
        <span style="margin-right: 20px">
          username:
          <span class="user">wode</span>
        </span>
        <span>
          &nbsp;password:
          <span class="pwd">111111</span>
        </span>
      </div>
    </el-form>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'LoinIndex',
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [
          { required: true, trigger: 'change', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'change', validator: validatePassword }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query.redirect
      },
      immediate: true
    }
  },
  computed: {
    ...mapState({
      routeStr: store => store.user.routeStr
    })
  },
  methods: {
    ...mapMutations({
      CHANEG_ROUTESTR: (commit, ploy) => commit('user/CHANEG_ROUTESTR', ploy)
    }),
    ...mapActions({
      login: (dispatch, ploy) => dispatch('user/login', ploy),
      permission: (dispatch, ploy) => dispatch('user/permission', ploy)
    }),
    aaa () {
      this.permission()
    },
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        // 获焦
        this.$refs.password.focus()
      })
    },

    // 登录
    handleLogin () {
      // 验证是否符合规则
      this.$refs.loginForm.validate((valid) => {
        if (valid) { // 验证成功
          this.loading = true
          this.login(this.loginForm)
            .then((v) => {
              sessionStorage.setItem('path', this.redirect || '/')
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            })
            .catch((err) => {
              console.log(err)
              Message({
                type: 'error',
                message: err
              })
              this.loading = false
            })
        } else {
          Message('请完成表单')
          return false
        }
      })
    }
  }
}
</script>

<style lang="less">
@bg: #283443;
@light_gray: #fff;
@cursor: #fff;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    .el-form-item__content {
      border: 1px solid;
      &:hover {
        transition: 1s;
        border-color: black;
      }
    }

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: @light_gray;
      height: 47px;
      caret-color: @cursor;
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="less" scoped>
@bg: #2d3a4b;
@dark_gray: #889aa4;
@light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: @bg;
  overflow: hidden;
  background: url("assets/login/loginbg.jpg") no-repeat;
  background-size: 100% 100%;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    background: #2d3a4b50;

    span {
      .user {
        user-select: all;
      }
      .pwd {
        user-select: all;
      }
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .icon-container {
    padding: 6px 5px 6px 15px;
    color: @dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: @light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: @dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
