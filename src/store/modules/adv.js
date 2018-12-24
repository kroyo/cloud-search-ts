import Vue from 'vue'
const adv = {
  state : {
    tagchooseList : {},
    advResultView : '',
    tagItemList :[],
    modelsList : [],
    apiModelList : {},
    searchKeyWords: {}
  },
  mutations : {
    saveTagList(state,item){
      state.tagchooseList = Object.assign({},state.tagchooseList,item);
    },
    deleteTagitem(state,tag){
      Vue.delete(state.tagchooseList,tag);
    },
    clearTagList(state){
      state.tagchooseList = Object.assign({});
    },
    saveResultsView(state,val){
      state.advResultView = val;
    },
    saveTagItemList(state,list){
      state.tagItemList = list;
    },
    savemodelsList(state,item){
      state.modelsList.push(item);
    },
    clearModelsList(state){
      state.modelsList.splice(0, state.modelsList.length);
    },
    models2chooseList(state,list){
      state.tagchooseList = Object.assign({},list);
    },
    saveSearchKeyWords(state, val) {
      state.searchKeyWords = val;
      let JSONdata = JSON.stringify(val);
      window.sessionStorage.setItem('searchKeyWords',JSONdata);
    }
  }
}

export default adv
