// polyfill
import 'babel-polyfill'
// Vue
import Vue from 'vue'
import App from './App'
// store
import store from '@/store/index'

// 粘贴复制文本
// import VueClipboard from 'vue-clipboard2'
// 核心插件
import d2Admin from '@/plugin/d2admin'
// 菜单和路由设置
import router from './router'
import menuHeader from '@/menu/header'
import { frameInRoutes } from '@/router/routes'
// 核心插件
Vue.use(d2Admin)

// Vue.use(VueClipboard)

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    // 处理路由 得到每一级的路由设置
    this.$store.commit('d2admin/page/init', frameInRoutes)
    // 设置顶栏菜单
    this.$store.commit('d2admin/menu/headerSet', menuHeader)
  },
  mounted () {
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('d2admin/account/load')
    // 获取并记录用户 UA
    this.$store.commit('d2admin/ua/get')
  }
}).$mount('#app')
