<template>
  <div class="header-user">
    <div v-if="info.name === '请登录'" class="header-user__login" @click="login">你好 {{info.name}}</div>
    <div v-else>
      <el-dropdown class="d2-mr">
        <span class="btn-text">你好 {{info.name}}</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="forget">
            <d2-icon name="unlock-alt" class="d2-mr-5"/>重置密码
          </el-dropdown-item>
          <el-dropdown-item @click.native="logOff">
            <d2-icon name="power-off" class="d2-mr-5"/>退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('d2admin/user', ['info'])
  },
  mounted () {
    console.log(this.info.name !== '请登录')
  },
  methods: {
    ...mapActions('d2admin/account', ['logout']),
    /**
     * @description 登出
     */
    logOff () {
      this.logout({
        vm: this,
        confirm: true
      })
    },
    /**
     * @description 忘记密码
     */
    forget () {
      this.$router.push({
        name: 'member-edit',
        query: {
          sign: 'pwd'
        }
      })
    },
    /**
     * @description 登录
     */
    login () {
      if (this.info.name === '请登录') {
        this.$router.push({
          name: 'login'
        })
      }
    }
  }
}
</script>
<style lang="scss">
.header-user {
  .header-user__login {
    font-size: 14px;
    color: #444;
    cursor: pointer;
  }
}
</style>
