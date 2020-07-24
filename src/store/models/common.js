import { loginService, logoutService } from "../../service/api";
import { Loading } from 'element-ui';

export default {
    state: {
        token: '',
        isMobile: false,
        loading: false,
        theme: '#dddddd',
        menu: {
            isToggled: true,
            munuList:
                [
                    {
                        id: 3,
                        name: '质量诊断',
                        icon: 'el-icon-bank-card',
                        url: 'dataList',
                        isChoose: false,
                        childs: []
                    },
                    {
                        id: 1,
                        name: '诊断管理',
                        icon: 'el-icon-first-aid-kit',
                        url: 'gfgdf',
                        isChoose: false,
                        childs: [{
                            cid: 0,
                            cname: '摄像头导入',
                            isChoose: false,
                            url: 'tableList',
                        },{
                            cid: 1,
                            url: 'camera',
                            isChoose: false,
                            cname: '摄像头列表'
                        },{
                            cid: 2,
                            url: 'ss',
                            isChoose: false,
                            cname: '摄像头分组'
                        },{
                            cid: 3,
                            url: 'ssdd',
                            isChoose: false,
                            cname: '诊断任务设置'
                        },{
                            cid: 4,
                            url: 'main.parameterSetting',
                            isChoose: false,
                            cname: '阀值参数设置'
                        }]
                    },
                    {
                        id: 2,
                        name: '系统管理',
                        icon: 'el-icon-set-up',
                        url: 'fd',
                        isChoose: false,
                        childs: [{
                            cid: 0,
                            cname: '用户权限',
                            isChoose: false,
                            url: 'main.accountManagement',
                        },{
                            cid: 1,
                            cname: '区域管理',
                            isChoose: false,
                            url: 'ggg',
                        },{
                            cid: 2,
                            url: 'rrr',
                            isChoose: false,
                            cname: '品牌管理'
                        }]
                    }]
        }
    },
    mutations: {
        setToken(state, datas){
            state.token = datas;
            if(datas){
                localStorage.setItem('token', datas)
            }else{
                localStorage.removeItem("token")
            }
        },
        SET_MENU_TOGGLED(state, datas){
            state.menu.isToggled = datas;
        },
        setBreadCrumb(state, datas){
            state.breadcrumb = datas;
        },
        setMenuList(state, datas){
            state.menu.menuList = datas;
        },
        SET_MOBILE(state, datas){
            state.isMobile = datas;
        },
        SET_THEME(state, datas){
            state.theme = datas;
        },
        SET_LOADING(state, datas){
            let options = {
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            };
            datas ? state.loading = Loading.service(options) : state.loading.close();
        },
    },
    actions: {
        setToken({ commit }, datas){
            commit('setToken', datas)
        },
        changeMenuToggled({ commit }, datas){
            commit('SET_MENU_TOGGLED', datas)
        },
        setBreadCrumb({ commit }, datas){
            commit('setBreadCrumb', datas)
        },
        setMenuList({ commit }, datas){
            commit('setMenuList', datas)
        },
        isMobile({ commit }, datas){
            commit('SET_MOBILE', datas.isMobile)   //是否为手机端
        },
        setLoading({ commit }, isLoading){
            commit('SET_LOADING', isLoading)
        },
        setTheme({ commit }, isLoading){
            commit('SET_THEME', isLoading)
        },
        login({ commit }){
            return new Promise((resolve, reject) =>{
                loginService('', true).then(res=>{
                    let token = res && res.data.rows ? res.data.rows.token : '';
                    commit('setToken', token)
                    resolve(res)
                }).catch(error=>{
                    reject(error)
                })
            })
        },
        logout({ commit }){
            return new Promise((resolve, reject) => {
                commit('setToken', '');
                resolve();
            })
        }
    }
}
