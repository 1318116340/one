<template>
  <div class="funds-cash-apply form-shadow">
    <el-form
      ref="form"
      :model="form"
      label-position="top"
      label-width="100px"
      size="medium"
      :rules="rules"
      v-loading="loadView"
    >
      <el-form-item label="我的帐户" class="form-text" required>
        <div class="blacnce">
          可用余额
          <span>{{balance}}</span> 元
        </div>
      </el-form-item>
      <el-form-item label="提现说明" class="form-text" required>
        <div class="desc">1： 24小时可提现次数1次</div>
        <div class="desc">2： 单次提现最大金额5000元</div>
      </el-form-item>
      <el-form-item label="提现金额" prop="amount">
        <el-input v-model="form.amount" placeholder="单位: (元)" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :loading="load_submit"
          @click="handleSubmit"
        >{{submitBtnText}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { GetMemberInfo } from '@/api/pages/member/index'
import { HandleWithdraw } from '@/api/pages/funds'
export default {
  data () {
    return {
      form: {
        amount: ''
      },
      balance: '0.00',
      loadView: false,
      load_submit: false,
      btn_submit: ['申请', '正在申请'],
      rules: {
        amount: [
          { required: true, message: '请输入提现金额', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    submitBtnText () {
      return this.btn_submit[this.load_submit ? 1 : 0]
    }
  },
  mounted () {
    this.getMemberInfo()
  },
  methods: {
    /**
     * @description 保存掌柜
     */
    handleSubmit () {
      this.$refs['form'].validate(valid => {
        if (valid) this.handleWithdraw()
      })
    },
    /**
     * @description 请求 - 获取用户信息
     */
    getMemberInfo () {
      this.loadView = true
      GetMemberInfo()
        .then(res => {
          this.balance = res.info.balance || '0.00'
        })
        .finally(() => {
          this.loadView = false
        })
    },
    /**
     * @description 请求 - 提现申请
     */
    handleWithdraw () {
      this.load_submit = true
      HandleWithdraw(this.form)
        .then(res => {
          this.$message({
            type: 'success',
            message: '提现申请成功，等待管理员审核'
          })
          this.$emit('changeTab', 1)
        })
        .finally(() => {
          this.load_submit = false
        })
    }
  }
}
</script>
<style lang="scss">
.funds-cash-apply {
  .blacnce {
    font-size: 16px;
    span {
      margin: 0 10px;
      font-weight: 600;
      color: red;
      font-size: 18px;
    }
  }
  .desc {
    font-size: 14px;
    line-height: 28px;
    font-weight: 500;
  }
  .el-button{
    width: 100%;
  }
}
</style>
