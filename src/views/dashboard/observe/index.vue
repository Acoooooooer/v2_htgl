<template>
    <div class="observe">
        <el-row :gutter="10">
            <el-col :span="12">
                <search-index />
            </el-col>
            <el-col :span="12">
                <cate-gory />
            </el-col>
        </el-row>
    </div>
</template>

<script>
import SearchIndex from './search'
import CateGory from './category'

export default {
  name: 'ObserveIndex',
  components: {
    SearchIndex,
    CateGory
  }
}
</script>

<style lang="less" scoped>
.observe {
    margin-top: 15px;
}
</style>
