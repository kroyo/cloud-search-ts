/**
 * @description 用户中心管理模块
 */
import { RootState, managerState } from '../types'
import { Module, MutationTree, GetterTree } from 'vuex'

const state: managerState = {
  historyParams: {}
}

const mutations: MutationTree<managerState> = {
  // 保存当前搜索参数
  SET_HISTORYPARSMS: (state,data) => {
    state.historyParams = data;
  }
}

const getters: GetterTree<managerState, RootState> = {
  historyParams: (state) => state.historyParams
}

const manager: Module<managerState, RootState> = {
  state,
  getters,
  mutations
}
export default manager
  