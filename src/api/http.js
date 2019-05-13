import axios from 'axios';
import store from '@/store';
import router from '@/router';
import { Toast, MessageBox } from 'mint-ui';

axios.defaults.timeout = 20000; //超时时间
axios.defaults.baseURL = 'https://app.51yuntuo.com/datacenter/api/'; //默认地址local.51yuntuo.com   app.51yuntuo.com

// http request 拦截器
axios.interceptors.request.use(
        config => {
            if (store.state.token) {  // 判断是否存在token,如果存在的话,则每个http header都加上token
                config.headers.Authorization = `Bearer ${store.state.token}`;
            }
            return config;
        },
        err => {
            return Promise.reject(err);
        });

// http response 拦截器
axios.interceptors.response.use(
        response => {
            if (response.data.result === 1) {
                return Promise.resolve(response.data.data);
            } else {
                return Promise.reject(response.data);
            }
        },
        error => {
            if (error.response) {
                console.log(error.response);
                switch (error.response.status) {
                    case 401:
                        // 返回 401 清除token信息并跳转到登录页面
                        if (router.currentRoute.name !== "Login") {
                            MessageBox.confirm(error.response.data.msg).then(action => {
                                store.dispatch('logOut');
                                router.push({path: '/login', query: {redirect: router.currentRoute.fullPath}});
                            }).catch(error => {
                                console.log("press cancel");
                            });
                        }
                }
                var _rejectData = error.response.data;
                if (typeof _rejectData === "string") {
                    _rejectData = {msg: "连接失败: " + error.response.status + " " + error.response.statusText};
                }
                return Promise.reject(_rejectData);   // 返回接口返回的错误信息
            } else {
                error.msg = "连接失败";
                return Promise.reject(error);
            }
        });

export default axios;
