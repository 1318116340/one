import { omitBy, isUndefined } from 'lodash'
export default {
  state: {
    fundsCash: {
      params: {},
      loading: false
    },
    fundsRecordCharge: {
      params: {},
      loading: false
    }
  },
  mutations: {
    handelFundsCashState (state, { params, loading }) {
      const val = omitBy({ params, loading }, isUndefined)
      state.fundsCash = Object.assign(state.fundsCash, null, val)
    },
    handelFundsRecordChargeState (state, { params, loading }) {
      const val = omitBy({ params, loading }, isUndefined)
      state.fundsRecordCharge = Object.assign(state.fundsRecordCharge, null, val)
    }
  }
}
