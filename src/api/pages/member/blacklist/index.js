import request from '@/plugin/axios'
/**
 * @description 获取黑名单列表
 * @param {Object} data 传递的数据
 */
export function GetBlacklist (data) {
  return request({
    url: '/blacklist/index',
    method: 'get',
    params: data
  })
}
/**
 * @description 添加黑名单
 * @param {Object} data 传递的数据
 */
export function AddBlacklist (data) {
  return request({
    url: '/blacklist/create',
    method: 'post',
    data
  })
}
/**
 * @description 更新拉入黑名单的原因
 * @param {Object} data 传递的数据
 */
export function UpdateBlacklist (params, data) {
  return request({
    url: '/blacklist/update',
    method: 'post',
    params,
    data
  })
}
/**
 * @description 删除黑名单
 * @param {Object} data 传递的数据
 */
export function DelBlacklist (params) {
  return request({
    url: '/blacklist/delete',
    method: 'delete',
    params
  })
}
