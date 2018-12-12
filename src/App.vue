<template>
  <div id="app">
    <router-view/>
    <footer :class="footerClass">版权所有 &copy; 2018 广州金越软件技术有限公司</footer>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default class App extends Vue{
  
}
</script>


<style lang="stylus">

</style>

