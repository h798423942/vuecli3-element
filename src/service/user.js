import { postData, getData, putData, deleteData, allData } from '../utils/request'

export const loginService = (params,isLoading) => postData('/v1/idc/account/login', params,isLoading);   //登录
export const getVerCodeImgService = (params,isLoading) => getData('/v1/idc/captcha', params,isLoading);   //获取图形验证码信息
export const logoutService = (params,isLoading) => postData('/v1/idc/account/logout', params,isLoading);   //退出登录
export const registerService = (params,isLoading) => postData('/v1/idc/account/register', params,isLoading);   //注册
export const sendSmsCodeService = (params,isLoading) => postData('/v1/idc/account/sms', params,isLoading);   //发送短信验证码
