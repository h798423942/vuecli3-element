import { postData, getData, putData, deleteData, allData } from '../utils/request'

export const loginService = (params,isLoading) => postData('/app/login', params,isLoading);   //登录
export const logoutService = (params,isLoading) => postData('/app/logout', params,isLoading);   //退出登录
export const getVideoListService = (params,isLoading) => getData('/app/user/camera', params,isLoading);   //获取摄像头列表信息
export const getFaceImgListService = (params,isLoading) => getData('/app/ai/aipeople/photo', params,isLoading);   //获取人脸图片列表
// export const getAreaService = (params,isLoading) => getData('/api/v1/webservices/region-list', params,isLoading);
// export const getDataCenterService = (params,isLoading) => getData('/api/v1/webservices/region/area', params,isLoading);
// export const getComboService = (params,isLoading) => getData(`/api/v1/webservices/customer/combo/${params.id}`, '',isLoading);
// export const getAllDataService = (params,isLoading) => allData(params, isLoading);
