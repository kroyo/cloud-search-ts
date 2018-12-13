const getters = {
  getItemList : (state) => {
    let localdata = window.sessionStorage.getItem('homeInfo');
    if(state.nav.itemLists.length == 0 && localdata) {
        state.nav.itemLists = JSON.parse(localdata);
    }
    return state.nav.itemLists;
  },
  getUserinfo : (state) => {
    let localdata = window.sessionStorage.getItem('userInfo');
    if(Object.keys(state.user.userInfomation).length == 0 && localdata) {
        state.user.userInfomation = JSON.parse(localdata);
    }
    return state.user.userInfomation;
  },
  getbtnPermissions : (state) => state.user.btnPermissions,
  getSearchParam : (state) => {
    let localdata = window.sessionStorage.getItem('Param');
    if(localdata){
      state.search.searchParam = JSON.parse(localdata);
    }
    return state.search.searchParam;
  },
  getChoose : (state) => {
    let localdata = window.sessionStorage.getItem('choosed');
    if(localdata){
      state.nav.choosed = JSON.parse(localdata);
    }
    return state.nav.choosed;
  },
  getBoxindex : (state) => {
    let localdata = window.sessionStorage.getItem('boxIndex');
    if(localdata){
      state.nav.boxIndex = JSON.parse(localdata);
    }
    return state.nav.boxIndex;
  },
  getResults : (state) => {
    let localdata = window.sessionStorage.getItem('results');
    if(localdata){
      state.search.results = JSON.parse(localdata);
    }
    return state.search.results
  },
  getSingleTab : (state) => {
    let localdata = window.sessionStorage.getItem('singleTab');
    if(localdata){
      state.nav.singleTab = JSON.parse(localdata);
    }
  },
  getSingleResoure: (state) => {
    let localdata = window.sessionStorage.getItem('singleResoure');
    if(localdata){
      state.user.singleResoure = JSON.parse(localdata);
    }
  },
  getRelationList: (state) => {
    let localdata = window.sessionStorage.getItem('relationList');
    if(localdata){
      state.relation.relationList = JSON.parse(localdata);
    }
    return state.relation.relationList;
  },
  getChooseRelation: (state) => {
    let localdata = window.sessionStorage.getItem('chooseRelations');
    if(localdata){
      state.relation.chooseRelations = JSON.parse(localdata);
    }
    return state.relation.chooseRelations;
  },
  getRelationCate: (state) => {
    let localdata = window.sessionStorage.getItem('relationCate');
    if(localdata){
      state.relation.relationCate = JSON.parse(localdata);
    }
    return state.relation.relationCate;
  },
  getChooseRelationCates: (state) => {
    let localdata = window.sessionStorage.getItem('chooseRelationCates');
    if(localdata){
      state.relation.chooseRelationCates = JSON.parse(localdata);
    }
    return state.relation.chooseRelationCates;
  },
  getSearchKeyWords: (state) => {
    let localdata = window.sessionStorage.getItem('searchKeyWords');
    if(localdata){
      state.adv.searchKeyWords = JSON.parse(localdata);
    }
    return state.relation.chooseRelationCates;
  },
  getAdvitemid : (state) => state.nav.advitemId,
  getTagItemList : (state) => state.adv.tagItemList,
  getModulesList : (state) => state.adv.modulesList,
};
export default getters;
