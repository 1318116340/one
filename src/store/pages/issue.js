import { omitBy, isUndefined } from 'lodash'
export default {
  state: {
    issue: {
      enterType: {} // 入口类型
    }
  },
  mutations: {
    changeIssueEnterType (state, enterType) {
      state.issue.enterType = enterType
    },
    handelIssueState (state, { enterType }) {
      const val = omitBy({ enterType }, isUndefined)
      state.issue = Object.assign(state.issue, null, val)
    }
  }
}
