<template>
  <div style="padding: 0 15px" @click="toggleClick">
    <span
      :class="{ 'is-active': isActive }"
      class="iconfont icon-hamburger hamburger"
    ></span>
  </div>
</template>

<script>
export default {
  name: 'HamBurger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleClick () {
      this.$emit('toggleClick')
    }
  }
}
</script>

<style scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  transform:scale(1.5)
}

.hamburger.is-active {
  transform: scale(1.5) rotate(180deg);
}
</style>
