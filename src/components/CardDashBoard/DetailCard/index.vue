<template>
    <div>
        <el-card>
            <div class="card-header">
                <span>{{ title }}</span>
                <span class="iconfont icon-Info"></span>
            </div>
            <div class="card-content">
                <span>{{ count }}</span>
            </div>
            <div class="card-charts">
                <slot name="charts"></slot>
            </div>
            <div class="card-footer">
                <span>{{ footer }}</span>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
  name: 'DetailCard',
  props: ['title', 'count', 'footer'],
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    color: #aaaaaa;
    font-size: 15px;
}
.card-content {
    font-size: 30px;
    padding: 10px 0;
}
.card-charts {
    height: 50px;
}
.card-footer {
    height: 50px;
    border-top: 1px solid #eeee;
    padding-top: 10px;
    span {
        display: inline-block;
        margin-top: 15px;
    }
}
</style>
