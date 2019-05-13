import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/Home';
import Login from '@/pages/login/Login';
import BindMobile from '@/pages/login/BindMobile';
import CusOrders from '@/pages/orders/CusOrders';
import CompleteOrders from '@/pages/orders/components/CompleteOrders';
import UncompleteOrders from '@/pages/orders/components/UncompleteOrders';
import IssueOrders from '@/pages/orders/components/IssueOrders';
import OrderDetail from '@/pages/orders/OrderDetail';
import IssueCreate from '@/pages/orders/IssueCreate';

import WxJssdkTest from '@/pages/test/WxJssdkTest';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Index',
            redirect: '/orders/uncomplete',
            meta: {
                title: 'Index Page'
            }
        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
            meta: {
                title: '主页'
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                title: '登陆'
            }
        },
        {
            path: '/bindMobile',
            name: 'BindMobile',
            component: BindMobile,
            meta: {
                title: '绑定手机号'
            }
        },
        {
            path: '/orders/:tp',
            component: CusOrders,
            children: [
                {
                    path: '/orders/complete',
//                    name: 'CompleteOrders',
                    component: CompleteOrders,
                    meta: {
                        title: '已完成订单'
                    }
                },
                {
                    path: '/orders/uncomplete',
//                    name: 'UncompleteOrders',
                    component: UncompleteOrders,
                    meta: {
                        title: '未完成订单'
                    }
                },
                {
                    path: '/orders/issue',
//                    name: 'IssueOrders',
                    component: IssueOrders,
                    meta: {
                        title: '问题单'
                    }
                }
            ]
        },
        {
            path: '/orderDetail/:orderid',
            name: 'OrderDetail',
            component: OrderDetail,
            meta: {
                title: '订单明细'
            }
        },
        {
            path: '/issueCreate/:orderid',
            name: 'IssueCreate',
            component: IssueCreate,
            meta: {
                title: '问题反馈'
            }
        },
        {
            path: '/wxJssdkTest',
            name: 'WxJssdkTest',
            component: WxJssdkTest,
            meta: {
                title: '微信JsSDK测试页面'
            }
        }
    ]
})
