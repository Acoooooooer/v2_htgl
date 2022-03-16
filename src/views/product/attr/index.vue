<template>
  <div class="AttrIdex">
    <el-card>
      <card-three-select @getShopId="getShopId" :disabled="isShowTable"></card-three-select>
      {{ cForm }}
    </el-card>

    <el-card>
      <!-- <transition-group name="breadcrumb"> -->
      <!-- 添加的数据 -->
      <div v-show="!isShowTable" key="1">
        <el-form :inline="true" :model="attrInfo" ref="attrInfoadd" label-width="80px">
          <el-form-item label="属性名" prop="attrName">
            <el-input placeholder="请输入属性名" v-model="attrInfo.attrName">++</el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="add"
          :disabled="(!attrInfo.attrName)"
        >添加属性值</el-button>
        <el-button @click="back">取 消</el-button>

        <!-- 表格 -->
        <el-form :model="attrInfo" ref="attrInfotab" @submit.native.prevent>
          <el-form-item prop="attrValueList">
            <el-table border style="margin:20px 0" :data="attrInfo.attrValueList" stripe>
              <el-table-column
                v-for="(v, i) in 4"
                :key="`${i}`"
                :prop="cTabadd.tableProp[i]"
                :label="cTabadd.tableLabel[i]"
                :width="cTabadd.tableWidth[i]"
                :align="i === 0 ? 'center' : ''"
              >
                <template slot-scope="{ row, $index }">
                  <!--  -->
                  <span v-if="cTabadd.tableProp[i] === 'id'">{{ $index + 1 }}</span>
                  <!--  -->
                  <span v-if="cTabadd.tableProp[i] === 'attrName'">
                    <!--  -->
                    <span
                      class="span_vlaue"
                      @click="row.flag = true"
                      v-if="!row.flag"
                    >{{ row.valueName }}</span>
                    <el-input
                      v-if="row.flag"
                      placeholder="请输入属性值名称"
                      v-focus="row"
                      v-model="row.valueName"
                      :ref="'inp' + $index"
                      size="mini"
                      @blur="blur(row)"
                      @keyup.native.enter="row.flag = false"
                    ></el-input>
                  </span>
                  <!--  -->
                  <span v-if="cTabadd.tableProp[i] === 'timer'">{{ row.timer }}</span>
                  <!-- 删除 -->
                  <div v-if="cTabadd.tableProp[i] === 'active'">
                    <el-popconfirm
                      confirm-button-text="好的"
                      cancel-button-text="不用了"
                      icon="el-icon-info"
                      icon-color="red"
                      :title="`确定删除 ${row.valueName} 吗?`"
                      @confirm="delvalue($index)"
                    >
                      <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini">删除</el-button>
                    </el-popconfirm>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <!-- 保存  取消 -->
            <el-button
              type="primary"
              @click="saveOnce"
              :disabled="!attrInfo.attrValueList.length"
            >保存</el-button>
            <el-button @click="back">取消</el-button>
            <!--  -->
            {{ attrInfo.attrValueList.length }}条
          </el-form-item>
        </el-form>
      </div>

      <!-- 三级联动获取到的数据 -->
      <div v-show="isShowTable" key="2">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!cForm.category3Id"
          @click="attrInfoHandle"
        >添加属性</el-button>

        <!-- 表格 -->
        <el-table style="width:100%;margin-top: 10px;" border :data="cTable.attrList" stripe>
          <el-table-column
            v-for="(v, i) in 5"
            :key="`${v.attrName}${i}`"
            :prop="cTable.tableProp[i]"
            :label="cTable.tableLabel[i]"
            :width="cTable.tableWidth[i]"
            :align="i === 0 ? 'center' : ''"
          >
            <template slot-scope="{ row, $index }">
              <!--  -->
              <span v-if="cTable.tableProp[i] === 'id'">{{ $index + 1 }}</span>
              <!--  -->
              <span v-if="cTable.tableProp[i] === 'attrName'">{{ row.attrName }}</span>
              <!--  -->
              <div v-if="cTable.tableProp[i] === 'attrValueList'">
                <el-tag
                  v-for="(val, inx) in row.attrValueList"
                  :key="`${val.valueName}${inx}`"
                  style="margin-left: 10px;"
                  :type="cTable.typeList | type"
                >{{ val.valueName }}</el-tag>
              </div>
              <!--  -->
              <span v-if="cTable.tableProp[i] === 'timer'">{{ row.timer }}</span>
              <!--  -->
              <div v-if="cTable.tableProp[i] === 'active'">
                <!-- 修改 -->
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="changeAttr(row)"
                >修改</el-button>
                <!-- 删除 -->
                <el-popconfirm
                  confirm-button-text="好的"
                  cancel-button-text="不用了"
                  icon="el-icon-info"
                  icon-color="red"
                  :title="`确定删除 ${row.attrName} 吗?`"
                  @confirm="deleteAttr(row)"
                >
                  <el-button
                    slot="reference"
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    style="margin-left:15px"
                  >删除</el-button>
                </el-popconfirm>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- </transition-group> -->
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'AttrIdex',
  data () {
    return {
      cForm: {
        category1Id: '',
        category2Id: '',
        category3Id: ''
      },
      cTable: {
        tableLabel: ['序号', '属性值名称', '属性值列表', '日期', '操作'],
        tableWidth: [100, 280, '', 200, 300],
        tableProp: ['id', 'attrName', 'attrValueList', 'timer', 'active'],
        typeList: ['success', 'info', 'warning', 'danger'],
        attrList: [] // 数据列表
      },
      cTabadd: {
        tableLabel: ['序号', '属性值名称', '日期', '操作'],
        tableWidth: [100, '', 200, 300],
        tableProp: ['id', 'attrName', 'timer', 'active']
      },
      attrInfo: {
        attrName: '', // 属性名
        attrValueList: [ // 属性值
          // {
          //   attrId: 0, // 相应属性名的id
          //   valueName: ''
          // }
        ],
        categoryId: 0, // 三级分类id
        categoryLevel: 3
      },
      isShowTable: true
    }
  },
  directives: {
    focus: { // input获焦
      inserted (el, binding, vnode) {
        el.children[0].focus()
        vnode.context.isFocus = false
      }

    }
  },
  methods: {
    // 获取三级列表的id  =>  cForm
    getShopId (idList) {
      this.cForm = { ...idList }
      this.getAttrList()
    },
    // 通过三级id获取相关数据
    async getAttrList () {
      const result = await this.$apis.attr.getAttrList(this.cForm)
      if (result.code === 200) {
        this.cTable.attrList = result.data.map((v, i) => {
          v.timer = this.$timer(
            this.$timer().valueOf() - parseInt(Math.random() * 1000000000)
          ).format('L LTS')
          return v
        })
      }
    },
    // 第一个页面的添加属性
    attrInfoHandle () {
      this.isShowTable = false

      // 清除add页面列表数据
      this.$refs.attrInfoadd.resetFields()
      this.$refs.attrInfotab.resetFields()

      this.attrInfo.categoryId = this.cForm.category3Id
    },
    // 修改按钮
    changeAttr (row) {
      this.isShowTable = false
      this.isFocus = true

      this.attrInfo = this.$lds.cloneDeepWith(row, (a, b, c) => {
        if (typeof b === 'number') {
          a.timer = row.timer
          a.flag = false
        }
      })
    },
    // 添加属性值
    add () {
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        timer: this.$timer().format('L LTS'),
        flag: true,
        valueName: ''
      })
    },
    // 返回
    back () {
      this.isShowTable = true
      this.$nextTick(() => {
        this.$message.closeAll()
      })
    },

    // 失焦
    blur (row) {
      if (!row.valueName.trim()) {
        this.$message('不能为空')
        return
      }
      const isflag = this.attrInfo.attrValueList.some(v => {
        if (row !== v) {
          return v.valueName === row.valueName
        }
        return false
      })
      if (isflag) {
        this.$message('不能重复')
        return
      }
      row.flag = false
    },
    delvalue (i) {
      this.attrInfo.attrValueList.splice(i, 1)
      this.$nextTick(() => {
        this.$message.closeAll()
      })
    },
    // 修改属性 或 添加属性
    async saveOnce () {
      // 过滤
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(v => v.valueName.trim())
      const result = await this.$apis.attr.saveAttrInfo(this.attrInfo)
      if (result.code === 200 && result.ok) {
        this.getAttrList()
        this.isShowTable = true

        this.$nextTick(() => {
          this.$message.closeAll()

          this.$message({ message: '成功', type: 'success' })
        })
      }
    },
    // 删除Attr
    async deleteAttr (row) {
      const result = await this.$apis.attr.deleteAttr(row.id)
      console.log(result)
      if (result.code === 200 && result.ok) {
        this.getAttrList()
      }
    }
  },
  filters: {
    type (v) {
      return v[parseInt(Math.random() * 5)]
    }
  }

}
</script>

<style lang='less' scoped>
.AttrIdex {
  .el-card {
    margin: 20px 0;
  }
  .span_vlaue {
    display: block;
    cursor: pointer;
  }
}
</style>
