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
        <div class="issue-dtl flex">
            <span class="flex-item">问题服务号: {{item.issueid}}</span>
            <span class="itime txtr">{{item.issueCreateTime}}</span>
        </div>

        <i class="separate"></i>
        <div class="issue-desc flex-item">
            <span class="title">问题描述:</span>
            <span class="detail">{{item.issueDesc}}</span>
        </div>
        <span class="issue-img" v-if="item.issueImages&&item.issueImages!==null" @click="showImages(item.issueImages)"><i class="iconfont icon-image"></i></span>

        <i class="separate"></i>
        <div class="solve-plan">
            <span class="title">解决方案:</span>
            <span class="detail">{{item.solutionDetail}}</span>
            <span class="notice txtc" v-if="item.solutionDetail===null">等待提供解决方案</span>
        </div>

        <span class="star-eval">
            <star-eval :score="item.issueScore" @commitScore="commitScore($event,item)"
                v-if="item.issueStatus==='SOLVE_PLAN'||item.issueStatus==='CLOSED'"></star-eval>
        </span>
        </li>
    </ul>
</template>

<script>
    import StarEval from '@/common/StarEval';
    import {scoreIssueOrder} from '@/api/orders';
    import { Toast } from 'mint-ui';

    export default {
        name: 'IssueOrders',
        props: ['orderList'],
        components: {
            StarEval
        },
        data() {
            return {
                options: {
                    selType: "issue",
                    dateSels: [],
                    defaultDateId: "ALL"
                }
            };
        },
        methods: {
            commitScore(score, item) {
                //提交问题单的评分
                scoreIssueOrder(item.issueid, score).then((data) => {
                    if (data) {
                        Toast("评价成功");
                        item.issueScore = score;
                    }
                }).catch((err) => {
                    Toast(err.msg);
                });
            },
            showImages(imageList) {
                if (imageList) {
                    var imgs = imageList.split(",");
                    this.$emit('showImageViewer', imgs);
                }
            }
        },
        mounted() {
            this.$emit('setOptions', this.options);
        }
    };
</script>

<style scoped lang="stylus">
    @import '~css/varibles.styl';
    @import '~css/mixins.styl';

    .order-item{
        .issue-desc,.solve-plan,.issue-img{
            background: #fdfdfd ;
        }
        .issue-dtl{
            .itime{width:10em;}
            span{
                padding:0.2em 0 0.3em;
            }
        }

        .issue-desc {
            padding-right:5px;
            .title{
                display: block;
                color: #df5000;
            }
        }
        .issue-img{
            width:50px;
            display: flex;
            justify-content:center;
            align-items:Center;
            padding-left:0;
            i{
                color:#25a4bb;
                font-size: 40px;
            }
        }
        .solve-plan{
            .title{color:#26a2ff;}
            .notice{
                display: block;
                color: #999;
            }
        }
        .detail{
            display: block;
            padding: .5em 0 .8em 5px;
            font-size: .24rem;
            line-height: .28rem;
            color: #707274;
            background: #fdfdfd ;
            word-wrap:break-word;
            word-break:break-all
        }
    }

</style>
