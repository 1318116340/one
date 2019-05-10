import request from '@/plugin/axios'
/**
 * @description 上传图片
 * @param {Object} data 传递的数据
 */
export function HandleUploadFile (data) {
  return request({
    url: '/file/images',
    method: 'post',
    data
  })
}
/**
 * @description 系统配置
 * @param {Object} data 传递的数据
 */
export function GetSetConfig (data) {
  return request({
    url: '/site/config',
    method: 'get',
    params: data
  })
}
