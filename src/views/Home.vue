<template>
  <el-container>
    <el-aside class="aside" style="width: auto">
      <Menu></Menu>
    </el-aside>
    <el-container>
      <el-header style="background-color: #234d6d;color: #ffffff">
        <Header/>
      </el-header>
      <el-main>
        <transition>
          <router-view></router-view>
        </transition>
      </el-main>
      <!--<el-footer>Footer</el-footer>-->
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src
import { loginService } from "@/service/api";
import Menu from '@/components/Menu'
import Header from '@/components/Header'

export default {
  name: 'home',
  components: {
      Menu,
      Header
  },
  mounted(){
      // this.login();
  },
  methods: {
      login: function () {
          let params = {
              _username: 'tony',
              _passwd: '5f4dcc3b5aa765d61d8327deb882cf99'
          };

          loginService(params)
              .then((response)=>{
                  let token = response && response.headers["x-xsrf-token"] ? response.headers["x-xsrf-token"] : '';
                  this.$store.dispatch('setToken',token)
                  console.log(token)
              }).catch((response)=>{
                console.log("登录失败")
          })
      }

  }
}
</script>
<style lang="less">
  .aside{
    width: auto;
    background-color: #666666;
  }
</style>
