<template>
    <div class="header-box">
        <div class="menu-btn">
            <i class="el-icon-s-operation" @click="checkShowMenu"></i>
        </div>
        <div class="header-content">
            <div v-if="(!isShowMenu && isMobile) || !isMobile">
                <span class="name">admin</span>
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
    import {mapState,mapMutations,mapAction } from 'vuex'
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
            }
        }
    }
</script>
<style lang="less" scoped>
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
