<template>
  <div class="shopkeeper-manage-form form-shadow">
    <el-form
      ref="form"
      :model="form"
      label-position="top"
      :rules="rules"
      size="medium"
    >
      <el-form-item  label=""  prop="url">
        <p style="padding-bottom: 6px;font-size: 13px;margin:0;line-height:22px;padding-right: 20px;color: #606266;">1、淘宝店、京东店直接填店铺随意一款商品链接可直接绑定<br>2、拼多多店铺请按格式填写：pdd|店铺名</p>
        <el-input v-model="form.url" placeholder="链接地址" clearable></el-input>
      </el-form-item>
       <el-form-item>
         <el-button type="primary" size="medium" style="width:100%" :loading="load_submit" @click="handleSubmit">{{submitBtnText}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { AddShoper } from '@/api/pages/shopkeeper'
export default {
  data () {
    return {
      form: {
        url: ''
      },
      load_submit: false,
      btn_submit: ['绑定掌柜', '绑定中'],
      rules: {
        url: [
          { required: true, message: '请输入商品链接地址', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    submitBtnText () {
      return this.btn_submit[this.load_submit ? 1 : 0]
    }
  },
  methods: {
    /**
     * @description 保存掌柜
     */
    handleSubmit () {
      this.$refs['form'].validate(valid => {
        if (valid) this.addShoper()
      })
    },
    /**
     * @description 请求 - 添加掌柜
     */
    addShoper () {
      this.load_submit = true
      AddShoper(this.form)
        .then(res => {
          this.$message({
            type: 'success',
            message: '绑定成功'
          })
          this.$emit('changeTab', 1)
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.load_submit = false
        })
    }
  }
}
</script>
