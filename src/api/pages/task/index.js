import request from '@/plugin/axios'
/**
 * @description 获取任务分类
 */
export function GetTaskCate (data) {
  return request({
    url: '/task/cate',
    method: 'get',
    params: data
  })
}
/**
 * @description 获取发布任务信息
 */
export function GetTaskInfo (data) {
  return request({
    url: '/task/get-publish-info',
    method: 'get',
    params: data
  })
}
/**
 * @description 提交任务
 */
export function HandleSubmitTask (data) {
  return request({
    url: '/task/multi-publish',
    method: 'post',
    data
  })
}

/**
 * @description 获取任务列表
 */
export function GetTaskList (data) {
  return request({
    url: '/order/index',
    method: 'get',
    params: data
  })
}
/**
 * @description 获取任务管理信息
 */
export function GetManageInfo (data) {
  return request({
    url: '/order/manage-info',
    method: 'get',
    params: data
  })
}
/**
 * @description 回收任务
 */
export function HandleRecoveryTask (data) {
  return request({
    url: '/order/recovery-task',
    method: 'post',
    data
  })
}
/**
 * @description 添加/更新备注
 */
export function HandleAddRemark (data) {
  return request({
    url: '/order/add-remark',
    method: 'post',
    data
  })
}
/**
 * @description 给买手评价
 */
export function HandleEvalute (data) {
  return request({
    url: '/order/to-buyer-evaluate',
    method: 'post',
    data
  })
}
/**
 * @description 追加任务回收时间
 */
export function HandleAddRecoveryTime (data) {
  return request({
    url: '/order/append-recovery-time',
    method: 'post',
    data
  })
}
/**
 * @description 追加服务佣金
 */
export function HandleAddSeviceFee (data) {
  return request({
    url: '/order/append-service-fee',
    method: 'post',
    data
  })
}
/**
 * @description 审核拒绝
 */
export function HandleRefuse (data) {
  return request({
    url: '/order/review-order-refuse',
    method: 'post',
    data
  })
}
/**
 * @description 商家确认用户提交金额
 */
export function HandleConfirmPrice (data) {
  return request({
    url: '/order/confirm-order-price',
    method: 'post',
    data
  })
}
/**
 * @description 提醒收货
 */
export function HandleRemindReceipt (data) {
  return request({
    url: '/order/remind-receipt',
    method: 'post',
    data
  })
}
/**
 * @description 任务截图
 */
export function GetTaskCutImages (params) {
  return request({
    url: '/order/task-cut-images',
    method: 'get',
    params
  })
}

/**
 * @description 发起投诉(投诉买手)
 */
export function HandleComplain (data) {
  return request({
    url: '/order/complain',
    method: 'post',
    data
  })
}
/**
 * @description 提交证据
 */
export function HandleComplainAppeal (data) {
  return request({
    url: '/order/complain-appeal',
    method: 'post',
    data
  })
}
/**
 * @description 客服介入
 * @param {Object} params 传递的数据
 */
export function HandleComplainService (data) {
  return request({
    url: '/order/complain-inter-service',
    method: 'post',
    data
  })
}
/**
 * @description 撤销投诉
 * @param {Object} params 传递的数据
 */
export function HandleCancelComplain (data) {
  return request({
    url: '/order/cancel-complain',
    method: 'post',
    data
  })
}
/**
 * @description 投诉详情
 */
export function GetComplainDetail (params) {
  return request({
    url: '/order/view-complain-detail',
    method: 'get',
    params
  })
}
/**
 * @description 商家确认完成
 */
export function HandleConfirmComplete (data) {
  return request({
    url: '/order/confirm-order-complete',
    method: 'post',
    data
  })
}
/**
 * @description 给买手评价
 */
export function HandleEvaluateBuyer (data) {
  return request({
    url: '/order/to-buyer-evaluate',
    method: 'post',
    data
  })
}

/**
 *@description 获取模版列表
 */
export function GetTaskTemplate (params) {
  return request({
    url: '/task-template/index',
    method: 'get',
    params
  })
}
/**
 *@description 删除模版
 */
export function HandleDelTaskTemplate (params) {
  return request({
    url: '/task-template/delete',
    method: 'get',
    params
  })
}
/**
 *@description 备注模版
 */
export function HandleRemarkTaskTemplate (params) {
  return request({
    url: '/task-template/remark',
    method: 'get',
    params
  })
}
