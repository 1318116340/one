import request from '@/plugin/axios'
/**
 * @description 用户注册
 * @param {Object} data 传递参数
 */
export function AccountRegister (data) {
  return request({
    url: '/site/register',
    method: 'post',
    data
  })
}
/**
 * @description 发送短信
 * @param data 传递参数
 */
export function SendSms (data) {
  return request({
    url: '/site/send-sms',
    method: 'post',
    data
  })
}
