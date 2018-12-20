<template>
  <div id="app" :style="{ 'min-height': minHeight + 'px' }">
    <commonNav></commonNav>
    <router-view/>
    <footer :class="footerClass">版权所有 &copy; 2018 广州金越软件技术有限公司</footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit, Watch } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import commonNav from './components/common-nav.vue'

@Component({
  components: {
    commonNav
  }
})
export default class App extends Vue{
  minHeight = 'auto'
  
  @State('user') userState!: any
  @Action('_getUserinfo') _getUserinfo: any 

  mounted() {
    this._getUserinfo();
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
@import './assets/style/reset.styl';
html, body 
  background-color #fff

#app
  position relative
  width 100%
  height auto 
  min-height 100%
  min-width 1240px 
  padding-bottom 30px 

footer
  position absolute 
  bottom 0 
  width 100% 
  height 30px
  line-height 30px
  color #000
  font-size 14px
  text-align center 
  background-color #fff  

.homefooter 
  color #fff
  padding-top 130px
  background url("./assets/img/home/footer-bg.png") center center no-repeat
  
.managefooter 
  padding-left 160px  
</style>
