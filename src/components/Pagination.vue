<template>
    <div class="block">
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[20, 50, 80, 100]"
                :page-size="20"
                layout="total, sizes, prev, pager, next, jumper"
                style="margin-top: 25px"
                :total="total">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "pagination",
        props:{
            currentPage:{
                type: Number,
                default: 1
            },
            total: {
                type: Number
            }

        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        },
        data() {
            return {
                // currentPage: 1
            };
        }
    }
</script>

<style scoped>

</style>