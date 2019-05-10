<template>
  <div class="funds-cash-account form-shadow">
    <el-form
      ref="form"
      :model="form"
      label-position="top"
      label-width="120px"
      size="medium"
      :rules="rules"
      v-loading="loadView"
    >
      <el-form-item label="说明" class="form-text" required>
        <div class="desc">设置后禁止自行修改，如需修改请联系管理员</div>
      </el-form-item>
      <el-form-item label="支付宝"  prop="alipay_account">
        <el-input
          type="text"
          v-model="form.alipay_account"
          placeholder="支付宝"
          :disabled="isDisabled('alipay_account')"
          v-popover:popover
        ></el-input>

      </el-form-item>
      <el-form-item label="收款银行" prop="bank_name">
        <el-input
          type="text"
          v-model="form.bank_name"
          placeholder="收款银行"
          :disabled="isDisabled('bank_name')"
          v-popover:popover
        ></el-input>
      </el-form-item>
      <el-form-item label="银行卡账号" prop="bank_account">
        <el-input
          type="text"
          v-model="form.bank_account"
          placeholder="银行卡账号"
          :disabled="isDisabled('bank_account')"
          v-popover:popover2
        ></el-input>

      </el-form-item>
      <el-form-item label="开户行" required="">
        <div>
          <el-cascader
            :options="citys2"
            filterable
            :clearable="true"
            v-model="form.open_bank_citys"
            :disabled="isDisabled('open_bank_provinces')"
            placeholder="请选择开户省 / 市"
          ></el-cascader>
          <el-input
            type="text"
            v-model="form.deposit_bank"
            :disabled="isDisabled('deposit_bank')"
            placeholder="开户行"
          ></el-input>
        </div>
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
import { GetCashAccountInfo, BindCashAccount } from '@/api/pages/funds'
import citys2 from '@/libs/citys2'
import { cloneDeep } from 'lodash'
const formVal = {
  alipay_account: '',
  bank_name: '',
  bank_account: '',
  deposit_bank: '',
  open_bank_citys: ['', '']
}
export default {
  mixins: [citys2],
  data () {
    return {
      form: cloneDeep(formVal),
      initData: cloneDeep(formVal),
      load_submit: false,
      loadView: false,
      btn_submit: ['提交', '正在提交'],
      rules: {
        alipay_account: [
          { required: true, message: '请输入支付宝账号', trigger: 'change' }
        ],
        bank_name: [
          { required: true, message: '请输入收款银行', trigger: 'change' }
        ],
        bank_account: [
          { required: true, message: '请输入银行卡账号', trigger: 'change' }
        ]
      },
      citys2: citys2
    }
  },
  computed: {
    submitBtnText () {
      return this.btn_submit[this.load_submit ? 1 : 0]
    }
  },
  mounted () {
    this.getCashAccountInfo()
  },
  methods: {
    /**
     * @description 是否disbale元素（存在即不可编辑）
     */
    isDisabled (key) {
      let val = this.initData[key]
      return !!val && val !== '0'
    },
    /**
     * @description 提交表单
     */
    handleSubmit () {
      this.$refs['form'].validate(valid => {
        if (valid) this.bindCashAccount()
      })
    },
    /**
     * @description 请求 - 获取收款账号信息
     */
    getCashAccountInfo () {
      this.loadView = true
      GetCashAccountInfo(this.account)
        .then(res => {
          this.form = Object.assign(cloneDeep(this.form), null, {
            alipay_account: res.alipay_account || '',
            bank_name: res.bank_name || '',
            bank_account: res.bank_account || '',
            deposit_bank: res.deposit_bank || '',
            open_bank_citys: [
              res.open_bank_city || '',
              res.open_bank_provinces || ''
            ]
          })
          this.initData = cloneDeep(this.form)
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.loadView = false
        })
    },
    /**
     * @description 校验参数
     * @returns {Object} submitParams
     */
    validateParams (submitParams = {}) {
      submitParams = Object.assign(cloneDeep(this.form), null, {
        open_bank_city: this.form.open_bank_citys[0],
        open_bank_provinces: this.form.open_bank_citys[1]
      })
      delete submitParams.open_bank_citys
      if (!submitParams.open_bank_city || !submitParams.open_bank_provinces) {
        this.$message.error('请选择开户行所在省市')
        return false
      }
      if (!submitParams.deposit_bank) {
        this.$message.error('请输入开户行')
        return false
      }
      return submitParams
    },
    /**
     * @description 请求 - 绑定收款信息
     */
    bindCashAccount (submitParams = {}) {
      submitParams = this.validateParams()
      if (!submitParams) return
      this.load_submit = true
      BindCashAccount(submitParams)
        .then(res => {
          this.$message({
            type: 'success',
            message: '设置成功'
          })
          this.getCashAccountInfo()
        })
        .finally(() => {
          this.load_submit = false
        })
    }
  }
}
</script>
<style lang="scss">
.funds-cash-account {
  .desc {
    font-size: 16px;
    font-weight: 500;
  }
  .el-cascader {
    width: 100%;
    margin-bottom: 15px;
  }
}
</style>
