<template>
  <div class="member-edit-pwd form-shadow">
    <el-form
      ref="form"
      :model="form"
      label-position="top"
      label-width="100px"
      :rules="rules"
      size="medium"
    >
      <el-form-item label="发送短信验证码至:" prop="mobile">
        <div class="mobile">{{this.form.mobile}}</div>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          type="text"
          v-model="form.code"
          placeholder="短信验证码"
          @keyup.enter.native="handleSubmit"
          v-popover:popover2
          style="width:200px;"
        >
          <d2-icon slot="prefix" name="comment-o" others="el-input__icon"/>
        </el-input>
        <el-button
          :type="load_sms ? `info` : `primary`"
          style="float:right;width:100px;"
          :disabled="load_sms"
          @click="handleSendSms"
        >{{smsBtnText}}</el-button>
      </el-form-item>
      <el-form-item label="新密码" prop="new_password">
        <el-input  type="password" v-model="form.new_password" clearable >
          <d2-icon slot="prefix" name="keyboard-o" others="el-input__icon"/>
        </el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="re_password">
        <el-input  type="password" v-model="form.re_password" clearable>
          <d2-icon slot="prefix" name="keyboard-o" others="el-input__icon"/>
        </el-input>
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
import { mapState } from 'vuex'
import { SendSms } from '@/api/sys/register'
import { AccountForget } from '@/api/sys/forget'
const mobileReg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/
export default {
  data () {
    return {
      form: {
        mobile: '',
        code: '',
        new_password: '',
        re_password: ''
      },
      // 校验
      rules: {
        code: [
          { required: true, message: '请输入短信验证码', trigger: 'change' }
        ],
        new_password: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        re_password: [
          { required: true, message: '请确认新密码', trigger: 'blur' }
        ]
      },
      load_submit: false,
      btn_submit: ['重置密码', '正在重置密码'],
      load_sms: false,
      countDown: null,
      smsBtnText: '立即发送'
    }
  },
  computed: {
    ...mapState('d2admin/user', ['info']),
    submitBtnText () {
      return this.btn_submit[this.load_submit ? 1 : 0]
    }
  },
  mounted () {
    this.form.mobile = this.info.mobile || this.info.name
  },
  methods: {
    /**
     * @description 提交重置密码信息
     */
    handleSubmit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.handleAccountForget()
        }
      })
    },
    /**
     * @description 短信倒计时
     */
    handleCountDown (open, startTime) {
      let time = startTime || 60
      this.smsBtnText = `${time} 秒`
      this.load_sms = true
      this.countDown = setInterval(() => {
        time--
        if (time > 0) {
          this.smsBtnText = `${time} 秒`
        } else {
          this.resetCountDown()
        }
      }, 1000)
    },
    /**
     * @description 恢复倒计时按钮
     */
    resetCountDown () {
      this.smsBtnText = `重新发送`
      this.load_sms = false
      clearInterval(this.countDown)
    },
    /**
     * @description 发送短信验证码
     */
    handleSendSms () {
      if (!mobileReg.test(this.info.mobile || this.info.name)) {
        this.$message.error('您注册时的手机号有误，请联系管理员')
      } else {
        this.handleCountDown(true, 15)
        this.sendSms()
      }
    },
    /**
     * @description 请求 - 发送短信验证码
     */
    sendSms () {
      SendSms({
        mobile: this.info.mobile || this.info.name,
        type: 'register'
      })
        .then(res => {
          this.$message({
            type: 'success',
            message: '短信验证码发送成功，请注意查收'
          })
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.load_sms = false
        })
    },
    /**
     * @description 请求 - 忘记密码
     */
    handleAccountForget () {
      this.load_submit = true
      AccountForget(this.form)
        .then(res => {
          this.$message({
            type: 'success',
            message: '密码重置成功'
          })
          this.$router.push({ name: 'home' })
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
<style lang="scss">
.member-edit-pwd {
  .mobile {
    font-size: 24px;
    color: red;
    font-weight: 500;
  }
}
</style>
