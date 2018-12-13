const user = {
  state: {
    token: 'admin',
    userInfomation: '',
    btnPermissions: [],
    singleResoure: {}
  },
  mutations: {
    saveUserInfo(state, res) {
      state.userInfomation = res.data ? res.data : res;
      let JSONdata = JSON.stringify(res.data ? res.data : res);
      window.sessionStorage.setItem('userInfo', JSONdata);
    },
    savebtnPermissions(state, res) {
      state.btnPermissions = res.data.btnPermissions;
      // let JSONdata = JSON.stringify(res.data.btnPermissions);
      // window.sessionStorage.setItem('btnPermission',JSONdata);
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
}

export default user
