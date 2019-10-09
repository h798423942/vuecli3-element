import { postData, getData, putData, deleteData, allData } from '../utils/request'

export const loginService = (params,isLoading) => postData('/login', params,isLoading);   //登录
export const getAreaService = (params,isLoading) => getData('/api/v1/webservices/region-list', params,isLoading);
export const getDataCenterService = (params,isLoading) => getData('/api/v1/webservices/region/area', params,isLoading);
export const getComboService = (params,isLoading) => getData(`/api/v1/webservices/customer/combo/${params.id}`, '',isLoading);
export const getAllDataService = (params,isLoading) => allData(params, isLoading);
