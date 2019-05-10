import layoutHeaderAside from '@/layout/header-aside'
const meta = { requiresAuth: true }

export default {
  path: '/member',
  name: 'member',
  meta,
  component: layoutHeaderAside,
  redirect: { name: 'member-index' },
  children: (pre => [
    { path: 'index', name: `${pre}index`, component: () => import(/* webpackChunkName: "about" */'@/pages/member/index/index.vue'), meta: { ...meta, cache: true, title: '会员中心' } },
    { path: 'edit', name: `${pre}edit`, component: () => import(/* webpackChunkName: "about" */'@/pages/member/edit/edit.vue'), meta: { ...meta, cache: true, title: '编辑资料' } },
    { path: 'grade', name: `${pre}grade`, component: () => import(/* webpackChunkName: "about" */'@/pages/member/grade/grade.vue'), meta: { ...meta, cache: true, title: '会员升级' } },
    { path: 'blacklist', name: `${pre}blacklist`, component: () => import(/* webpackChunkName: "about" */'@/pages/member/blacklist/blacklist.vue'), meta: { ...meta, cache: true, title: '黑名单' } }
  ])('member-')
}
