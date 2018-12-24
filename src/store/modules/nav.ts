/**
 * @description nav模块
 *
 */
import { RootState, NavState } from '../types';
import { Module, GetterTree, ActionTree, MutationTree } from 'vuex'


const state: NavState = {
  categoryList: [],
  choosed: [], //需要session保存
  boxIndex: 0, //需要session保存
  advitemId: 2,
  advBoxshow: false,
  tabName: '', //selectSearch
  singleTab: {},
  navRouterList: [
    {
      label: '全文检索',
      url: { name: 'result' }
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

const mutations:MutationTree<RootState> = {
  clearItemListBtn(state,tab){
    state.itemLists.forEach((elem: any) => {
      if(elem.name === tab && elem.messages){
        elem.messages.forEach((item: any) => {
          item.active = false;
        })
      }
    })
  },
  saveItemList(state,res) {
    state.itemLists = res;
    let JSONdata = JSON.stringify(res);
    window.sessionStorage.setItem('homeInfo',JSONdata);
  },
  saveChoosed(state,val) {
    if(val.length === 0){
      state.choosed.splice(0,state.choosed.length);
    }
    state.choosed = val;
    let JSONdata = JSON.stringify(state.choosed);
    window.sessionStorage.setItem('choosed',JSONdata);
  },
  saveBoxindex(state,res) {
    state.boxIndex = res;
    let JSONdata = JSON.stringify(state.boxIndex);
    window.sessionStorage.setItem('boxIndex',JSONdata);
  },
  savetabName(state,val) {
    state.tabName = val;
  },
  setAdvitemId(state) {
    state.advitemId += 1;
  },
  setadvBoxshow(state,val) {
    state.advBoxshow = !state.advBoxshow;
  },
  // 单表查询 保存与清空单表 
  saveSingleTab(state,val){
    state.singleTab = val;
    let JSONdata = JSON.stringify(state.singleTab);
    window.sessionStorage.setItem('singleTab',JSONdata);
  }
}

const nav: Module<NavState, RootState> = {
  namespaced: true,
  state,
  mutations
}
export default nav