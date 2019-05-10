<template>
  <div class="member-blacklist-form form-shadow">
    <el-form
      ref="form"
      :model="form"
      label-position="top"
      label-width="100px"
      :rules="rules"
      size="medium"
    >
      <el-form-item label="拉黑手机号" prop="mobile">
        <el-input v-model="form.mobile" clearable></el-input>
      </el-form-item>
      <el-form-item label="拉黑原因" prop="refuse_reason">
        <el-input
          v-model="form.refuse_reason"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          style="width:100%"
          :loading="load_submit"
          @click="handleSubmit"
        >{{submitBtnText}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { AddBlacklist } from '@/api/pages/member/blacklist'
export default {
  data () {
    return {
      form: {
        mobile: '',
        refuse_reason: ''
      },
      load_submit: false,
      btn_submit: ['添加', '添加中'],
      rules: {
        mobile: [
          { required: true, message: '请输入拉黑手机号', trigger: 'change' }
        ],
        refuse_reason: [
          { required: true, message: '请输入拉黑原因', trigger: 'change' }
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
        if (valid) this.addBlacklist()
      })
    },
    /**
     * @description 请求 - 添加黑名单
     */
    addBlacklist () {
      this.load_submit = true
      AddBlacklist(this.form)
        .then(res => {
          this.$message({
            type: 'success',
            message: '添加成功'
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
