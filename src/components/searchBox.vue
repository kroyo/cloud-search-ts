<template lang="html">
  <div class="searchTop">
    <ul class="category-list clearfix">
      <li v-for='(names,index) in categoryList'
        :class="{'active' : index == boxIndex}"
        @click='tabChange(index,names.name)'>
        {{names.label}}
      </li>
    </ul>
    <el-button
      class="citizenbtn"
      v-if='"citizen" in advPromission && $route.path === "/"'
      type="success"
      size='small'
      @click='toqgrkUrl()'>
      全国人口
    </el-button>
    <el-input type="text"
      placeholder="与:(&/空格) 或:(|) 任意单个字符:(?) 任意多个字符:(*) 精确查询:(属性:参数。如:[姓名:张三])"
      v-model='searchText'
      clearable
      class='mainInput'
      v-if='$route.name !== "singleTable"'
      :disabled="advBoxshow"
      @keyup.native="inputKeyUp($event)"
      @blur="tipOff = false">
    </el-input>
    <el-popover
      placement="top"
      width="160"
      ref='s_popover'
      :disabled='choosed.length !== 0'
      :content="PopoverContent">
      <el-button 
        type="primary"
        class='searchbtn'
        :disabled='advBoxshow'
        @click='search()'
        slot="reference"
        v-if='$route.name !== "singleTable"'>
      </el-button>
    </el-popover>
    <el-button
      class="superbtn"
      type="primary"
      size='small'
      v-if='advPromission && "super" in advPromission && $route.name !== "singleTable"'
      @click='showAdv()'>
      高级搜索
    </el-button>
    <!-- 搜索提示 start -->
    <ul class="inputtip-list" v-if="inputTipList.length > 0 && tipOff">
      <li class="inputtip" 
        :class="{ 'hover': item.hover }"
        v-for="(item, key) in inputTipList"
        :key="key"
        @click="tipInput(item.val)"
        @mousedown="stopBulr">
        {{ item.val }}
      </li>
    </ul>
    <!-- 搜索提示 end -->
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'
import { NavState, searchState, advState } from '../store/types'

@Component
export default class searchBox extends Vue {
  @State('nav') navState!: NavState
  @State('adv') advState!: advState
  @State('search') searchState!: searchState
  @Mutation('saveBoxindex') saveBoxindex: any
  @Mutation('savetabName') savetabName: any
  @Mutation('changeSearchtext') changeSearchtext: any
  @Mutation('changeTab') changeTab: any
  @Mutation('setadvBoxshow') setadvBoxshow: any
  @Mutation('setSearchParam') setSearchParam: any
  @Mutation('clearItemListBtn') clearItemListBtn: any
  @Mutation('saveChoosed') saveChoosed: any

  @Prop({ 
    default: [
      { label: "人员" },
      { label: "物品" },
      { label: "案件" },
      { label: "地址" },
      { label: "组织" }
    ] 
  }) categoryList: any
  @Prop() advPromission: any

  searchText: string =  ""
  keyCode: string = ""
  tipOff: boolean = false
  oldSearch: string = ''
  inputTipList: any = []
  
  get boxIndex(): number {
    return this.navState.boxIndex
  }
  get choosed(): any {
    return this.navState.choosed
  }
  get tabName(): string {
    return this.navState.tabName
  }
  get advBoxshow(): boolean {
    return this.navState.advBoxshow
  }
  get searchParam(): any {
    return this.searchState.searchParam
  }
  get searchKeyWords(): any {
    return this.advState.searchKeyWords
  }
  // popover弹框文字
  get PopoverContent(): string {
    let resText = this.choosed.length === 0 ? "请选择资源，" : "";
    let popoverText = `${resText}`;
    popoverText = popoverText.replace(/，$/, "");
    return popoverText;
  }

  created() {
    
  }
  mounted() {
    //回显页面
    this.searchText = this.searchState.searchParam.q;
  }

  //监听tabname的变化，切换分类标签时清空资源选择、年份选择
  @Watch('tabName', { immediate: true })
  watchTabName(val: any, oldval: any) {
    this.clearItemListBtn(oldval);
    if (oldval && oldval !== "") {
      this.saveChoosed([]);
      this.setSearchParam({ zys: "" });
    }
  }
  @Watch('searchText', { deep: true })
  watchSearchText(val: string, oldval:string) {
    this.oldSearch = oldval;
    this.getTipList(val.replace(oldval, ''));
  }

  // 全国人口页面跳转
  toqgrkUrl(): void {
    window.open(this.advPromission.citizen[0].url);
  }
  //切换分类标签时保存boxindex和tabname
  tabChange(index: number, name: string): void {
    this.saveBoxindex(index);
    this.savetabName(name);
    this.$emit("tab-change", this.boxIndex);
  }
  //搜索，触发'do-search',结果页面监听该自定义事件
  search() {
    let $s_popover: any = this.$refs.s_popover;
    if (this.choosed.length !== 0) {
      this.changeSearchtext(this.searchText)
      this.changeTab(0);
      if(this.$route.name != 'result') {
        this.$router.push({ name: "result" });
      }
      this.$emit("do-search", this.searchParam);
      this.$emit("close-main");
      //hack bug，直接修改popover refs，有一个点击后需要再点击才转换状态的bug
      $s_popover.$refs.popper.hidden = true;
    } else {
      $s_popover.$refs.popper.hidden = false;
    }
  }
  //展示高级功能面板，同时清除input输入框的内容
  showAdv() {
    this.setadvBoxshow();
    this.changeSearchtext('');
  }
  // 搜索提示数据
  getTipList(val: string) {
    console.log(this.advState);
    this.tipOff = true;
    this.inputTipList = [];
    let _resList = this.searchKeyWords[this.tabName],
        exp = new RegExp(val);
    let i = 0;    
    for(let k in _resList) {
      i++;
      if(exp.test(k)) {
        let item = {
          val: k,
          hover: i <= 1 ? true : false
        };
        this.inputTipList.push(item);
      }
    }
  }
  tipInput(val: string) {
    let oldText = '';
    if(this.searchText){
      oldText = this.oldSearch;
    }
    this.searchText = oldText + val + '：';
    this.tipOff = false;
  }
  stopBulr(event: any) {
    event.preventDefault();
  }
  inputKeyUp(event: any) {
    let key = event.key,
        dataList = this.inputTipList;
    if(dataList.length <= 0) {
      if(key == 'Enter') {
        this.search();
      }
      return false;
    }  
    dataList.some((elem: any, index: number) => {
      if(elem.hover) {
        switch(true) {
          case key == 'Enter':
            this.tipInput(elem.val);
            break;
          case key == 'ArrowUp':
            dataList[index]['hover'] = false;
            dataList[(index-1) < 0 ? dataList.length - 1 : index -1 ]['hover'] = true;
            break;
          case key == 'ArrowDown':
            dataList[index]['hover'] = false;
            dataList[(index+1) >= dataList.length  ? 0 : index+1]['hover'] = true;
            break;
          default:
            break;
        } 
        return true;
      }
    });
    this.inputTipList = [];
    this.inputTipList.push.apply(this.inputTipList, dataList);
  }
}
</script>

<style lang="stylus" scoped>
//三角形
triangle($width, $color)
  width 0px
  height 0px
  border-top $width solid $color
  border-left $width solid transparent
  border-right $width solid transparent
  border-bottom $width solid transparent

.searchTop
  position relative
  width 746px
  margin 0 auto
  padding-top 100px

.category-list
  text-align center
  li
    float left
    min-width 60px
    height 26px
    line-height 26px
    color #fff
    padding 0 4px
    margin-right 30px
    margin-bottom 10px
    cursor pointer
    &.active
      background-color #2b94ff
      &::after
        display block
        content ''
        triangle(6px, #2b94ff)
        margin-left 50%
        transform translateX(-50%)
.citizenbtn
  position absolute
  padding 0 15px
  height 40px
  transform translateX(-110%)
.superbtn
  position absolute
  right 0
  bottom 0
  height 40px
  transform translateX(110%)
.searchbtn
  width 60px
  height 40px
  background-image url('../assets/img/search.png')
  background-position center -2px
  margin-left 2px
  vertical-align top

.mainInput
  width 684px
  vertical-align middle
</style>

