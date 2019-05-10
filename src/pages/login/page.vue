<template>
  <div class="login-page">
    <div class="bg-wrapper">
      <div class="bg"></div>
      <div class="login-body">
        <div class="login-inner clearfix">
          <div class="login-wrap">
            <h2>欢迎登录</h2>
            <el-form
              ref="loginForm"
              label-position="top"
              :rules="rules"
              :model="formLogin"
              size="default"
            >
              <el-form-item prop="username">
                <el-input
                  type="text"
                  v-model="formLogin.username"
                  placeholder="用户名"
                  @keyup.enter.native="submit"
                >
                  <d2-icon slot="prefix" name="user-o" others="el-input__icon"/>
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  type="password"
                  v-model="formLogin.password"
                  placeholder="密码"
                  @keyup.enter.native="submit"
                >
                  <d2-icon slot="prefix" name="keyboard-o" others="el-input__icon"/>
                </el-input>
              </el-form-item>
              <el-button
                size="default"
                @click="submit"
                type="primary"
                class="login-btn"
                :loading="loading"
              >{{loading? '登录中':'登录'}}</el-button>
              <div class="group-btn">
                <el-button type="text" class="forget-btn" @click="forget">忘记密码</el-button>
                <el-button type="text" class="register-btn" @click="register">立即注册</el-button>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <div>
      <layout-footer></layout-footer>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import layoutFooter from '@/layout/header-aside/components/footer'
export default {
  data () {
    return {
      // 表单
      formLogin: {
        username: '',
        password: ''
      },
      // 校验
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      loading: false
    }
  },
  components: {
    layoutFooter
  },
  methods: {
    ...mapActions('d2admin/account', ['login']),
    /**
     * @description 接收选择一个用户快速登录的事件
     * @param {Object} user 用户信息
     */
    handleUserBtnClick (user) {
      this.formLogin.username = user.username
      this.formLogin.password = user.password
      this.submit()
    },
    /**
     * @description 提交表单
     */
    submit () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 登录
          this.loading = true
          this.login({
            vm: this,
            mobile: this.formLogin.username,
            password: this.formLogin.password
          })
        } else {
          // 登录表单校验失败
          this.$message.error('请输入正确的格式')
        }
      })
    },
    /**
     * @description 进入注册页面
     */
    register () {
      this.$router.push({ name: 'register' })
    },
    /**
     * @description 进入忘记密码页面
     */
    forget () {
      this.$router.push({ name: 'forget' })
    }
  }
}
</script>

<style lang="scss">
@import "./style.scss";
</style>
