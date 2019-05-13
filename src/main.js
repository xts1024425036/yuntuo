// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

import fastclick from 'fastclick';
import 'babel-polyfill'; //解决浏览器不支持promise导致白屏问题
import store from './store'; //vuex存储文件
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';

Vue.use(MintUI);

//import $ from 'jquery'

import 'css/index.styl';

Vue.config.productionTip = false;

//将fastclick绑定在页面的body上
fastclick.attach(document.body);

import {wxCheckMobileBind} from '@/api/login';

//路由钩子
router.beforeEach((to, from, next) => {
    if (!store.state.inited) {
        store.commit('initStore');
    }
    
    let token = store.state.token;
    if (!token) {
        if (to.name !== "Login") {
            next({name: 'Login', query: {redirect: to.fullPath}});
            return;
        }
    }

    //修改title
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>',
    beforeCreate() {
        let _to = router.currentRoute;
        //检查是否绑定了手机
        if (store.state.token && _to.name !== "BindMobile") {
            wxCheckMobileBind().then(data => {
                if (!data.isBind) {
                    router.push({name: 'BindMobile', query: {redirect: _to.fullPath, needBind: true}});
                }
            });
        }
        
        console.log("before create");
    }
});
