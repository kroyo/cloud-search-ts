<template>
  <div class="home">
    <searchBox 
      :categoryList='categoryList'
      :advPromission='permission'
      @tab-change='getboxindex'>
    </searchBox>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import { UserState } from '../store/types'
import { apiGetCategory } from '../api/api'
import searchBox from '../components/searchBox.vue'

@Component({
  components: {
    searchBox
  },
})
export default class Home extends Vue {
  @State('user') userState!: UserState
  @Action('_getUserinfo') _getUserinfo: any 

  categoryList: Array<any> = []
  boxIndex: number = 0
  choosed: Array<any> = []

  // 获取按钮权限
  get permission(): any {
    let permission: any = {};
    this.userState.btnPermissions.forEach((elem: any) => {
      if (!permission[elem.code]) {
        permission[elem.code] = [];
      }
      permission[elem.code].push(elem);
    });
    return permission
  }

  created() {
  }
  mounted() {
    apiGetCategory().then(res => {
      this.getCategoryList(res);
    })
    this._getUserinfo().then((res: any) => {
      this.getCategoryResource(res.data);
      this.getCategoryKeyWords(res.data);
    });
  }

  //把boxindex传到result页面
  getboxindex(val: number): void {
    this.boxIndex = val;
  }
  getCategoryList(res: any): void {
    let _this = this,
        data = res.data ? res.data : '';
    if(!data){
      return;
    }
    res.data.forEach(function(elem: any) {
      interface itemType {
        [propName: string]: any
      }
      let _item: itemType = {
        label: elem.name,
        name: elem.code,
        indices: elem.indices ? elem.indices : []
      };
      _this.categoryList.push(_item);
    });
    console.log(_this.categoryList)
    //解决高级搜索第一次获取tab值的bug
    // this.$store.commit("savetabName", this.itemList[0].name);
  }
  //获取分类资源
  getCategoryResource(data: any) {
    let mes = data.resources;
    for (let [index, item] of this.categoryList.entries()) {
      for (let value of mes) {
        if (item.name == value.code) {
          this.$set(this.categoryList[index], "messages", []);
          for (let resource of value.resources) {
            this.categoryList[index].messages.push({
              mes: resource.name,
              active: false,
              name: resource.code
            });
          }
        }
      }
    }
    //将分类的资源集中到all分类下
    this.setAlltab();
    this.$store.commit("saveItemList", this.categoryList);
  }
  // 获取分类相应的搜索参数
  getCategoryKeyWords(data: any) {
    let _resources = data.resources,
        endData: any = {}
    _resources.forEach((elem: any) => {
      endData[elem.code] = {};
      for (let value2 of elem.resources) {
        for (let keywords of value2.keywords) {
          let itemkey = keywords.name,
              itemval = keywords.selType;
          endData[elem.code][itemkey] = itemval;  
        }
      }
    });
    endData['all'] = {};
    for (let key in endData) {
      if(key != 'all') {
        endData['all'] = Object.assign(endData['all'], endData[key]);
      }
    }
    console.log(endData)
    // this.saveSearchKeyWords(endData);
  }
  //将分类的资源集中到all分类下
  setAlltab() {
    //判断是否有all，没有则直接退出
    let hasAll = this.categoryList.some(elem => {
      return elem.name === "all";
    });
    if (!hasAll) return;

    //设置all的tab
    let _mesList: Array<string> = [],
      _index!: number;
    this.categoryList.forEach(function(elem, index) {
      if (elem.name !== "all" && elem.hasOwnProperty("messages")) {
        elem.messages.forEach(function(elem: any) {
          _mesList.push(elem);
        });
      } else if (elem.name == "all") {
        _index = index;
      }
    });
    this.categoryList[_index].messages = _mesList;
  }
}
</script>

<style lang="stylus" scoped>
.home
  position absolute
  top 50px
  bottom 0
  width 100%
  background url('../assets/img/home-bg.jpg')
  background-size 100%
</style>

