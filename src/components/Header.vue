<template>
    <div class="header-box">
        <div class="menu-btn">
            <i class="el-icon-s-operation" @click="checkShowMenu"></i>
        </div>
        <div class="header-content">
            <div v-if="(!isShowMenu && isMobile) || !isMobile">
                <el-dropdown @command="checkTheme">
                    <span class="el-dropdown-link name" style="color:#fff;">主题</span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="theme1">主题一</el-dropdown-item>
                        <el-dropdown-item command="theme2">主题二</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>

                <el-dropdown @command="userOption">
                    <span class="el-dropdown-link name" style="color:#fff;">
                      admin
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="userInfo">用户信息</el-dropdown-item>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>

                <el-dropdown @command="checkLang">
                    <span class="el-dropdown-link" style="color:#fff;">
                    <!--<i class="el-icon-setting el-icon&#45;&#45;right"></i>-->
                      {{lanName}}
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="zhCN">中文</el-dropdown-item>
                        <el-dropdown-item command="en">English</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations, mapAction } from 'vuex'
    // import theme1 from '@/assets/skin/theme1.less'
    // import theme2 from '@/assets/skin/theme2.less'
    export default {
        data () {
            return {
                lanName: '中文',
            }
        },
        computed:{
            isShowMenu:{
                get:function(){
                    return this.$store.state.common.menu.isToggled;
                },
                set:function(newValue){
                    this.$store.state.common.menu.isToggled = newValue;
                }
            },
            ...mapState({
                isMobile: state => state.common.isMobile,
            })
        },
        created(){
            console.log(this.isShowMenu)
            console.log(this.isMobile)
        },
        methods: {
            checkShowMenu: function () {
                this.isShowMenu = !this.isShowMenu;
                this.$store.dispatch("changeMenuToggled", this.isShowMenu)
            },
            checkLang: function (type) {
                this.$i18n.locale = type;
                this.lanName = type === 'en' ? 'English' : '中文'
            },
            userOption: function (type) {
                type === 'userInfo' ? this.goUserInfoPage() : this.logout();
            },
            checkTheme: function(obj){
                this.removeCss()
                if(obj && obj==='theme1'){
                    this.addCss('theme1');
                }else{
                    this.addCss('theme2');
                }
            },
            addCss: function(name){
                let head = document.getElementsByTagName('head').item(0);
                const style = document.createElement('link');
                style.href=`/theme/${name}.css`;
                style.rel= 'stylesheet';
                style.type= 'text/css';
                head.appendChild(style);
            },
            removeCss: function(name){
                // var filename = `theme/${name}.css`;  //移除引入的文件名
                var filename = `theme`;  //移除引入的文件名
                var targetelement = "link";
                var targetattr = "href";
                var allsuspects = document.getElementsByTagName(targetelement)
                for (var i = allsuspects.length; i>=0 ; i--){
                    if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) != null && allsuspects[i].getAttribute(targetattr).indexOf(filename) != -1) {
                        allsuspects[i].parentNode.removeChild(allsuspects[i])
                    }
                }
            },
            goUserInfoPage: function () {
                console.log("go userinfo page")
            },
            logout: function () {
                this.$store.dispatch('logout').then(res=>{
                    this.$router.push({path: 'login'})
                }).catch(error=>{
                    this.$notify.error({
                        title: '退出登录',
                        message: '退出登录失败'
                    });
                })
            }
        }
    }
</script>
<style lang="less" scoped type="text/less">
    .header-box{
        display: flex;
        align-items: center;
        height: 100%;
        .menu-btn{
            i{
                font-size: 25px;
                cursor: pointer;
            }
        }
        .header-content{
            display: flex;
            justify-content: flex-end;
            align-items: center;
            width: 100%;
            height: 100%;
            .name{
                margin-right: 15px;
            }
            .el-icon-setting{
                font-size: 20px;
                color: #999;
            }
        }
    }
</style>
