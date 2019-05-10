export default {
  path: '/task',
  title: '任务',
  children: (pre => [
    {
      path: `${pre}index`,
      title: '任务管理'
    },
    {
      path: `${pre}manage`,
      title: '任务模版管理'
    }
  ])('/task/')

}
// export default {
//   path: '/task/index',
//   title: '任务管理'
// }
