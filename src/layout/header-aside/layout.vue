<template>
  <div
    class="d2-layout-header-aside-group"
    :style="styleLayoutMainGroup"
    :class="{grayMode: grayActive}"
  >
    <!-- 主体内容 -->
    <div class="d2-layout-header-aside-content" flex="dir:top">
      <!-- 顶栏 -->
      <div class="d2-theme-header-bar">
        <div class="wrap">
          <d2-icon slot="prefix" name="bullhorn" class="horn"/>
          <div class="d2-theme-header-scroll-news">
            <div class="d2-theme-header-scroll-news-wrapper">
              <transition-group tag="ul" name="list" class="ul-unstyle">
                <li
                  v-show="idx === isCurrent"
                  v-for="(item, idx) in news"
                  :key="idx"
                  :class="['scroll-news-message']"
                  @click="$router.push({name:'news',params:{type:1},query:{id:item.id}})"
                >{{item.title}}</li>
              </transition-group>
            </div>
          </div>
          <div class="right-navs">
            <!-- <span @click="$router.push({name:'news',params:{type:4}})">下载APP</span>
            <i>|</i> -->
            <!-- <span @click="openCustomerWindow()">开启QQ临时会话</span>
            <i>|</i> -->
             <span @click="$router.push({name:'news',params:{type:2}})">新手帮助</span>
             <i>|</i>
            <span @click="$router.push({name:'news',params:{type:1}})">网站公告</span>
            <i>|</i>
            <span @click="$router.push({name:'news',params:{type:3}})">电商咨询</span>

          </div>
        </div>
      </div>
      <div class="d2-theme-header-panel">
        <div style="width:1200px;margin:0 auto;" class="d2-theme-header" flex-box="0" flex>
          <div class="logo-group" flex-box="0">
            <img :src="`${$baseUrl}image/theme/${themeActiveSetting.name}/logo/logo.png`" alt>
          </div>
          <d2-menu-header flex-box="1"/>
          <!-- 顶栏右侧 -->
          <div class="d2-header-right" flex-box="0">
            <d2-header-user/>
          </div>
        </div>
      </div>
      <!-- 下面 主体 -->
      <div class="d2-theme-container">
        <div class="d2-theme-container-main">
          <!-- 内容 -->
          <transition name="fade">
            <div v-show="!searchActive" class="d2-theme-container-main-layer">
              <!-- 页面 -->
              <div class="d2-theme-container-main-body">
                <transition name="fade" mode="out-in">
                  <keep-alive :include="keepAlive">
                    <router-view/>
                  </keep-alive>
                </transition>
              </div>
            </div>
          </transition>
        </div>
      </div>
      <!-- 底部 -->
      <d2-footer></d2-footer>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import mixinSearch from './mixins/search'
const news = [
  { title: '买手与商家注意事项', id: 2 },
  { title: '提现奖励更改通知', id: 1 }
]
export default {
  name: 'd2-layout-header-aside',
  mixins: [mixinSearch],
  components: {
    'd2-menu-side': () => import('./components/menu-side'),
    'd2-menu-header': () => import('./components/menu-header'),
    'd2-tabs': () => import('./components/tabs'),
    'd2-header-fullscreen': () => import('./components/header-fullscreen'),
    'd2-header-search': () => import('./components/header-search'),
    'd2-header-size': () => import('./components/header-size'),
    'd2-header-theme': () => import('./components/header-theme'),
    'd2-header-user': () => import('./components/header-user'),
    'd2-header-error-log': () => import('./components/header-error-log'),
    'd2-footer': () => import('./components/footer')
  },
  data () {
    return {
      news: [],
      isCurrent: 0
    }
  },
  computed: {
    ...mapState('d2admin', {
      keepAlive: state => state.page.keepAlive,
      grayActive: state => state.gray.active,
      transitionActive: state => state.transition.active,
      asideCollapse: state => state.menu.asideCollapse
    }),
    ...mapGetters('d2admin', {
      themeActiveSetting: 'theme/activeSetting'
    })
  },
  created () {
    this.autoPlay()
  },
  methods: {
    ...mapActions('d2admin/menu', ['asideCollapseToggle']),
    openCustomerWindow () {
      window.open(
        'http://wpa.qq.com/msgrd?v=3&uin=&site=在线客服&menu=yes'
      )
    },
    /**
     * @description 自动轮播公告
     */
    autoPlay () {
      this.news = news
      let length = this.news.length
      if (this.isCurrent >= length) {
        this.isCurrent = 0
        this.autoPlay()
      } else {
        setTimeout(() => {
          this.isCurrent++
          this.autoPlay()
        }, 3000)
      }
    }
  }
}
</script>

<style lang="scss">
// 注册主题
@import "~@/assets/style/theme/register.scss";
</style>
