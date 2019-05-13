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
        <span class="star-eval">
            <star-eval :score="item.score" @commitScore="commitScore($event,item)"></star-eval>
        </span>
        </li>
    </ul>
</template>

<script>
    import StarEval from '@/common/StarEval';
    import {scoreOrder} from '@/api/orders';

    export default {
        name: 'CompleteOrders',
        props: ['orderList'],
        components: {
            StarEval
        },
        data() {
            return {
                options: {
                    selType: 'complete',
                    dateSels: [{id: "CM", name: "本月"}, {id: "CY", name: "今年"}, {id: "LY", name: "去年"}]
                }
            };
        },
        methods: {
            commitScore(score, item) {
                //提交订单的评分
                console.log(">> " + score + "  " + orderid);
                scoreOrder(item.dorderId, score).then(data => {
                    if (data) {
                        Toast("评价成功");
                        item.score = score;
                    }
                }).catch((err) => {
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
</style>
