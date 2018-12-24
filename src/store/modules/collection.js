import Vue from 'vue'
import Bus from '../../util/bus.js'
import { apiCollected } from '../../api/api'
const collection = {
  state : {
    collectedList : {},
    collected: {}
  },
  mutations : {
    saveCollectedList (state,data){
      data.forEach((elem,index) => {
        // state.collectedList.push(elem.userId);
        Vue.set(state.collectedList,elem.code,elem.name);
      })
      state.collected = data;
    },
    removeCollectedItem(state,id){
      // let index = state.collectedList.indexOf(id);
      // state.collectedList.splice(index,1);
      let params = '';
      params = { 'code': id } ;
      Vue.delete(state.collectedList,id);
      apiCollected(params).then((res) => {
        if(res.status == 200){
          Bus.$message.success('收藏取消成功!'); 
        }
      });
    },
    setCollectedItem(state,item){
      let _name;
      for(let key in item.source){
        if(item.source[key].split(': ')[0] === '姓名'){
          _name = item.source[key].split(': ')[1].replace(/<em>/,'').replace(/<\/em>/,'');
        }
      }
      Vue.set(state.collectedList,item.id,_name);
      let params = { 'code':item.id, 'type':item.type, 'name':_name };
      apiCollected(params).then((res) => {
        if(res.status == 200){
          Bus.$message.success('收藏成功!');
        }
      });
    },
  }
}
export default collection
