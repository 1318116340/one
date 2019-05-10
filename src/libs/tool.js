// import { Base64 } from 'js-base64'
/**
 * @description 公共工具/函数
 */
let tool = {}

/**
 * @description Base64编码加解密
 * @param {String Object} data 需要编码/解码的数据
 * @param {Boolean} encode true:编码 false:解码
 */
/*
tool.base64 = function (data, encode, obj = 'arr') {
  const isObject = typeof data === 'object'
  if (encode) {
    return Base64.encodeURI(isObject ? JSON.stringify(data) : data)
  } else {
    const val = Base64.decode(data)
    return obj === 'arr' ? JSON.parse(val) : val
  }
}
*/
/**
 * @description 生成搜索参数
 */
tool.creatSearchParams = function (params) {
  for (let key in params) {
    if (params[key] === '') {
      params[key] = null
    }
  }
  return params
}
/**
 * @description 格式化日期
 * @param {Date} date 日期
 * @param {String} fmt 格式 deault: 'yyyy-MM-dd hh:mm:ss'
 */
tool.formatDate = (date, fmt = 'yyyy-MM-dd hh:mm:ss') => {
  if (!date) return '-'
  function padLeftZero (str) {
    return (`00${str}`).substr(str.length)
  }
  if (typeof (date) === 'number') date = new Date(date)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }

  // 遍历这个对象
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      )
    }
  }
  return fmt
}
/**
 * @description 用$notify提示进度
 * @param {String} status 状态 loading:加载中 success:加载成功 error:加载失败
 * @param {String} action 操作
 * @param {String} name 名称
 *
 */
tool.notify = ({ status, action, name = '', vm }) => {
  switch (status) {
    case 'loading':
      vm.loadView = true
      vm.load_notify = vm.$notify({
        title: '正在' + action + name,
        iconClass: 'el-icon-loading',
        position: 'top-right'
      })
      break
    case 'success':

      setTimeout(() => {
        if (vm.load_notify) vm.load_notify.close()
        vm.$notify({
          title: action + '成功',
          type: 'success',
          position: 'top-right',
          duration: 2000
        })
      }, 300)
      break
    default:
      setTimeout(() => {
        vm.loadView = false
        if (vm.load_notify) vm.load_notify.close()
        vm.$notify({
          title: action + '失败',
          type: 'error',
          position: 'top-right',
          duration: 2000
        })
      }, 300)
      break
  }
}
/**
 * @description 计算屏幕大小并返回对应表格大小
 * @returns {String Null} 表格大小
 */
tool.calcTableSize = (width) => {
  const clientWidth = document.documentElement.clientWidth
  if (clientWidth < (width || 1600)) {
    return 'mini'
  } else {
    return null
  }
}
export default tool
