export default {
  path: '/member',
  title: '会员管理',
  children: (pre => [
    {
      path: `${pre}index`,
      title: '会员中心'
    },
    {
      path: `${pre}edit`,
      title: '修改资料'
    },
    {
      path: `${pre}blacklist`,
      title: '黑名单'
    },
    {
      path: `${pre}grade`,
      title: '会员升级'
    }
  ])('/member/')

}
