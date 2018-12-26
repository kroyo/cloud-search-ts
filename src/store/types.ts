/**
 * @description 
 *   vuex state type 定义
 */
export interface RootState {
  [key: string]: any
}
// 用户模块State type
export interface UserState {
  token: string,
  userInfomation: any,
  btnPermissions: number[],
  singleResoure: any
}
// nav state type
export interface NavState {
  categoryList: Array<any>,
  choosed: Array<any>,
  boxIndex: number,
  advitemId: number,
  advBoxshow: boolean,
  tabName: string,
  singleTab: any,
  navRouterList: any
}

export interface searchState {
  searchParam: any,
  results: object,
  hasReason: string,
  yearPick: string
}
// 搜索tab切换模块 state type
export interface tabState {
  tabOptions: Array<any>,
  activeTabs: string
}
// 关系分析与亲近人分析 state types
export interface RelationState {
  relationList: Array<any>,
  chooseRelations: object,
  relationCate: Array<any>,
  chooseRelationCates: object
}

// 分类导航 state types
export interface advState {
  tagchooseList: any,
  advResultView: string,
  tagItemList: Array<any>,
  modelsList: Array<any>,
  apiModelList: any,
  searchKeyWords: any
}

// 管理模块 state types
export interface managerState {
  historyParams: any
}