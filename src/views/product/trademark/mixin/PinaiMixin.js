
export default {
  data () {
    // const validateLogo = (rule, value, callback) => {
    //   console.log(rule, value, callback)
    //   callback()
    // }
    return {
      imageUrl: '',
      tmform: { // form 收集表单属性
        tmName: '',
        logoUrl: ''
      },
      rules: {
        tmName: [
          { required: true, message: '请输入名称', tigger: 'blur' },
          { min: 3, max: 12, message: '长度在3 到 12 之间', tigger: 'change' }
        ],
        logoUrl: [
          { required: true, message: '请上传logo', tigger: 'change' }
          // { required: true, validator: validateLogo, tigger: 'change' }
        ]
      }
    }
  },

  methods: {
    // 上传成功
    handleAvatarSuccess (res, file) {
      if (res.code === 200) {
        this.tmform.logoUrl = res.data
        this.$refs.tmform.validate()
      } else {
        this.$message({
          message: '上传失败',
          type: 'error'
        })
      }
    },
    // 上传之前
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 保存
    async OK () {
      this.$refs.tmform.validate(async (bol, obj) => {
        if (bol) {
          const result = await this.$apis.trademark.reqSaveOrUpdate(this.tmform)
          console.log(result)
          if (result.code === 200) {
            this.$message({
              message: !this.tmform.id ? '保存成功' : '修改成功',
              type: 'success'
            })
            if (this.$route.path === '/trademark/additem') {
              this.$router.push('/trademark')
            } else if (this.$route.path === '/trademark') {
              this.visible = false
              // 调用接口 刷新列表
              this.getPageList()
            }
          } else {
            this.$message({
              message: !this.tmform.id ? '保存失败' : '修改失败',
              type: 'error'
            })
          }
        } else {
          return false
        }
      })
    },
    changeTmName (tmName) {
      this.tmform.tmName = tmName
    },
    claerLogoUrl () { // 清除图片
      this.tmform.logoUrl = ''
    }
  }
}
/**
 *
 */
