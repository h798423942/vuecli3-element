<template>
    <!--nav-->
    <vue-scroll :ops="scrollOps">
        <div>
            <div class="logo">
                logo
            </div>
            <el-menu
                    :default-active="$route.name"
                    class="el-menu-content"
                    :collapse="!isShowMenu"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color = "#234d6d"
                    :unique-opened = "true"
                    text-color="#ffffff"
                    active-text-color="#ffd04b">
                    <template v-for="(item, index) in menuList">
                        <el-submenu :index="item.url"  v-if="item.childs && item.childs[0]">
                            <template slot="title">
                                <i :class="item.icon"></i>
                                <span>{{item.name}}</span>
                            </template>
                            <el-menu-item v-for="(childsItems, cidx) in item.childs" :key="cidx" :index="childsItems.url"
                                          @click="goPage(childsItems.url)">
                                {{childsItems.cname}}
                            </el-menu-item>
                        </el-submenu>

                        <el-menu-item :index="item.url" v-if="!item.childs[0]"  @click="goPage(item.url)">
                            <i :class="item.icon"></i>
                            <span slot="title">{{item.name}}</span>
                        </el-menu-item>
                    </template>

            </el-menu>
        </div>
    </vue-scroll>
    <!--nav end-->
</template>

<script>
    export default {
        data () {
            return {
                scrollOps: {
                    bar:{
                        background: '#919191',
                        size: '2px'
                    }
                },
                isOnlyMune: true,
                menuList: this.$store.state.common.menu.munuList
            }
        },
        computed: {
            isShowMenu: function () {
                return this.$store.state.common.menu.isToggled
            }
        },
        mounted(){
            console.log(this.menuList)
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            goPage: function (name) {
                if(name && this.$route.name && name !== this.$route.name){
                    this.$router.push({path: name})
                }
            },
        }
    }
</script>

<style lang="less">
    .logo{
        height: 60px;
        line-height: 60px;
        text-align: center;
    }
    .el-menu-content:not(.el-menu--collapse) {
        width: 250px;
    }
</style>
