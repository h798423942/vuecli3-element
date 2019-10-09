import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
// import DataList from './views/dataList'
// import TableList from './views/tableList'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
        meta: {
            requireAuth:true,
            title: '首页'
        },
      redirect: {name: 'tableList'},   //默认页面
      children: [
          {
              path : '/dataList',
              // component: DataList,
              component: () => import(/* webpackChunkName: "about" */ './views/dataList.vue'),
              name: 'dataList',
              meta: {
                  requireAuth:true,
                  title: 'dataList'
              }
          },
          {
              path : '/tableList',
              // component: TableList,
              component: () => import(/* webpackChunkName: "about" */ './views/tableList.vue'),
              name: 'tableList',
              meta: {
                  requireAuth:true,
                  title: 'tableList'
              }
          }]
    },
    {
      path: '/login',
      name: 'login',
      // component: Home,
        component: () => import(/* webpackChunkName: "about" */ './views/user/login.vue'),
      meta: {
          requireAuth:false,
          title: '登录'
      },
      children: []
    }
  ]
});

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
        if(localStorage.getItem('token')){ //判断本地是否存在token
            next();
        }else {
            next({
                path:'/login'
            })
        }
    }
    else {
        next();
    }
    /*如果本地 存在 token 则 不允许直接跳转到 登录页面*/
    if(to.fullPath == "/login"){
        if(localStorage.getItem('token')){
            next({
                path:from.fullPath
            });
        }else {
            next();
        }
    }
});

export default router;
