import request from '@/plugin/axios'
/**
 * @description 忘记密码
 * @param {Object} data 传递参数
 */
export function AccountForget (data) {
  return request({
    url: '/site/modify-password',
    method: 'post',
    data
  })
}
