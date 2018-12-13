import { userInfo,apiCollection,apiAdvModel,apiSingleModel } from '../api/api'
import Vue from 'vue';

const actions = {
  _getUserinfo ({commit}) {
    return userInfo().then(res => {
      commit('saveUserInfo',res);
      commit('savebtnPermissions',res);
      return res;
    });
  },
  getCollectedList({commit,state}) {
      apiCollection().then(res => {
        commit('saveCollectedList',res.data.list);
      })
  },
  getAdvModelList({commit,state}){
    return apiAdvModel().then(res => {
      state.adv.apiModelList = Object.assign({});
      res.data.forEach((elem) => {
        Vue.set(state.adv.apiModelList,elem.id,elem.kwIds)
      })
      return state.adv.apiModelList
    })
  },
  getSingleModelList({commit,state},param){
    return apiSingleModel(param).then(res => {
      state.adv.apiModelList = Object.assign({});
      res.data.forEach((elem) => {
        Vue.set(state.adv.apiModelList,elem.id,elem.kwIds)
      })
      return state.adv.apiModelList
    })
  }
}

export default actions;
