import Vue from 'vue'
import Vuex from 'vuex'

import d2admin from './modules/d2admin'
import task from './pages/task'
import funds from './pages/funds'
import issue from './pages/issue'
import { merge } from 'lodash'
Vue.use(Vuex)
export default new Vuex.Store(Object.assign({
  modules: {
    d2admin
  } }, null, merge(task, funds, issue)))
