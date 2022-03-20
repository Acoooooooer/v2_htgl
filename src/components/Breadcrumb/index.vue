<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(v, i) in levelList" :key="v.path">
        <span
          v-if="v.redirect === 'noRedirect' || i == levelList.length - 1"
          class="no-redirect"
        >{{ v.meta.title }}</span>
        <a v-else @click.prevent="handleLink(v)">{{ v.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'BreadCrumb',
  data () {
    return {
      levelList: null
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  },
  created () {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb () {
      // 获取 title
      let matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title
      )

      if (!this.isDashboard(matched[0])) {
        matched = [
          { path: '/dashboard', meta: { title: 'Dashboard' } },
          ...matched
        ]
      }
      this.levelList = matched
      // this.levelList = matched.filter(item => item?.meta?.title && !item?.meta?.breadcrumb)
    },
    isDashboard (route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'dashboard'
    },
    handleLink (item) {
      const { redirect, path } = item
      sessionStorage.setItem('path', redirect || path)
      if (redirect) {
        this.$router.push(redirect)
        return
      }

      this.$router.push(path)
    }
  }
}
</script>

<style lang="less" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  user-select: none;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
