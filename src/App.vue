<template>
  <div id="app" :class="theme">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<style lang="less" type="text/less">
html,body{
    margin: 0;
    padding: 0;
    height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  font-size: 14px;
  .el-container{
      height: 100%;
  }
}
</style>
<script>
    import { mapState } from "vuex"
    export default {
        data(){
            return {
              isMobile: false,
            }
        },
      computed:{
          ...mapState({
            theme: state => state.common.theme
          })
      },
        mounted(){
            let isMobile = this._isMobile() ? true : false;
            this.$store.dispatch('isMobile', {isMobile: isMobile});
            this.$store.dispatch('changeMenuToggled', isMobile ? false : true);
            window.onresize = () =>{
                let screenWidth =  this.$el.getClientRects()[0].width;
                screenWidth < 768 ? isMobile = true : isMobile = false;
                this.$store.dispatch('isMobile', {isMobile: isMobile})
                this.$store.dispatch('changeMenuToggled', isMobile ? false : true);
            };
            this.isMobile = isMobile;
        },
        methods:{
            _isMobile() {  //true 手机  false pc
                let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
                return flag;
            }
        }
    }
</script>
