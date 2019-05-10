<template>
  <div class="register-page">
    <div class="layer bg" id="login"></div>
    <div class="layer flex-center">
      <!-- logo部分 -->
      <div class="logo-group">
        <img src="~@/pages/login/image/logo.png" alt="logo">
        <div class="title">欢迎注册生财有道账号</div>
      </div>
      <!-- 表单部分 -->
      <div class="form-group">
        <el-card>
          <el-form
            ref="registerForm"
            label-position="left"
            :rules="rules"
            :model="form"
            size="medium"
          >
            <el-form-item prop="mobile">
              <el-popover ref="popover" placement="right-start" title width="180" trigger="focus">
                <ul class="register-popover">
                  <li>手机号为国内手机号</li>
                  <li>手机号用于登录账号</li>
                </ul>
              </el-popover>
              <el-input
                type="text"
                v-model="form.mobile"
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
            <el-form-item prop="password">
              <el-popover ref="popover3" placement="right-start" title width="180" trigger="focus">
                <ul class="register-popover">
                  <li>6-20个字符，密码不能和会员名相同</li>
                  <li>只能包含字母和数字</li>
                  <li>字母、数字最好包含2种或以上</li>
                </ul>
              </el-popover>
              <el-input
                type="password"
                v-model="form.password"
                placeholder="设置您的登录密码"
                @keyup.enter.native="handleSubmit"
                v-popover:popover3
              >
                <d2-icon slot="prefix" name="keyboard-o" others="el-input__icon"/>
              </el-input>
            </el-form-item>
            <el-form-item prop="re_password">
              <el-popover ref="popover4" placement="right-start" title width="180" trigger="focus">
                <ul class="register-popover">
                  <li>请再次输入您的密码</li>
                </ul>
              </el-popover>
              <el-input
                type="password"
                v-model="form.re_password"
                placeholder="确认您的密码"
                @keyup.enter.native="handleSubmit"
                v-popover:popover4
              >
                <d2-icon slot="prefix" name="keyboard-o" others="el-input__icon"/>
              </el-input>
            </el-form-item>
            <el-form-item prop="qq">
              <el-popover ref="popover5" placement="right-start" title width="180" trigger="focus">
                <ul class="register-popover">
                  <li>请输入您的QQ账号</li>
                </ul>
              </el-popover>
              <el-input
                type="text"
                v-model="form.qq"
                placeholder="QQ号（选填）"
                @keyup.enter.native="handleSubmit"
                v-popover:popover5
              >
                <d2-icon slot="prefix" name="qq" others="el-input__icon"/>
              </el-input>
            </el-form-item>
            <el-form-item prop="realname">
              <el-popover ref="popover6" placement="right-start" title width="180" trigger="focus">
                <ul class="register-popover">
                  <li>请输入您的真实姓名</li>
                </ul>
              </el-popover>
              <el-input
                type="text"
                v-model="form.realname"
                placeholder="真实姓名（选填）"
                @keyup.enter.native="handleSubmit"
                v-popover:popover6
              >
                <d2-icon slot="prefix" name="user-o" others="el-input__icon"/>
              </el-input>
            </el-form-item>

            <el-form-item prop="invitation_code">
              <el-input
                type="text"
                v-model="form.invitation_code"
                placeholder="邀请码（必填）"
                @keyup.enter.native="handleSubmit"
              >
                <d2-icon slot="prefix" name="handshake-o" others="el-input__icon"/>
              </el-input>
            </el-form-item>
            <!-- <el-form-item prop="gender">
              <el-radio-group v-model="form.gender">
                <el-radio-button :label="'1'"><i class="fa fa-male"></i>男</el-radio-button>
                <el-radio-button :label="'2'"><i class="fa fa-female"></i>女</el-radio-button>
              </el-radio-group>
            </el-form-item>-->
            <el-button
              size="meidum"
              @click="handleSubmit"
              type="primary"
              class="button-login"
              :load_submit="load_submit"
            >{{load_submit? '注册中':'立即注册'}}</el-button>
            <el-button type="text" class="login-btn" @click="handleLogin">已有账号,立即登录>></el-button>
          </el-form>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
require("particles.js");
import config from "@/pages/login/config/default";
import { mapActions } from "vuex";
import { SendSms } from "@/api/sys/register";
const mobileReg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
export default {
  data() {
    var validateMobile = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        if (!mobileReg.test(value)) {
          return callback(new Error("请输入正确的手机号"));
        }
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else {
        const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (!reg.test(value)) {
          return callback(new Error("请输入正确的邮箱格式"));
        }
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        const reg = /^[A-Za-z0-9]{6,20}$/;
        if (!reg.test(value)) {
          return callback(new Error("请输入6到20位的字母和数字"));
        }
        callback();
      }
    };
    var validateRePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请确认密码"));
      } else {
        const reg = /^[A-Za-z0-9]{6,20}$/;
        if (!reg.test(value)) {
          return callback(new Error("请输入6到20位的字母和数字"));
        }
        callback();
      }
    };
    return {
      // 表单
      form: {
        mobile: "",
        code: "",
        password: "",
        re_password: "",
        qq: "",
        realname: "",
        invitation_code: ""
        // gender: '1',
      },
      // 校验
      rules: {
        mobile: [
          { required: true, validator: validateMobile, trigger: "change" }
        ],
        code: [
          { required: true, message: "请输入短信验证码", trigger: "blur" }
        ],
        password: [
          { required: true, validator: validatePassword, trigger: "change" }
        ],
        re_password: [
          { required: true, validator: validateRePassword, trigger: "change" }
        ]
      },
      load_submit: false,
      load_sms: false,
      countDown: null,
      smsBtnText: "立即发送"
    };
  },
  mounted() {
    // 初始化例子插件
    particlesJS("login", config);
  },
  beforeDestroy() {
    // 销毁 particlesJS
    // thanks https://github.com/d2-projects/d2-admin/issues/65
    // ref https://github.com/VincentGarreau/particles.js/issues/63
    if (pJSDom && pJSDom.length > 0) {
      pJSDom[0].pJS.fn.vendors.destroypJS();
      pJSDom = [];
    }
  },
  created () {
    this.form.invitation_code = this.$route.query.code || ''
  },
  watch: {
    $route (to, from) {
      this.form.invitation_code = to.query.code || ''
    }
  },
  methods: {
    ...mapActions("d2admin/account", ["register"]),
    /**
     * @description 接收选择一个用户快速登录的事件
     * @param {Object} user 用户信息
     */
    handleUserBtnClick(user) {
      this.form.username = user.username;
      this.form.password = user.password;
      this.handleSubmit();
    },
    /**
     * @description 提交注册信息
     */
    handleSubmit() {
      this.$refs.registerForm.validate(valid => {
        if (valid && this.checkPassword()) {
          this.load_submit = true;
          this.register({
            vm: this,
            params: this.form
          });
        }
      });
    },
    /**
     * @description 进入登录页面
     */
    handleLogin() {
      this.$router.push({ name: "login" });
    },
    /**
     * @description 短信倒计时
     */
    handleCountDown(open, startTime) {
      let time = startTime || 60;
      this.smsBtnText = `${time} 秒`;
      this.load_sms = true;
      this.countDown = setInterval(() => {
        time--;
        if (time > 0) {
          this.smsBtnText = `${time} 秒`;
          this.load_sms = true;
        } else {
          this.resetCountDown();
        }
      }, 1000);
    },
    /**
     * @description 恢复倒计时按钮
     */
    resetCountDown() {
      this.smsBtnText = `重新发送`;
      this.load_sms = false;
      clearInterval(this.countDown);
    },
    /**
     * @description 发送短信验证码
     */
    handleSendSms() {
      if (!mobileReg.test(this.form.mobile)) {
        this.$message.error("请输入正确的手机号");
      } else {
        this.handleCountDown(true, 15);
        this.sendSms();
      }
    },
    /**
     * @description 校验密码
     */
    checkPassword() {
      if (this.form.password !== this.form.re_password) {
        this.$message.error("两次密码不一致");
        return false;
      }
      return true;
    },
    /**
     * @description 请求 - 发送短信验证码
     */
    sendSms() {
      SendSms({
        mobile: this.form.mobile,
        type: "register"
      })
        .then(res => {
          this.$message({
            type: "success",
            message: "短信验证码发送成功，请注意查收"
          });
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.load_sms = false;
        });
    }
  }
};
</script>

<style lang="scss">
@import "./style.scss";
</style>
