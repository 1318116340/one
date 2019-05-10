import layoutHeaderAside from '@/layout/header-aside'

const meta = { requiresAuth: true }

export default {
  path: '/',
  name: '/',
  redirect: { name: 'home' },
  meta,
  component: layoutHeaderAside,
  children: (pre => [
    { path: 'home', name: `${pre}home`, component: () => import(/* webpackChunkName: "about" */'@/pages/home/home.vue'), meta: { ...meta, cache: true, title: '首页' } },
    // { path: 'charge', name: `${pre}charge`, component: () => import(/* webpackChunkName: "about" */'@/pages/charge/charge.vue'), meta: { ...meta, cache: true, title: '资金管理' } },
    { path: 'inviter', name: `${pre}inviter`, component: () => import(/* webpackChunkName: "about" */'@/pages/inviter/inviter.vue'), meta: { ...meta, cache: true, title: '推广奖励' } },
    { path: 'issue', name: `${pre}issue`, component: () => import(/* webpackChunkName: "about" */'@/pages/issue/issue.vue'), meta: { ...meta, cache: true, title: '发布任务' } },
    { path: 'shopkeeper', name: `${pre}shopkeeper`, component: () => import(/* webpackChunkName: "about" */'@/pages/shopkeeper/shopkeeper.vue'), meta: { ...meta, cache: true, title: '掌柜' } },
    { path: '/news/:type', name: `${pre}news`, component: () => import(/* webpackChunkName: "about" */'@/pages/news'), meta: { ...meta, cache: true, title: '公告' } }
  ])('')

}
