import { RootState, searchState } from '../types';
import { Module, GetterTree, ActionTree, MutationTree } from 'vuex'

const state: searchState = {
  //需要session保存
  searchParam : {
    q : '',
    from : 0,
    size : 15,
    zys : ''
  },
  results : {},
  hasReason : '',
  yearPick : ''
}

const mutations: MutationTree<searchState> = {
  setSearchParam (state, {q = '', from = 0 ,size = 15, zys = ''} = {}) {
    state.searchParam = {q,from,size,zys};
    let JSONdata = JSON.stringify(state.searchParam);
    window.sessionStorage.setItem('Param',JSONdata);
  },
  changeSearchtext (state,text){
    state.searchParam.q = text;
    let JSONdata = JSON.stringify(state.searchParam);
    window.sessionStorage.setItem('Param',JSONdata);
  },
  changeTab (state,from){
    state.searchParam.from = from;
    let JSONdata = JSON.stringify(state.searchParam);
    window.sessionStorage.setItem('Param',JSONdata);
  },
  changePages(state,val){
    state.searchParam.size = val;
    let JSONdata = JSON.stringify(state.searchParam);
    window.sessionStorage.setItem('Param',JSONdata);
  },
  saveResults (state,res) {
    state.results = res;
    let JSONdata = JSON.stringify(state.results);
    window.sessionStorage.setItem('results',JSONdata);
  },
  setReason(state,val){
    state.hasReason = val;
  },
  saveYearPick(state,val) {
    state.yearPick = val;
  }
}

const search: Module<searchState, RootState> = {
  namespaced: true,
  state,
  mutations
}

export default search
