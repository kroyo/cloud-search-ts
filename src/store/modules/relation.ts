/**
 * @description 关系分析 与 亲近人分析 store
 * @param 
 */
import { RootState, RelationState } from '@/store/types'
import { Module, MutationTree } from 'vuex';

const state: RelationState =  {
  relationList: [] ,      // 关系列表
  chooseRelations: {},    // 选中的关系
  relationCate: [],       // 亲近人分析关系组合
  chooseRelationCates: {} // 选中的亲近人分析关系组合
}

const mutations: MutationTree<RelationState>  = {
  saveRelation(state,val) {
    state.relationList = val;
    window.sessionStorage.setItem('relationList',JSON.stringify(val));
  },
  saveChooseRelation(state,val) {
    state.chooseRelations = Object.assign({},val);
    window.sessionStorage.setItem('chooseRelations',JSON.stringify(val));
  },
  saveRelationCate(state, val) {
    state.relationCate = val;
    window.sessionStorage.setItem('relationCate',JSON.stringify(val));
  },
  saveChooseRelationCates(state,val) {
    state.chooseRelationCates = Object.assign({},val);
    window.sessionStorage.setItem('chooseRelationCates',JSON.stringify(val));
  }
}

const relation:Module<RelationState, RootState> = {
  state,
  mutations
}
export default relation