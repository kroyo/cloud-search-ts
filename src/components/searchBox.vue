<template lang="html">
  <div class="searchTop">
    <ul class="clearfix">
      <li v-for='(names,index) in categoryList'
        :class="{'active' : index == boxIndex}"
        @click='tabChange(index,names.name)'>
        {{names.label}}
      </li>
    </ul>
    <el-button
      v-if='"citizen" in advPromission && $route.path === "/"'
      type="success"
      size='small'
      @click='toqgrkUrl()'
      style='position:absolute;margin-left:-94px;padding:0 15px;height:40px;font-size:14px;'>
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
      <el-button type="primary"
        :disabled='advBoxshow'
        @click='search()'
        slot="reference"
        v-if='$route.name !== "singleTable"'
        class='searchbtn'>
      </el-button>
    </el-popover>
    <el-button
      type="primary"
      size='small'
      v-if='advPromission && "super" in advPromission && $route.name !== "singleTable"'
      style='position:absolute;margin-left:6px;height:40px;font-size:13px'
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
import { Vue, Component, Prop } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { NavState, searchState } from '../store/types'

@Component
export default class searchBox extends Vue {
  @State('nav') navState!: NavState
  @State('search') searchState!: searchState

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
  inputTipList: Array<any> = []
  
  get boxIndex(): number {
    return this.navState.boxIndex
  }
  get choosed(): any {
    return this.navState.choosed
  }
  get advBoxshow(): boolean {
    return this.navState.advBoxshow
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
ul
  text-align center
  li
    float left
    min-width 55px
    height 27px
    line-height 27px
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
</style>

