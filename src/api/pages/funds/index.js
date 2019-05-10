import request from '@/plugin/axios'
/**
 * @description 充值
 * @param {Object} data 传递的数据
 */
export function HandleRecharge (data) {
  return request({
    url: '/recharge/recharge',
    method: 'post',
    data
  })
}
/**
 * @description 获取充值列表
 * @param {Object} data 传递的数据
 */
export function GetRechargeLog (data) {
  return request({
    url: '/recharge/recharge-log',
    method: 'get',
    params: data
  })
}
/**
 * @description 获取充值账户信息
 * @param {Object} data 传递的数据
 */
export function GetRechargeInfo (data) {
  return request({
    url: '/recharge/recharge-item',
    method: 'get',
    params: data
  })
}
/**
 * @description 提现
 * @param {Object} data 传递的数据
 */
export function HandleWithdraw (data) {
  return request({
    url: 'member/withdraw',
    method: 'post',
    data
  })
}
/**
 * @description 获取提现账户信息
 * @param {Object} data 传递的数据
 */
export function GetCashAccountInfo (data) {
  return request({
    url: 'member/cash-account-info',
    method: 'get',
    params: data
  })
}
/**
 * @description 绑定提现账户信息
 * @param {Object} data 传递的数据
 */
export function BindCashAccount (data) {
  return request({
    url: 'member/cash-account-bind',
    method: 'post',
    data
  })
}
/**
 * @description 获取省市联动
 * @param {Object} data 传递的数据
 */
export function GetAddress (data) {
  return request({
    url: 'site/address',
    method: 'get',
    params: data
  })
}
/**
 * @description 获取提现记录
 * @param {Object} data 传递的数据
 */
export function GetWithdrawLog (data) {
  return request({
    url: 'member/withdraw-log',
    method: 'get',
    params: data
  })
}

/**
 * @description 获取提现记录
 * @param {Object} data 传递的数据
 */
export function GetMoneyLog (data) {
  return request({
    url: 'member/money-log',
    method: 'get',
    params: data
  })
}
