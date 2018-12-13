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
import { Vue } from 'vue-property-decorator'

export default class Nav extends Vue{
  headerClass = {
    clearfix: true,
    header: false
  }
  
}
</script>

<style lang="stylus">

</style>


