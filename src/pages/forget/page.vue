<template>
  <div class="forget-page">
    <div class="layer bg" id="login"></div>
    <div class="layer flex-center">
      <!-- logo部分 -->
      <div class="logo-group">
         <img src="~@/pages/login/image/logo.png" alt="logo">
        <div class="title">找回密码</div>
      </div>

      <!-- 表单部分 -->
      <div class="form-group">
        <el-card>
          <el-form
            ref="forgetForm"
            label-position="left"
            :rules="rules"
            :model="formForget"
            size="medium"
          >
            <el-form-item prop="mobile">
              <el-popover ref="popover" placement="right-start" title width="200" trigger="focus">
                <ul class="register-popover">
                  <li>请输入您注册时填写的手机号</li>
                </ul>
              </el-popover>
              <el-input
                type="text"
                v-model="formForget.mobile"
                placeholder="手机号"
                @keyup.enter.native="handleSubmit"
                v-popover:popover
              >
                <d2-icon slot="prefix" name others="el-icon-mobile-phone el-input__icon"/>
              </el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-input
                type="text"
                v-model="formForget.code"
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
            <el-form-item prop="new_password">
              <el-popover ref="popover3" placement="right-start" title width="200" trigger="focus">
                <ul class="register-popover">
                  <li>6-20个字符，密码不能和会员名相同</li>
                  <li>只能包含字母和数字</li>
                  <li>字母、数字最好包含2种或以上</li>
                </ul>
              </el-popover>
              <el-input
                type="password"
                v-model="formForget.new_password"
                placeholder="请输入新密码"
                @keyup.enter.native="handleSubmit"
                v-popover:popover3
              >
                <d2-icon slot="prefix" name="keyboard-o" others="el-input__icon"/>
              </el-input>
            </el-form-item>
            <el-form-item prop="re_password">
              <el-popover ref="popover4" placement="right-start" title width="200" trigger="focus">
                <ul class="register-popover">
                  <li>请再次输入您的密码</li>
                </ul>
              </el-popover>
              <el-input
                type="password"
                v-model="formForget.re_password"
                placeholder="请确认您的新密码"
                @keyup.enter.native="handleSubmit"
                v-popover:popover4
              >
                <d2-icon slot="prefix" name="keyboard-o" others="el-input__icon"/>
              </el-input>
            </el-form-item>
            <el-button
              size="medium"
              @click="handleSubmit"
              type="primary"
              class="forget-btn"
              :load_submit="load_submit"
            >{{submitBtnText}}</el-button>
            <div>
              <el-button type="text" class="login-btn" @click="enterLogin">前往登录>></el-button>
            </div>
          </el-form>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import config from '@/pages/login/config/default'
import { mapActions } from 'vuex'
import { SendSms } from '@/api/sys/register'
import { AccountForget } from '@/api/sys/forget'
const mobileReg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/
require('particles.js')
export default {
  data () {
    var validateMobile = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else {
        if (!mobileReg.test(value)) {
          return callback(new Error('请输入正确的手机号'))
        }
        callback()
      }
    }
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        const reg = /^[A-Za-z0-9]{6,20}$/
        if (!reg.test(value)) {
          return callback(new Error('请输入6到20位的字母和数字'))
        }
        callback()
      }
    }
    var validateRePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请确认新密码'))
      } else {
        const reg = /^[A-Za-z0-9]{6,20}$/
        if (!reg.test(value)) {
          return callback(new Error('请输入6到20位的字母和数字'))
        }
        callback()
      }
    }
    return {
      // 表单
      formForget: {
        mobile: '',
        code: '',
        new_password: '',
        re_password: ''
      },
      // 校验
      rules: {
        mobile: [
          { required: true, validator: validateMobile, trigger: 'change' }
        ],
        code: [
          { required: true, message: '请输入短信验证码', trigger: 'blur' }
        ],
        new_password: [
          { required: true, validator: validatePassword, trigger: 'change' }
        ],
        re_password: [
          { required: true, validator: validateRePassword, trigger: 'change' }
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
    submitBtnText () {
      return this.btn_submit[this.load_submit ? 1 : 0]
    }
  },
  mounted () {
    // 初始化例子插件
    particlesJS('login', config)
  },
  beforeDestroy () {
    // 销毁 particlesJS
    // thanks https://github.com/d2-projects/d2-admin/issues/65
    // ref https://github.com/VincentGarreau/particles.js/issues/63
    if (pJSDom && pJSDom.length > 0) {
      pJSDom[0].pJS.fn.vendors.destroypJS()
      pJSDom = []
    }
  },
  methods: {
    ...mapActions('d2admin/account', ['register']),
    /**
     * @description 提交忘记密码信息
     */
    handleSubmit () {
      this.$refs.forgetForm.validate(valid => {
        if (valid && this.checkPassword()) {
          this.handleAccountForget()
        }
      })
    },
    /**
     * @description 进入登录页面
     */
    enterLogin () {
      this.$router.push({ name: 'login' })
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
          this.load_sms = true
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
      if (!mobileReg.test(this.formForget.mobile)) {
        this.$message.error('请输入正确的手机号')
      } else {
        this.handleCountDown(true, 15)
        this.sendSms()
      }
    },
    /**
     * @description 校验密码
     */
    checkPassword () {
      if (this.form.password !== this.form.re_password) {
        this.$message.error('两次密码不一致')
        return false
      }
      return true
    },
    /**
     * @description 请求 - 发送短信验证码
     */
    sendSms () {
      SendSms({
        mobile: this.formForget.mobile,
        type: 'register'
      })
        .then(res => {
          this.$message({
            type: 'success',
            message: '短信验证码发送成功，请注意查收'
          })
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
      AccountForget(this.formForget)
        .then(res => {
          this.$message({
            type: 'success',
            message: '密码重置成功'
          })
          this.enterLogin()
        })
        .finally(() => {
          this.load_submit = false
        })
    }
  }
}
</script>

<style lang="scss">
@import "./style.scss";
</style>
