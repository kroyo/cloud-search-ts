/**
 * @description 搜索tab切换模块 store
 * @param 
 */
import { RootState, tabState } from '@/store/types'
import { MutationTree, GetterTree, Module } from 'vuex';

const state: tabState = {
  tabOptions: [],
  activeTabs: '',
}

const mutations: MutationTree<tabState> = {
  ADD_TABS: (state, data) => {
    let noRepeat = state.tabOptions.every(function (elem) {
      return elem.name !== data.name
    });
    if (noRepeat) {
      state.tabOptions.push(data);
      let JSONdata = JSON.stringify(state.tabOptions);
      window.sessionStorage.setItem('tabList', JSONdata);
    }
  },
  DELETE_TABS: (state, data) => {
    state.tabOptions.forEach(function (elem, index) {
      if (elem.name === data) {
        state.tabOptions.splice(index, 1);
        let JSONdata = JSON.stringify(state.tabOptions);
        window.sessionStorage.setItem('tabList', JSONdata);
      }
    })
  },
  SET_ACTIVE_INDEX(state, val) {
    state.activeTabs = val;
    let JSONdata = JSON.stringify(state.activeTabs);
    window.sessionStorage.setItem('activeTab', JSONdata);
  }
}

const getters: GetterTree<tabState, RootState> = {
  tabOptions: state => {
    let localdata = window.sessionStorage.getItem('tabList');
    if (localdata) {
      state.tabOptions = JSON.parse(localdata);
    }
    return state.tabOptions;
  },
  activeTabs: state => {
    let localdata = window.sessionStorage.getItem('activeTab');
    if (localdata) {
      state.activeTabs = JSON.parse(localdata);
    }
    return state.activeTabs;
  },
}

const tab: Module<tabState, RootState> = {
  state,
  mutations,
  getters
}
export default tab
