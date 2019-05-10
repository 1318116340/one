export default {
  path: '/funds',
  title: '资金管理',
  children: (pre => [
    {
      path: `${pre}charge`,
      title: '资金充值'
    },
    {
      path: `${pre}cash`,
      title: '资金提现'
    },
    {
      path: `${pre}record`,
      title: '资金流水'
    }
  ])('/funds/')

}
