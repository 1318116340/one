import request from '@/plugin/axios'
/**
 * @description 获取掌柜列表
 * @param {Object} data 传递的数据
 */
export function GetShoperList (data) {
  return request({
    url: '/account/shoper-list',
    method: 'get',
    params: data
  })
}
/**
 * @description 获取掌柜列表
 * @param {Object} data 传递的数据
 */
export function AddShoper (data) {
  return request({
    url: '/account/add-shoper',
    method: 'post',
    data
  })
}
/**
 * @description 启用/禁用掌柜
 * @param {Object} data 传递的数据
 */
export function HandleShoperStatus (data) {
  return request({
    url: '/account/update-status',
    method: 'post',
    data
  })
}
