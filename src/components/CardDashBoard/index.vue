<template>
    <div>
        CardDashBoard
        <el-row :gutter="10">
            <el-col :span="6" v-for="(v, i) in num" :key="i">
                <DetailCard :title="titles[i]" :count="counts[i]" :footer="footers[i]">
                    <template #charts>
                        <slot name="charts" :$index="i"></slot>
                    </template>
                </DetailCard>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import DetailCard from './DetailCard'
export default {
  name: 'CardDashBoard',
  components: {
    DetailCard
  },
  props: ['num', 'titles', 'counts', 'footers'],
  data () {
    return {

    }
  }

}
</script>

<style lang="less" scoped>
</style>
