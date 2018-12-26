import { RootState, searchState } from '../types';
import { Module, MutationTree } from 'vuex'

const state: searchState = {
  //需要session保存
  searchParam: {
    q: '',
    from: 0,
    size: 15,
    zys: ''
  },
  results: {},
  hasReason: '',
  yearPick: ''
}

const mutations: MutationTree<searchState> = {
  setSearchParam(state, { q = '', from = 0, size = 15, zys = '' } = {}): void {
    state.searchParam = { q, from, size, zys };
    let JSONdata = JSON.stringify(state.searchParam);
    window.sessionStorage.setItem('Param', JSONdata);
  },
  changeSearchtext(state, text): void {
    state.searchParam.q = text;
    let JSONdata = JSON.stringify(state.searchParam);
    window.sessionStorage.setItem('Param', JSONdata);
  },
  changeTab(state, from): void {
    state.searchParam.from = from;
    let JSONdata = JSON.stringify(state.searchParam);
    window.sessionStorage.setItem('Param', JSONdata);
  },
  changePages(state, val): void {
    state.searchParam.size = val;
    let JSONdata = JSON.stringify(state.searchParam);
    window.sessionStorage.setItem('Param', JSONdata);
  },
  saveResults(state, res): void {
    state.results = res;
    let JSONdata = JSON.stringify(state.results);
    window.sessionStorage.setItem('results', JSONdata);
  },
  setReason(state, val): void {
    state.hasReason = val;
  },
  saveYearPick(state, val): void {
    state.yearPick = val;
  }
}

const search: Module<searchState, RootState> = {
  state,
  mutations
}

export default search
