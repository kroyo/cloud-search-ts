<template>
  <header :class="headerClass" v-if='$route.path !== "/404" && $route.name !== "login"'>
    <div class="navlist">
      <router-link :to="{ name: 'home'}">
        <div class="homeicon navli" title="首页"><i class="home-icon"></i>智能云搜</div>
      </router-link>
      <router-link v-for="(item,index) in navRouterList" :to="item.url" :key="index">
        <div :class="['navli', $route.name == item.url.name ? 'active' : '']" :title="item.label">{{ item.label }}</div>
      </router-link>
    </div>
    <div class="header-right clearfix">
      <div class="logoutBtn" @click='logout()' title="退出"></div>
      <div class="menage" @click='menagement()' v-if='"management" in permission'>后台管理系统</div>
      <p class="users">
        <el-dropdown @command="menuClick">
          <el-button type="text">
            {{ this.userInfomation.name }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(item,index) in options"
              :key="index"
              :command="item">
              <router-link :to="{ name: item.name }">{{ item.label }}</router-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        ，欢迎登录金越智能云搜！
      </p>
    </div>
  </header>
</template>

<script lang="ts">
import { Vue, Component, Watch, Emit } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { delCookie } from '../util/tools'
import { routes } from '@/router/router'
import { NavState, UserState } from '../store/types'
import { apiLogout } from '../api/api'

@Component
export default class Nav extends Vue{
  @State('nav') navState!: NavState
  @State('user') userState!: UserState

  options = []
  headerClass = {
    clearfix: true,
    header: false
  } 
  
  created() {
    this.getManagerUrl();
  }

  // nav 导航栏导航
  get navRouterList() {
    return this.navState.navRouterList
  }
  get userInfomation() {
    return this.userState.userInfomation
  }
  // 获取按钮权限
  get permission(): any {
    let permission = {};
    this.userState.btnPermissions.forEach((elem: any) => {
      this.$set(permission, elem.code, elem);
    });
    return permission
  }

  @Watch('$route')
  routeChange(newVal: any) {
    let off = false;
    this.options.forEach((elem: any) => {
      if (newVal.name == elem.name) {
        off = true;
        return;
      }
    });
    this.headerClass.header = off;
  }

  getManagerUrl(): void {
    let data: any = (this.options = []);
    routes.forEach((elem: any) => {
      if (elem.name == "userManager") {
        let item = elem.children;
        item.forEach((elem: any) => {
          let obj = {
            label: elem.label, 
            name: elem.name
          }
          data.push(obj);
        });
      }
    });
  }
  menuClick(item: any): void {
    let _name = item.name;
    let _label = item.label;
    // this.ADD_TABS({ label: _label, name: _name });
    // this.SET_ACTIVE_INDEX(_name);
  }
  logout(): void {
    delCookie('token');
    apiLogout();
  }
  showAdv(): void {
    this.$store.commit("setadvBoxshow");
  }
  menagement(): void {
    window.open(this.permission.management.url);
  }  
}
</script>

<style lang="stylus" scoped>
.header 
  position fixed
  top 0
  z-index 9

header 
  width 100%
  height 50px
  line-height 50px
  background-color #003792
  .navlist 
    display inline-block
    height 100%
    a 
      display inline-block
  .navli 
    width 100%
    color #ffffff
    font-size 15px
    margin 0 14px
    transition .4s all
    &:hover, &.active 
      color #ffe400
  .homeicon
    display inline-block
    line-height 40px
    font-size 20px
    font-weight bold
    letter-spacing 4px
    margin-left 20px
    margin-right 30px
    .home-icon
      display inline-block
      width 40px
      height 40px
      margin-right 10px
      background url('../assets/img/navicon.png') 0px 2px no-repeat
      background-size contain
      vertical-align middle

.header-right
  float right
  height 100%      
  .logoutBtn
    float right
    width 40px
    height 100%
    background #052952 url('../assets/img/icon-exit.png') center center no-repeat
    cursor pointer
  .menage 
    color #fff
    float right
    font-size 14px
    height 37px
    line-height 37px
    padding 0 12px
    margin-right 8px
    background-color #052952
    cursor pointer
  .users
    float right
    color #fff
    padding-left 26px
    font-size 15px
    margin-right 10px
    background url('../assets/img/icon-user.png') left center no-repeat   
  .el-button--text
    color #fff  
</style>


