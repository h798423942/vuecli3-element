import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from '@/store/index.js'
import vuescroll from 'vuescroll';
import 'vuescroll/dist/vuescroll.css';
import 'nprogress/nprogress.css';
import '@/assets/skin/index.css'
import VueI18n from 'vue-i18n'
import messages from '@/assets/locals/index'
import locale from 'element-ui/lib/locale'
import './registerServiceWorker'
import common from '@/assets/common'

Vue.prototype.common = common;
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(vuescroll);
Vue.use(VueI18n);
const i18n = new VueI18n({  //定义默认语言
    locale: 'zhCN',
    messages
});

// Vue.use(ElementUI, { //兼容element 多语言切换
//     i18n: (key, value) => i18n.t(key, value)
// })
locale.i18n((key, value) => i18n.t(key, value));

new Vue({
    router,
    store,
    i18n,
  render: h => h(App)
}).$mount('#app');
