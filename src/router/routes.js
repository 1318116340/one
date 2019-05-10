/* 路由 */
import main from './modules/main'
import member from './modules/member'
import task from './modules/task'
import funds from './modules/funds'
/**
 * 在主框架内显示
 */
const frameIn = [
  main,
  member,
  task,
  funds,
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 页面重定向使用 必须保留
  {
    path: '/redirect/:path*',
    component: {
      beforeCreate () { this.$router.replace(JSON.parse(this.$route.params.path)) },
      render: h => h()
    }
  },
  // 登录
  {
    path: '/login',
    name: 'login',
    // component: () => import('@/pages/login')
    component: () => import(/* webpackChunkName: "users" */ '@/pages/login')
    // component: resolve => require(['@/pages/login'], resolve)
  },
  // 注册
  {
    path: '/register',
    name: 'register',
    // component: () => import('@/pages/register')
    component: () => import(/* webpackChunkName: "users" */ '@/pages/register')
    // component: resolve => require(['@/pages/register'], resolve)
  },
  // 忘记密码
  {
    path: '/forget',
    name: 'forget',
    component: () => import('@/pages/forget')
  },
    //推广
  {
    path: '/promote',
    name: 'promote',
    component: () => import(/* webpackChunkName: "users" */ '@/pages/promote')
    // component: resolve => require(['@/pages/register'], resolve)
  }

]

/**
 * 错误页面
 */
const errorPage = [
  // 404
  {
    path: '*',
    name: '404',
    component: () => import('@/pages/error-page-404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
