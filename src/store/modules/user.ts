import RootState from '../types'
import { Module, MutationTree } from 'vuex'

interface UserState {
  token: string,
  userInfomation: any,
  btnPermissions: number[],
  singleResoure: any
}

const state: UserState = {
  token: 'admin',
  userInfomation: '',
  btnPermissions: [],
  singleResoure: {}
}
const mutations: MutationTree<UserState> = {
  saveUserInfo(state, res) {
    state.userInfomation = res.data ? res.data : res;
    let JSONdata = JSON.stringify(res.data ? res.data : res);
    window.sessionStorage.setItem('userInfo', JSONdata);
  },
  savebtnPermissions(state, res) {
    state.btnPermissions = res.data.btnPermissions;
  },
  SET_TOKEN: (state, data) => {
    if (data) {
      state.token = data;
    }
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
  mutations
}
export default user;