<template>
    <div class="main-content">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="账号" prop="userName">
                <el-input type="text" v-model="ruleForm.userName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <!--<el-form-item label="确认密码" prop="checkPass">-->
                <!--<el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="年龄" prop="age">-->
                <!--<el-input v-model.number="ruleForm.age"></el-input>-->
            <!--</el-form-item>-->
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<style lang="less" scoped>
    .main-content{
        /*position: absolute;*/
        /*top: 50%;*/
        /*left: 50%;*/
        /*background-color: #abcdef;*/
        /*width:20%;*/
        /*height: 50%;*/
        /*transform: translateX(-50%) translateY(-50%);*/
        /*padding: 20px;*/
        position: absolute;
        top:0;
        left:0;
        bottom:0;
        right:0;
        width:50%;
        height:50%;
        margin:auto;
    }
    @media screen and (max-width: 768px) {
        .main-content {
            width:80%;
        }
    }
</style>
<script>
    export default {
        data() {
            var checkAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('年龄不能为空'));
                }
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入数字值'));
                    } else {
                        if (value < 18) {
                            callback(new Error('必须年满18岁'));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            let validateUserName = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('账号不能为空'));
                }
            };

            return {
                ruleForm: {
                    pass: '',
                    checkPass: '',
                    age: '',
                    userName: ''
                },
                rules: {
                    userName: [
                        { validator: validateUserName, trigger: 'blur' }
                    ],
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    age: [
                        { validator: checkAge, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }

    }
</script>