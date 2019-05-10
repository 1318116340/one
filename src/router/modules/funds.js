import layoutHeaderAside from '@/layout/header-aside'
const meta = { requiresAuth: true }

export default {
  path: '/funds',
  name: 'funds',
  meta,
  component: layoutHeaderAside,
  redirect: { name: 'funds-index' },
  children: (pre => [
    { path: 'charge', name: `${pre}charge`, component: () => import(/* webpackChunkName: "about" */'@/pages/funds/charge/charge.vue'), meta: { ...meta, cache: true, title: '资金充值' } },
    { path: 'cash', name: `${pre}cash`, component: () => import(/* webpackChunkName: "about" */'@/pages/funds/cash/cash.vue'), meta: { ...meta, cache: true, title: '资金提现' } },
    { path: 'record', name: `${pre}record`, component: () => import(/* webpackChunkName: "about" */'@/pages/funds/record/record.vue'), meta: { ...meta, cache: true, title: '资金流水' } }
  ])('funds-')
}
