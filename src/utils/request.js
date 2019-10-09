import axios from 'axios';
// import qs from 'qs'
import { Notification } from 'element-ui';
import router from '@/router'
import store from '@/store/index.js'

axios.defaults.timeout = 5000;
if (process.env.NODE_ENV == 'development') {  //开发环境
    axios.defaults.baseURL ='/app';
    // axios.defaults.baseURL ='https://10.0.0.117';
}  else if (process.env.NODE_ENV == 'production') {  //生产环境
    axios.defaults.baseURL = window.location.port ? `${window.location.protocol}//${window.location.hostname}:
        ${window.location.port}` : `${window.location.protocol}//${window.location.hostname}`;
}

//http request 拦截器
axios.interceptors.request.use(
    config => {
        let token = localStorage.getItem('token');

        if(config.method === 'POST'){
            // config.data = qs.stringify(config.data);
            config.data = JSON.stringify(config.data);
        }
        config.headers = {
            'Content-Type':'application/json'
        };

        if(token){
            config.headers = {
                'Content-Type':'application/json;charset=UTF-8',
                'X-Xsrf-Token': token
            }
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


//http response 拦截器
axios.interceptors.response.use(
    response => {
        if(response.status === 200 && response.data.code !==-1){
            return Promise.resolve(response);
        }else{
            return Promise.reject(response);
        }
    },
    error => {
        if(error && error.response){
            switch (error.response.status){
                case 401:
                    // store.dispatch("setToken",'')
                    router.push({
                        path:"/login",
                        querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
                    });
                    break;
                case 404:
                    Notification({
                        title: '404页面',
                        message: '找不到该页面',
                        type: 'error'
                    });
                    break;
            }
        }

        return Promise.reject(error.response)
    }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function getData(url,params={},isLoading){
    // isLoading ? store.dispatch("setLoading",true) : '';
    return new Promise((resolve,reject) => {
        axios.get(url,{
            params:params
        }).then(response => {
                // isLoading ? store.dispatch("setLoading",false) : '';
                resolve(response);
            })
            .catch(err => {
                // isLoading ? store.dispatch("setLoading",false) : '';
                reject(err)
            })
    })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function postData(url,data = {},isLoading){
    isLoading ? store.dispatch("setLoading",true) : '';
    return new Promise((resolve,reject) => {
        axios.post(url,data)
            .then(response => {
                isLoading ? store.dispatch("setLoading",false) : '';
                resolve(response);
            }).catch(err => {
            isLoading ? store.dispatch("setLoading",false) : '';
            reject(err.data)
        })
    })
}

/**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function deleteData(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.delete(url,{
                params: data
            })
            .then(response => {
                resolve(response);
            }).catch(err => {
                reject(err.data)
        })
    })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function putData(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.put(url,data)
            .then(response => {
                resolve(response);
            }).catch(err => {
                reject(err.data)
        })
    })
}


/**
 * 封装all请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function allData(dataArray){
    return new Promise((resolve,reject) => {
        axios.all(dataArray)
            .then(axios.spread(function (res) {
                resolve(arguments)
                console.log(arguments)
            })).catch(err => {
                reject(err)
        })
    })
}
