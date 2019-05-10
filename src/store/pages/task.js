import { omitBy, isUndefined } from 'lodash'
export default {
  state: {
    task: {
      params: {},
      loading: false,
      refresh: false,
      checkAll: false,
      checkParams: {},
      actions: [],
      list: {} // 当前列表数据
    },
    taskManage: {
      params: {},
      loading: false,
      refresh: false,
      checkAll: false,
      checkParams: {},
      actions: [],
      list: {} // 当前列表数据
    }
  },
  mutations: {
    handelTaskState (state, { list, actions, checkParams, params, checkAll, loading }) {
      const val = omitBy({ list, actions, checkParams, params, checkAll, loading }, isUndefined)
      state.task = Object.assign(state.task, null, val)
    },
    handelTaskManageState (state, { list, actions, checkParams, params, checkAll, loading }) {
      const val = omitBy({ list, actions, checkParams, params, checkAll, loading }, isUndefined)
      state.taskManage = Object.assign(state.taskManage, null, val)
    }
  }
}
