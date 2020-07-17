<template>
    <div class="main-content">
        <div class="user-content">
            <div class="user-box-desc">注册</div>
            <el-form :model="registerInfo" status-icon :rules="rules" ref="registerInfo">
                <el-form-item prop="userName">
                    <el-input type="text" v-model="registerInfo.userName" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="email">
                    <el-input type="text" v-model="registerInfo.email" placeholder="邮箱"></el-input>
                </el-form-item>

                <el-form-item prop="areaCode" style="text-align: left">
                    <el-select v-model="registerInfo.countryCode" style="width: 100%" filterable placeholder="请选择">
                        <el-option
                                v-for="item in areaCodeList"
                                :key="item.name"
                                :label="item.name"
                                :value="item.code+''"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-row type="flex">
                    <el-form-item
                            prop="code"
                            class="verification-code-box"
                    >
                    <span>{{registerInfo.countryCode}}</span>
                    </el-form-item>
                    <el-form-item prop="phone" style="width: 70%;">
                        <el-input
                                type="text"
                                v-model="registerInfo.phone"
                                placeholder="手机号"
                        ></el-input>
                    </el-form-item>
                </el-row>
                <el-form-item prop="smsCode">
                    <el-row :gutter="20">
                        <el-col :span="14" class="verify-code">
                            <el-input
                                    type="text"
                                    v-model="registerInfo.smsCode"
                                    @keyup.enter.native="register"
                                    placeholder="请输入验证码"
                            ></el-input>
                        </el-col>
                        <el-col :span="8" class="verify-img">
                            <el-button :loading="sendCodeLoading" @click="sendSmsCode">{{smsCodeVal}}</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                            type="password"
                            v-model="registerInfo.password"
                            maxlength="18"
                            placeholder="密码必须包含英文与数字，长度6-18个字符"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="confirmPassword">
                    <el-input
                            type="password"
                            v-model="registerInfo.confirmPassword"
                            maxlength="18"
                            placeholder="确认密码"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :loading="btnLoading" class="register-btn" @click="register">注册</el-button>
                </el-form-item>
            </el-form>
            <div class="user-botm-content">
                <div class="botm-item">
                    <router-link :to="{path: '/login'}" style="text-decoration: none">
                        <el-link :underline="false">返回登录</el-link>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { commonUtils } from '@/utils/common'
    import md5 from 'md5'
    import { registerService, sendSmsCodeService } from '@/service/user'
    export default {
        name: "Register",
        data() {
            const validateUserName = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输入用户名"));
                } else {
                    callback();
                }
            };
            const validateEmail = (rule, value, callback) => {
                if (!commonUtils.isEmail(value)) {
                    callback(new Error("请输入正确的邮箱地址"));
                } else {
                    callback();
                }
            };
            const validatePhone = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输入手机号"));
                } else {
                    callback();
                }
            };
            const validateCode = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输入验证码"));
                } else {
                    callback();
                }
            };
            const validatePassword = (rule, value, callback) => {
                if (!commonUtils.validatePassword(value)) {
                    callback(new Error("密码格式不正确"));
                } else {
                    callback();
                }
            };
            const validateConfirmPassword = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输入确认密码"));
                } else if (value !== this.registerInfo.password) {
                    callback(new Error("两次输入的密码不一致"));
                } else {
                    callback();
                }
            };
            return {
                areaCodeList: this.$store.state.areaCodeList.areaCodeList,
                registerInfo: {
                    userName: "",
                    email: "",
                    phone: "",
                    password: "",
                    confirmPassword: "",
                    countryCode: "+86",
                    captcha: "",
                    // verifyImg: "", // 验证码图片
                    // verifyKey: "", // 验证码key
                    smsCode: ""
                },
                rules: {
                    userName: [{ validator: validateUserName, trigger: "blur" }],
                    email: [{ validator: validateEmail, trigger: "blur" }],
                    phone: [{ validator: validatePhone, trigger: "blur" }],
                    smsCode: [{ validator: validateCode, trigger: "blur" }],
                    password: [{ validator: validatePassword, trigger: "blur" }],
                    confirmPassword: [
                        { validator: validateConfirmPassword, trigger: "blur" }
                    ]
                },
                smsCodeVal: '发送验证码',
                isSendCode: false,
                sendCodeLoading: false,
                btnLoading: false,
                smsCodeTimer: '',
            };
        },
        methods:{
            register() {
                this.$refs["registerInfo"].validate(passValidate => {
                    if (passValidate) {
                        const params = {
                            user_name: this.registerInfo.userName,
                            phone: this.registerInfo.phone,
                            email: this.registerInfo.email,
                            password: md5(this.registerInfo.password),
                            country_code: this.registerInfo.countryCode,
                            sms_verify_code: this.registerInfo.smsCode,
                        };
                        this.btnLoading = true;
                        registerService(params)
                        .then((res)=>{
                            this.btnLoading = false;
                            this.$notify.success({title: '成功',message: '注册成功'});
                        }).catch((err)=>{
                            this.btnLoading = false;
                            this.$notify.error({title: '失败',message: '注册失败'});
                        });
                    }
                });
            },
            sendSmsCode() {   //发送验证码
                this.$refs["registerInfo"].validateField('phone',obj => {
                   if(!obj && !this.isSendCode){
                       let params = {
                           code: 'UserRegister',
                           phone: this.registerInfo.phone,
                       };

                       let smsCodeTime = 10;
                       this.isSendCode = true;  //防止重复发送
                       this.sendCodeLoading = true; //发送验证码按钮Loading标志
                       sendSmsCodeService(params)
                       .then((res)=>{
                           this.$notify({title: '成功',message: '验证码发送成功',type: 'success'});
                           this.smsCodeVal = `${smsCodeTime}S后重新发送`;
                           this.sendCodeLoading = false;
                           this.smsCodeTimer = setInterval(()=>{
                               smsCodeTime-=1;
                               this.smsCodeVal = `${smsCodeTime}S后重新发送`;
                               if(smsCodeTime<=0){
                                   this.isSendCode = false;
                                   clearInterval(this.smsCodeTimer);
                                   this.smsCodeVal = `发送验证码`;
                               }
                           },1000,60);
                           this.$once('hook:beforeDestroy', () => {   //在页面销毁是清除定时器
                               clearInterval(this.smsCodeTimer);
                           });
                       }).catch((err)=>{
                           this.isSendCode = false;
                           this.sendCodeLoading = false;
                           this.$notify.error({title: '失败',message: '验证码发送失败'});
                       })
                   }
                });
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
            height: 605px;
            margin:auto;
            background-color: #ffffff;
            padding: 10px 20px;
        }
        .user-box-desc{
            padding: 30px;
            text-align: center;
        }
        .verification-code-box{
            width: 25%;
            height: 40px;
            margin-right: 5%;
            text-align:center;
            border:1px solid #DCDFE6;
            border-radius:4px;
            box-sizing: border-box;
        }
        .register-btn{
            width: 100%;
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
