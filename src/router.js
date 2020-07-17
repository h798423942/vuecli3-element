import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress';
import BasicLayout from './layouts/BasicLayout.vue'
import UserLayout from './layouts/UserLayout.vue'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: BasicLayout,
        meta: {
            requireAuth:true,
            title: '首页'
        },
      redirect: {name: 'TableList'},   //默认页面
      children: [
          {
              path : '/dataList',
              component: () => import(/* webpackChunkName: "about" */ './views/DataList.vue'),
              name: 'DataList',
              meta: {
                  requireAuth:false,
                  title: '机柜产品'
              }
          },
          {
              path : '/tableList',
              // component: TableList,
              component: () => import(/* webpackChunkName: "about" */ './views/TableList.vue'),
              name: 'TableList',
              meta: {
                  requireAuth:true,
                  title: '带宽列表'
              }
          }]
    },
    {
      path: '/user',
      name: 'User',
      component: UserLayout,
      children: [
          {
              path : '/login',
              component: () => import(/* webpackChunkName: "about" */ './views/user/Login.vue'),
              name: 'Login',
              meta: {
                  requireAuth:false,
                  title: '登录'
              }
          },
          {
              path : '/register',
              component: () => import(/* webpackChunkName: "about" */ './views/user/Register.vue'),
              name: 'Register',
              meta: {
                  requireAuth:false,
                  title: '注册'
              }
          },
      ]
    }
  ]
});

NProgress.configure({
    easing: 'ease',  // 动画方式
    speed: 500,  // 递增进度条的速度
    showSpinner: false, // 是否显示加载ico
    trickleSpeed: 200, // 自动递增间隔
    minimum: 0.3 // 初始化时的最小百分比
});

router.beforeEach((to, from, next) => {
    NProgress.start();
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
});

router.afterEach(()=>{
    NProgress.done()
});

export default router;
