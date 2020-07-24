<template>
    <div class="header-box">
        <div class="menu-btn">
            <i class="el-icon-s-operation" @click="checkShowMenu"></i>
        </div>
        <div class="header-content">
            <div v-if="(!isShowMenu && isMobile) || !isMobile">
                <theme-picker></theme-picker>
                <el-dropdown @command="checkTheme">
                    <span class="el-dropdown-link name" style="color:#fff;">主题</span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="custom-theme1">主题一</el-dropdown-item>
                        <el-dropdown-item command="custom-theme2">主题二</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>

                <el-dropdown @command="userOption">
                    <svg-icon icon-class="user"></svg-icon>
                    <span class="el-dropdown-link name">admin</span>
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
    import ThemePicker from '@/components/ThemePicker'
    const version = require('element-ui/package.json').version // element-ui version from node_modules
    const ORIGINAL_THEME = '#dddddd' // default color
    export default {
        data () {
            return {
                lanName: '中文',
                chalk: '',
                theme: ''
            }
        },
        components: {
            ThemePicker
        },
        watch: {
            defaultTheme: {
                handler: function(val, oldVal) {
                    this.theme = val
                },
                immediate: true
            },
            async theme(val) {
                const oldVal = this.chalk ? this.theme : ORIGINAL_THEME
                if (typeof val !== 'string') return
                const themeCluster = this.getThemeCluster(val.replace('#', ''))
                const originalCluster = this.getThemeCluster(oldVal.replace('#', ''))
                console.log(themeCluster, originalCluster)
                const $message = this.$message({
                    message: '  Compiling the theme',
                    customClass: 'theme-message',
                    type: 'success',
                    duration: 0,
                    iconClass: 'el-icon-loading'
                })
                const getHandler = (variable, id) => {
                    return () => {
                        const originalCluster = this.getThemeCluster(ORIGINAL_THEME.replace('#', ''))
                        const newStyle = this.updateStyle(this[variable], originalCluster, themeCluster)
                        let styleTag = document.getElementById(id)
                        if (!styleTag) {
                            styleTag = document.createElement('style')
                            styleTag.setAttribute('id', id)
                            document.head.appendChild(styleTag)
                        }
                        styleTag.innerText = newStyle
                    }
                }
                if (!this.chalk) {
                    const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`
                    await this.getCSSString(url, 'chalk')
                }
                const chalkHandler = getHandler('chalk', 'chalk-style')
                chalkHandler()
                const styles = [].slice.call(document.querySelectorAll('style'))
                    .filter(style => {
                        const text = style.innerText
                        return new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text)
                    })
                styles.forEach(style => {
                    const { innerText } = style
                    if (typeof innerText !== 'string') return
                    style.innerText = this.updateStyle(innerText, originalCluster, themeCluster)
                })
                this.$emit('change', val)
                $message.close()
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
                defaultTheme: state => state.common.theme,
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
                // this.removeCss();
                if(obj==='custom-theme1'){
                    // this.addCss('theme1');
                    // import(/* webpackChunkName: "custom-theme1" */"@/assets/theme/theme1/index.css");
                    // this.theme = '#F70536'
                }else if(obj==='custom-theme2'){
                    // this.addCss('theme2');
                    // import(/* webpackChunkName: "custom-theme2" */"@/assets/theme/theme2/index.css");
                }
                this.$store.dispatch('setTheme', '#F70536');
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
            updateStyle(style, oldCluster, newCluster) {
                let newStyle = style
                oldCluster.forEach((color, index) => {
                    newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
                })
                return newStyle
            },
            getCSSString(url, variable) {
                return new Promise(resolve => {
                    const xhr = new XMLHttpRequest()
                    xhr.onreadystatechange = () => {
                        if (xhr.readyState === 4 && xhr.status === 200) {
                            this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '')
                            resolve()
                        }
                    }
                    xhr.open('GET', url)
                    xhr.send()
                })
            },
            getThemeCluster(theme) {
                const tintColor = (color, tint) => {
                    let red = parseInt(color.slice(0, 2), 16)
                    let green = parseInt(color.slice(2, 4), 16)
                    let blue = parseInt(color.slice(4, 6), 16)
                    if (tint === 0) { // when primary color is in its rgb space
                        return [red, green, blue].join(',')
                    } else {
                        red += Math.round(tint * (255 - red))
                        green += Math.round(tint * (255 - green))
                        blue += Math.round(tint * (255 - blue))
                        red = red.toString(16)
                        green = green.toString(16)
                        blue = blue.toString(16)
                        return `#${red}${green}${blue}`
                    }
                }
                const shadeColor = (color, shade) => {
                    let red = parseInt(color.slice(0, 2), 16)
                    let green = parseInt(color.slice(2, 4), 16)
                    let blue = parseInt(color.slice(4, 6), 16)
                    red = Math.round((1 - shade) * red)
                    green = Math.round((1 - shade) * green)
                    blue = Math.round((1 - shade) * blue)
                    red = red.toString(16)
                    green = green.toString(16)
                    blue = blue.toString(16)
                    return `#${red}${green}${blue}`
                }
                const clusters = [theme]
                for (let i = 0; i <= 9; i++) {
                    clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
                }
                clusters.push(shadeColor(theme, 0.1))
                return clusters
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
<style lang="scss" scoped type="text/scss">
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
                color: $--color-primary;
            }
            .el-icon-setting{
                font-size: 20px;
                color: #999;
            }
        }
    }
</style>
