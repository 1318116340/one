import layoutHeaderAside from '@/layout/header-aside'
const meta = { requiresAuth: true }

export default {
  path: '/task',
  name: 'task',
  meta,
  component: layoutHeaderAside,
  redirect: { name: 'task-index' },
  children: (pre => [
    { path: 'index', name: `${pre}index`, component: () => import(/* webpackChunkName: "about" */'@/pages/task/index/index.vue'), meta: { ...meta, cache: true, title: '任务管理' } },
    { path: 'manage', name: `${pre}manage`, component: () => import(/* webpackChunkName: "about" */'@/pages/task/manage/manage.vue'), meta: { ...meta, cache: true, title: '任务模版管理' } }
  ])('task-')
}
