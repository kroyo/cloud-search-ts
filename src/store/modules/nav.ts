/**
 * @description nav模块
 *
 */
import { RootState, NavState } from '../types';
import { Module, GetterTree, ActionTree, MutationTree } from 'vuex'


const state: NavState = {
  navRouterList: [
    {
      label: '全文检索',
      url: { name: 'result'}
    },
    {
      label: '单表查询',
      url: { name: 'singleTable', params: { res: 'all' } }
    },
    {
      label: '关系分析',
      url: { name: 'relation' }
    },
    {
      label: '批量比对',
      url: { name: 'batchquery' }
    }
  ]
}

const nav: Module<NavState, RootState> = {
  namespaced: true,
  state
}
export default nav