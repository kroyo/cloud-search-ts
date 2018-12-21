/**
 * @param 用户信息模块
 */
import { RootState, UserState } from '../types'
import { Module, GetterTree, ActionTree, MutationTree } from 'vuex'
import { apiUserInfo } from '@/api/api'


const state: UserState = {
  token: 'admin',
  userInfomation: '',
  btnPermissions: [],
  singleResoure: {}
}

const getters: GetterTree<UserState, RootState> = {
  getUserinfo: (state) => {
    let localdata = window.sessionStorage.getItem('userInfo');
    if(Object.keys(state.userInfomation).length == 0 && localdata) {
        state.userInfomation = JSON.parse(localdata);
    }
    return state.userInfomation;
  },
  getbtnPermissions: (state) => state.btnPermissions
}

const actions: ActionTree<UserState, RootState> = {
  _getUserinfo ({commit}) {
    return apiUserInfo().then(res => {
      commit('saveUserInfo',res);
      commit('saveBtnPermissions',res);
      return res;
    })
  },
}

const mutations: MutationTree<UserState> = {
  SET_TOKEN: (state, data) => {
    if (data) {
      state.token = data;
    }
  },
  saveUserInfo(state, res) {
    state.userInfomation = res.data ? res.data : res;
    let JSONdata = JSON.stringify(res.data ? res.data : res);
    window.sessionStorage.setItem('userInfo', JSONdata);
  },
  saveBtnPermissions(state, res) {
    state.btnPermissions = res.data.btnPermissions;
  },
  // 单表资源表信息保存
  saveSinleResoure(state, data) {
    state.singleResoure = data;
    let JSONdata = JSON.stringify(data);
    window.sessionStorage.setItem('singleResoure', JSONdata)
  }
}

const user: Module<UserState, RootState> = {
  state,
  getters,
  actions,
  mutations
}
export default user;