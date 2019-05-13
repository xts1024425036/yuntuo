<template>
    <ul>
        <slot name="no-result"></slot>
        <li v-for="(item,index) in orderList" :key="index" class="order-item flex wrap">
            <span class="shop flex-item"><i class="iconfont icon-shop"></i> {{item.shopName}} <i class="iconfont icon-right"></i></span>
            <span class="tel txtr"><a :href="'tel://'+item.shopMobile"><i class="iconfont icon-phone"></i></a></span>

            <i class="separate"></i>

        <router-link tag="div" :to="{name:'OrderDetail',params:{orderid:item.dorderId}}" class="flex-item flex wrap order-dtl">
            <span class="flex-item">订单号: {{item.dorderId}}</span>
            <span class="time txtr">{{item.createDate}}</span>
            <span>订单概要: {{item.prodDesc}}</span>
        </router-link>

        <i class="separate"></i>
        <div class="logs flex" v-for="logItem in item.logs">
            <span class="t txtc">{{logItem.createTime}}</span>
            <span class="r flex-item">{{logItem.remarks}}</span>
        </div>

        <i class="separate"></i>
        <div class="left-btns">
            <mt-button plain class="issue-btn" @click="createIssue(item.dorderId)"><i class="iconfont icon-error" slot="icon"></i>问题反馈</mt-button>
        </div>

        <div class="flex-item txtr right-btns">
            <mt-button plain @click="commitReceived(item)"
                       v-if="couldCusReceived(item)">收货确认</mt-button>
            <mt-button plain @click="commitInstalled(item)"
                       v-if="couldCusInstalled(item)">安装完毕</mt-button>
        </div>

        </li>
    </ul>
</template>

<script>
    import {commitOrderReceived, commitOrderInstalled} from '@/api/orders';
    import { Toast } from 'mint-ui';

    export default {
        name: 'UnompleteOrders',
        props: ['orderList'],
        components: {
        },
        data() {
            return {
                options: {
                    selType: 'uncomplete',
                    dateSels: [{id: "CM", name: "本月"}, {id: "LM", name: "上个月"}, {id: "CY", name: "今年"}]
                }
            };
        },
        methods: {
            couldCusReceived(_order) {
                return /[QFICA]/.test(_order.status) && _order.ctmStatus === null;
            },
            couldCusInstalled(_order) {
                return /[ICA]/.test(_order.status) && _order.ctmStatus === "RECEIVED";
            },
            createIssue(orderid) {
                this.$router.push({name: 'IssueCreate', params: {orderid: orderid}});
            },
            commitReceived(_order) {
                let orderid = _order.dorderId;
                commitOrderReceived(orderid).then(data => {
                    _order.ctmStatus = "RECEIVED";
                    Toast("确认收货成功");
                }).catch(err => {
                    Toast(err.msg);
                });
            },
            commitInstalled(_order) {
                let orderid = _order.dorderId;
                commitOrderInstalled(orderid).then(data => {
                    _order.ctmStatus = "INSTALLED";
                    Toast("确认安装完毕");
                }).catch(err => {
                    Toast(err.msg);
                });
            }
        },
        mounted() {
            this.$emit('setOptions', this.options);
        }
    };
</script>

<style scoped lang="stylus">
    .logs{
        padding: 0.4em 20px;
        background: #fdfdfd;
        color: #888;
        .t{
            width: 5.5em;
        }
        .r{
            padding-left: 10px;
        }
    }
    .left-btns{
        width: 9em;
        .issue-btn{
            color: #ff0000;
            border-color: #ff0000;
            border:none;
        }
    }
    .right-btns{
        button{
            color: #00ae57;
            border-color: #00ae57;
        }
        button+button{
            margin-left: 10px;
        }
    }
</style>
