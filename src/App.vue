
<template>
  <div id="app">
    <router-view/>
    <footer-guide v-if="$route.meta.ok"/>
  </div>
</template>
<script>
  import FooterGuide from './components/FooterGuide/FooterGuide.vue'
  export default {
    mounted(){
    this.$store.dispatch('getAddress')
    this.$store.dispatch('getUser')

    },
    components:{
      FooterGuide,
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixins.styl"
  #app
    width 100%
    height 100%
    background #f5f5f5
    position relative
   // .content  //每个页面的内容

     // >div //决定哪个页面显示
      //  display none
    //    &.on
      //    display block
</style>

