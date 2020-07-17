<template>
    <div class="main-content">
        <Breadcrumb></Breadcrumb>

        <div style="margin-top: 50px;text-align: left">
            <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
            <el-button @click="toggleSelection()">取消选择{{imgUrl}}</el-button>
            <!--<img :src="imgUrl ? require('../assets/'+imgUrl+'.png') : ''" alt="">-->
        </div>

        <el-table
                ref="multipleTable"
                :data="tableData"
                v-loading="loading"
                tooltip-effect="dark"
                style="width: 100%;margin: 30px 0"
                @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    :label="$t('message.date') "
                    width="120">
                <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column
                    prop="name"
                    :label="$t('message.name') "
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="address"
                    :label="$t('message.address') "
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button type="text" size="small">{{ $t("message.hello") }}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <Pagination :total="total" :current-page="currentPage"></Pagination>

        <el-dialog title="收货地址"
                   :visible.sync="isShowModal"
                   :width="isMobile ? '90%' : '800px'">
            <el-form :model="form" style="text-align: left">
                <el-form-item label="活动名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isShowModal = false">取 消</el-button>
                <el-button type="primary" @click="isShowModal = false">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import Pagination from "@/components/Pagination"
    import Breadcrumb from "@/components/Breadcrumb"
    import { getVideoListService } from "../service/api";
    // import Modals from "@/components/Modals"
    import {mapState,mapMutations,mapAction } from 'vuex'
    export default {
        data() {
            return {
                imgUrl: '',
                tableData: [
                    {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-08',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-06',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }],
                total: 100,
                currentPage: 1,
                isShowModal: false,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px',
                dialogTableVisible: false,
                dialogFormVisible: false,
                multipleSelection: [],
                loading: true
            }
        },
        computed:{
            ...mapState({
                isMobile: state => state.common.isMobile,
            })
        },
        mounted(){
            this.getAllData();

            console.log(this.$store.state.common.isMobile)
            // this.common.test2();
        },
        components: {
            Pagination,
            Breadcrumb,
            // Modals
        },
        methods: {
            getAllData: function () {
                let that = this;
                getVideoListService('', false).then((res)=>{
                    that.loading = false;
                    console.log(res)
                }).catch((error)=>{
                    that.loading = false;
                    that.$notify.error({
                        title: '失败',
                        message: '获取数据失败'
                    });
                })
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleClick: function (row) {
                console.log(row)
                this.isShowModal = !this.isShowModal;
            }
        }
    }
</script>