<template>
  <div class="funds-charge-form form-shadow" v-loading="loadView">
    <div>
      <el-form ref="form" :model="form" label-position="top" label-width="120px" :rules="rules" size="medium">
        <el-form-item label="转账至该账户" required>
          <ul class="ul-unstyle">
            <li v-for="(item,index) in bank" :key="index">{{item}}</li>
          </ul>
        </el-form-item>
        <el-form-item label="转账金额" prop="money">
          <el-input v-model="form.money" clearable>
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="备注/附言/摘要：" prop="remark">
          <div class="remark">{{form.remark}}</div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="handleSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { GetRechargeInfo, HandleRecharge } from '@/api/pages/funds'
export default {
  data () {
    return {
      form: {
        money: '',
        remark: ''
      },
      loadView: false,
      btn_submit: ['提交', '提交中'],
      load_submit: false,
      rules: {
        money: [
          { required: true, message: '请输入转账金额', trigger: 'change' }
        ]
      },
      bank: []
    }
  },
  computed: {
    submitBtnText () {
      return this.btn_submit[this.load_submit ? 1 : 0]
    }
  },
  mounted () {
    this.getRechargeInfo()
  },
  methods: {
    /**
     * @description 提交表单
     */
    handleSubmit () {
      this.$refs['form'].validate(valid => {
        if (valid) this.handleRecharge()
      })
    },
    /**
     * @description 请求 - 充值
     */
    handleRecharge () {
      this.load_submit = true
      HandleRecharge(this.form)
        .then(res => {
          this.$message({
            type: 'success',
            message: '提交成功，等待审核'
          })
          this.$emit('changeTab', 1)
        })
        .finally(() => {
          this.load_submit = false
        })
    },
    /**
     * @description 请求 - 获取充值账户信息
     */
    getRechargeInfo () {
      this.loadView = true
      GetRechargeInfo()
        .then(res => {
          this.bank = res.bank
          this.form.remark = res.remark
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.loadView = false
        })
    }
  }
}
</script>
<style lang="scss">
.funds-charge-form {
  .remark {
    color: red;
    font-weight: 500;
    font-size: 16px;
  }
  .ul-unstyle {
    li {
      font-weight: 500;
    }
  }
}
</style>
