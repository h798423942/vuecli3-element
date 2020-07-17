<template>
    <div class="main-content">
        <div class="user-content">
            <div class="user-box-desc">登录</div>
            <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="50px" class="demo-ruleForm">
                <el-form-item label="账号" prop="userName">
                    <el-input type="text" v-model="loginForm.userName" @keyup.enter.native="login" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="loginForm.pass" @keyup.enter.native="login" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="imgCode">
                    <el-row :gutter="20">
                        <el-col :span="14" class="verify-code">
                            <el-input
                                    type="text"
                                    v-model="loginForm.imgCode"
                                    @keyup.enter.native="login"
                                    placeholder="请输入验证码"
                            ></el-input>
                        </el-col>
                        <el-col :span="8" class="verify-img">
                            <img src="" alt="">
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="login-btn" @click="login('loginForm')">登录</el-button>
                </el-form-item>
            </el-form>
            <div class="user-botm-content">
                <div class="botm-item">
                    <router-link :to="{path: '/'}" style="text-decoration: none">
                        <el-link :underline="false">忘记密码</el-link>
                    </router-link>
                </div>
                <div class="botm-item">
                    <router-link :to="{path: '/register'}" style="text-decoration: none">
                        <el-link :underline="false">立即注册</el-link>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { loginService, getVerCodeImgService } from "@/service/user";
    export default {
        data() {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.loginForm.checkPass !== '') {
                        this.$refs.loginForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            const validateUserName = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('账号不能为空'));
                }else{
                    callback();
                }
            };

            const validateImgCode = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('验证码不能为空'));
                }else{
                    callback();
                }
            };

            return {
                loginForm: {
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
                    imgCode: [
                        { validator: validateImgCode, trigger: 'blur' }
                    ],
                }
            };
        },
        methods: {
            login(formName) {
                let that = this;
                that.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = {
                            _username: 'tony',
                            _passwd: '5f4dcc3b5aa765d61d8327deb882cf99'
                        };

                        loginService(params, true)
                            .then((response)=>{
                                let token = response && response.headers["x-xsrf-token"] ? response.headers["x-xsrf-token"] : '';
                                that.$store.dispatch('setToken',token);
                                that.$router.push({path: '/'});
                                console.log(token)
                            }).catch((response)=>{
                                that.$notify.error({
                                    title: '登录',
                                    message: '登录失败'
                                });
                        })
                    } else {
                        return false;
                    }
                });
            },
            getImgCode() {
                getVerCodeImgService()
                    .then((response)=>{

                        console.log(response)
                    }).catch((response)=>{
                        that.$notify.error({
                            title: '登录',
                            message: '登录失败'
                        });
                })
            }
        }

    }
</script>
<style lang="less" type="text/less" scoped>
    .main-content{
        background-color: #ddd;
        width: 100%;
        height: 100%;
        .user-content{
            position: absolute;
            top:0;
            left:0;
            bottom:0;
            right:0;
            width: 370px;
            height: 350px;
            margin:auto;
            background-color: #ffffff;
            padding: 10px 20px;
        }
        .user-box-desc{
            padding: 30px;
            text-align: center;
        }
        .login-btn{
            width: 100%;
        }
        .user-botm-content{
            display: flex;
            justify-content: space-between;
        }
    }
    @media screen and (max-width: 768px) {
        .main-content{
            .user-content {
                width: 80%;
            }
        }
    }
</style>
