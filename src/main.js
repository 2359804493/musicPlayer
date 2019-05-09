// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
// import 'assets/js/hack'
import Vue from 'vue'
import store from './store'
import router from './router'
import App from './App'
import fastclick from 'fastclick'
import mmToast from 'base/mm-toast'
import VueLazyload from 'vue-lazyload'
import {VERSION} from './config'

import '@/assets/css/index.less'

//优化移动端300ms点击延迟
fastclick.attach(document.body);

//弹出层
Vue.use(mmToast);

//懒加载
Vue.use(VueLazyload, {
    preLoad: 1,
    loading: require('assets/img/default.png')
});

const redirectList = ['/music/details', '/music/comment'];
router.beforeEach((to, from, next) => {
    window._hmt && to.path && window._hmt.push(['_trackPageview', '/#' + to.fullPath]);
    if (redirectList.includes(to.path)) {
        next()
    } else {
        document.title = to.meta.title && `${to.meta.title} - 音你而来音乐播放器` || '音你而来音乐播放器';
        next()
    }
});

const debug = process.env.NODE_ENV !== 'production';
Vue.config.silent = debug;
Vue.config.debug = debug;
Vue.config.devtools = debug;
Vue.config.productionTip = debug;

/* eslint-disable no-new */
new Vue({
    el: '#mmPlayer',
    store,
    router,
    render: h => h(App)
})