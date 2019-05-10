import layoutHeaderAside from '@/layout/header-aside'
const meta = { requiresAuth: true }

export default {
  path: '/shopkeeper',
  name: 'shopkeeper',
  meta,
  component: layoutHeaderAside,
  redirect: { name: 'shopkeeper-manage' },
  children: (pre => [
    { path: 'manage', name: `${pre}manage`, component: () => import(/* webpackChunkName: "about" */'@/pages/shopkeeper/manage/manage.vue'), meta: { ...meta, cache: true, title: '掌柜管理' } },
    { path: 'bind', name: `${pre}bind`, component: () => import(/* webpackChunkName: "about" */'@/pages/shopkeeper/bind/bind.vue'), meta: { ...meta, cache: true, title: '掌柜绑定' } }
  ])('shopkeeper-')
}
