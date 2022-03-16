<template>
    <el-tooltip v-bind="$attrs" placement="top">
        <el-button v-bind="$attrs" v-on="$listeners"></el-button>
    </el-tooltip>
</template>

<script>

export default {
  name: 'HinButton'

}
</script>

<style lang='less' scoped>
.HinButton {
}
</style>
