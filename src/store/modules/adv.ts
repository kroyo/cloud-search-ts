/**
 * @description 分类导航
 */
import Vue from 'vue'
import { Module, MutationTree } from 'vuex'
import { RootState, advState } from '@/store/types'

const state: advState = {
  tagchooseList: {},
  advResultView: '',
  tagItemList: [],
  modelsList: [],
  apiModelList: {},
  searchKeyWords: {}
}

const mutations: MutationTree<advState> = {
  saveTagList(state, item): void {
    state.tagchooseList = Object.assign({}, state.tagchooseList, item);
  },
  deleteTagitem(state, tag): void {
    Vue.delete(state.tagchooseList, tag);
  },
  clearTagList(state): void {
    state.tagchooseList = Object.assign({});
  },
  saveResultsView(state, val): void {
    state.advResultView = val;
  },
  saveTagItemList(state, list): void {
    state.tagItemList = list;
  },
  savemodelsList(state, item): void {
    state.modelsList.push(item);
  },
  clearModelsList(state): void {
    state.modelsList.splice(0, state.modelsList.length);
  },
  models2chooseList(state, list): void {
    state.tagchooseList = Object.assign({}, list);
  },
  saveSearchKeyWords(state, val): void {
    state.searchKeyWords = val;
    let JSONdata = JSON.stringify(val);
    window.sessionStorage.setItem('searchKeyWords', JSONdata);
  }
}

const adv: Module<advState, RootState> = {
  state,
  mutations
}
export default adv
