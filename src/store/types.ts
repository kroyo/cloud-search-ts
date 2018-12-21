/**
 * @description 
 *   vuex state type 定义
 */
interface RootState {
  [key: string]: any
}

interface UserState {
  token: string,
  userInfomation: any,
  btnPermissions: number[],
  singleResoure: any
}

interface NavState {
  navRouterList: any
}

export { RootState, UserState, NavState }