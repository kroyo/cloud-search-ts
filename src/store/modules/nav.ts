/**
 * @description nav模块
 *
 */
import { RootState, NavState } from '../types';
import { Module, MutationTree } from 'vuex'


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

const mutations: MutationTree<NavState> = {
  clearItemListBtn(state,tab): void {
    state.categoryList.forEach((elem: any) => {
      if(elem.name === tab && elem.messages){
        elem.messages.forEach((item: any) => {
          item.active = false;
        })
      }
    })
  },
  saveCategoryList(state,res): void {
    state.categoryList = res;
    let JSONdata = JSON.stringify(res);
    window.sessionStorage.setItem('homeInfo',JSONdata);
  },
  saveChoosed(state,val): void {
    if(val.length === 0){
      state.choosed.splice(0,state.choosed.length);
    }
    state.choosed = val;
    let JSONdata = JSON.stringify(state.choosed);
    window.sessionStorage.setItem('choosed',JSONdata);
  },
  saveBoxindex(state,res): void {
    state.boxIndex = res;
    let JSONdata = JSON.stringify(state.boxIndex);
    window.sessionStorage.setItem('boxIndex',JSONdata);
  },
  savetabName(state,val): void {
    state.tabName = val;
  },
  setAdvitemId(state): void {
    state.advitemId += 1;
  },
  setadvBoxshow(state,val): void {
    state.advBoxshow = !state.advBoxshow;
  },
  // 单表查询 保存与清空单表 
  saveSingleTab(state,val): void {
    state.singleTab = val;
    let JSONdata = JSON.stringify(state.singleTab);
    window.sessionStorage.setItem('singleTab',JSONdata);
  }
}

const namespaced: boolean = true

const nav: Module<NavState, RootState> = {
  state,
  mutations
}
export default nav