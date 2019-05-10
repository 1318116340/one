import request from '@/plugin/axios'
/**
 * @description 获取用户信息
 * @param {Object} data 传递的数据
 */
export function GetMemberInfo (data) {
  return request({
    url: '/member/info',
    method: 'get',
    params: data
  })
}
/**
 * @description 获取用户信息
 * @param {Object} data 传递的数据
 */
export function HandleEditMemberInfo (data) {
  return request({
    url: '/member/edit-info',
    method: 'post',
    data
  })
}
