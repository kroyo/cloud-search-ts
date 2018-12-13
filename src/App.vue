<template>
  <div id="app" :style="{ 'min-height': minHeight + 'px' }">
    <router-view/>
    <footer :class="footerClass">版权所有 &copy; 2018 广州金越软件技术有限公司</footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit, Watch } from 'vue-property-decorator'

@Component
export default class App extends Vue{
  minHeight = 'auto'
  options = []

  mounted() {
    let _url = window.location.href.replace(/\?token=\w{32}/, "");
    window.location.href = _url;
    // 获取浏览器可视区域高度
    let _this = this;
    this.minHeight =   `${document.documentElement.clientHeight}`          //document.body.clientWidth;
    window.onresize = function temp() {
      _this.minHeight = `${document.documentElement.clientHeight}`;
    };
  }

  get footerClass(): string {
    let className = '',
        router = this.$route;
    if(!router || !router.name){
      return className;
    }
    switch(true) {
      case router.name == 'home':
        className = 'homefooter'
        break;
      case router.matched[0].name == 'userManager':
        className = 'managefooter'
        break;
    }
    return className;
  }
}
</script>

<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50

#nav
  padding 30px
  a
    font-weight bold
    color #2c3e50
    &.router-link-exact-active
      color #42b983
</style>
