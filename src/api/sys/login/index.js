import request from '@/plugin/axios'
/**
 * @description 用户登录
 * @param {Object} data 登录需要的参数
 */
export function AccountLogin (data) {
  return request({
    url: '/site/login',
    method: 'post',
    data
  })
}
