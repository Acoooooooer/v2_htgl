<template>
    <!-- SPU列表结构 -->
    <div class="SpuList">
        <el-table border stripe style="width: 100%" :data="sTable.attrList">
            <el-table-column
                v-for="(v, i) in 5"
                :key="i"
                :prop="sTable.tableProp[i]"
                :label="sTable.tableLabel[i]"
                :width="sTable.tableWidth[i]"
                :align="i === 0 ? 'center' : ''"
            >
                <template slot-scope="{ row, $index }">
                    <!--  -->
                    <span v-if="sTable.tableProp[i] === 'id'">{{ $index + 1 }}</span>
                    <!--  -->
                    <span v-if="sTable.tableProp[i] === 'attrName'">{{ row.attrName }}</span>
                    <!--  -->
                    <div v-if="sTable.tableProp[i] === 'attrValueList'">
                        <el-tag
                            v-for="(val, inx) in row.attrValueList"
                            :key="`${val.valueName}${inx}`"
                            style="margin-left: 10px;"
                            :type="sTable.typeList | type"
                        >{{ val.valueName }}</el-tag>
                    </div>
                    <!--  -->
                    <span v-if="sTable.tableProp[i] === 'timer'">{{ row.timer }}</span>
                    <!--  -->
                    <div v-if="sTable.tableProp[i] === 'active'">
                        <el-button type="success" icon="el-icon-plus" size="mini"></el-button>
                        <el-button type="warning" icon="el-icon-edit" size="mini"></el-button>
                        <el-button type="info" icon="el-icon-info" size="mini"></el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
export default {
  name: 'SpuList',

  data () {
    return {

    }
  },
  methods: {
    ...mapMutations({
      CHANGE_S_TABLE: (commit, poly) => commit('CHANGE_S_TABLE', poly),
      CHANGE_C_FORM: (commit, poly) => commit('CHANGE_S_FORM', poly)
    }),
    ...mapActions({
      getSpuList: (dispatch, poly) => dispatch('getSpuList', poly)
    })

  },
  computed: {
    ...mapState({
      sTable: state => state.spu.sTable,
      sForm: state => state.spu.sForm
    })
  }

}
</script>

<style lang='less' scoped>
</style>
