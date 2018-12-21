<template>
  <div class="home">
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class'
import { apiGetCategory } from '../api/api'

@Component({
  components: {
  },
})
export default class Home extends Vue {
  @Action('_getUserinfo') _getUserinfo: any 

  created() {
  }
  mounted() {
    apiGetCategory().then(res => {
      console.log(res)
    })
    this._getUserinfo().then((res: any) => {
      console.log(res)
    });
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

