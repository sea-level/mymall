import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)


const state={
  cartList:[]
}
// 创建vuex对象并挂载
export default new Vuex.Store({
  state,
  // mutation:修改state中的状态
  // mutation的每个方法功能尽量单一
  mutations,
  actions,
  getters,
  modules: {
  }
})
