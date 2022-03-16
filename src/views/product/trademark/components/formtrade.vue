<template>
  <!-- <el-form style="width: 80%" ref="tmform" :model="tmform" > -->
  <div>
    <el-form-item label="品牌名称" label-width="'100px'" prop="tmName">
      <el-input autocomplete="off" v-model="tmName" class="inp"></el-input>
    </el-form-item>

    <el-form-item label="品牌LOGO" label-width="'100px'" prop="logoUrl">
      <el-upload
        class="avatar-uploader"
        action="/dev-api/admin/product/fileUpload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        list-type="picture"
      >
        <div slot="tip" class="el-upload__tip">
          只能上传jpg/png文件, 且不超过500kb
        </div>
        <img
          v-if="tmform.logoUrl"
          @click.stop=""
          :src="tmform.logoUrl"
          class="avatar"
        />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        <i
          v-show="tmform.logoUrl"
          @click.stop="$emit('claerLogoUrl')"
          class="el-icon-delete position-icon"
        ></i>
      </el-upload>
    </el-form-item>
    <el-form-item> </el-form-item>
  </div>
  <!-- </el-form> -->
</template>

<script>
export default {
  name: 'FormTrade',
  props: ['tmform', 'handleAvatarSuccess', 'beforeAvatarUpload'],
  data () {
    return {
      tmName: ''
    }
  },

  watch: {
    // 修改v-model的属性
    tmform: {
      immediate: true,
      handler: function () {
        this.tmName = this.tmform.tmName
      }
    },
    tmName () {
      this.$emit('changeTmName', this.tmName)
    }
  }
}
</script>

<style  lang='less' scoped>
.avatar-uploader {
  .el-upload--picture {
    .position-icon {
      position: absolute;
      top: 10px;
      right: 10px;
      color: #ffffff;
      z-index: 9999;
      opacity: 0;
      transform: scale(1.15);
      &:hover {
        color: red;
      }
    }
    &:hover .position-icon {
      transition: 0.5s;
      opacity: 1;
    }
  }
}
</style>
