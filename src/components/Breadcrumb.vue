<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(items,index) in breadList" :key="items.path">
            <span>{{items.meta.title}}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
    export default {
        name: "breadcrumb",
        data(){
            return {
                breadList: []
            }
        },
        created(){
            this.getBreadList();
        },
        watch: {
            $route(){
                this.getBreadList();
            }
        },
        methods: {
            getBreadList: function () {
                let datas = this.$route.matched.filter(item => item.meta && item.meta.title);
                this.breadList = datas;
            }
        }
    }
</script>

<style scoped>

</style>