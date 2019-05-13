<template>
    <div class="issue">
        <div class="panel info">
            问题订单: {{this.orderid}}
        </div>

        <div class="panel">
            <mt-field placeholder="在此输入您需要反馈的问题信息, 需大于20个汉字" type="textarea" rows="4" v-model="issueDesc"
                      :attr="{maxlength:500}"></mt-field>

            <i class="separate"></i>
            <div class="panel image-list">
                <div class="image" v-for="(imgUrl,idx) in selImages" :key="idx">
                    <i class="iconfont icon-close close" @click="delImage(idx)"></i>
                    <img :src="imgUrl"/>
                </div>
                <i class="iconfont icon-camera camera-btn" @click="chooseImages" v-if="canChooseMoreImages"></i>
            </div>

        </div>

        <div class="panel">
            <mt-button type="primary" size="large" @click="createIssue">提交反馈</mt-button>
        </div>
    </div>
</template>

<script>
    import {createIssueOrder} from '@/api/orders';
    import { Toast } from 'mint-ui';
    import wx from 'weixin-js-sdk';
    import {getJssdkConfig} from '@/api/wxapi';

    export default {
        name: 'IssueCreate',
        components: {

        },
        data() {
            return {
                orderid: this.$route.params.orderid,
                issueDesc: '',
                isWxJsOk: false,
                selImages: []
            };
        },
        computed: {
            canChooseMoreImages() {
                return this.selImages === null || this.selImages.length < 5;
            }
        },
        watch: {
            $route(val) {
                this.initData();
            }
        },
        methods: {
            initData() {
                this.orderid = this.$route.params.orderid;
                this.selImages = [];
            },
            chooseImages() {
                console.log("start to choose images");
                var _this = this;
                wx.chooseImage({
                    count: 5 - this.selImages.length, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        console.log(123);
                        _this.selImages = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    },
                    fail: function () {
                        console.log(222222);
                    }
                });
            },
            delImage(index) {
                console.log("delete image: " + index);
                this.selImages.splice(index, 1);
            },
            createIssue() {
                console.log("orderid: " + this.orderid + " >>>" + this.issueDesc);
                if (this.issueDesc === null || this.issueDesc.length < 20) {
                    Toast("请输入详细的问题信息");
                    return;
                }
                createIssueOrder(this.orderid, this.issueDesc).then(data => {
                    Toast("提交反馈成功, 反馈服务号: " + data.issueid);
                }).catch(err => {
                    Toast(err.msg);
                });
            }
        },
        mounted() {
            var reqUrl = encodeURIComponent(window.location.href.split('#')[0]);
            getJssdkConfig(this.$store.state.wxAppid, reqUrl).then(data => {
                wx.config({
                    debug: process.env.NODE_ENV === "development",
                    appId: this.$store.state.wxAppid,
                    timestamp: data.timestamp,
                    nonceStr: data.nonceStr,
                    signature: data.signature,
                    jsApiList: ['chooseImage', 'previewImage', 'getLocalImgData']
                });
            }).catch(err => {
                Toast("初始化微信JSSDK失败: " + err.msg);
            });
            var _this = this;
            wx.ready(function () {
                console.log("wx jssdk ok");
                _this.isWxJsOk = true;
            });
            wx.error(function (res) {
                console.log("wx jssdk fail");
            });
        }
    };
</script>

<style scoped lang="stylus">
    @import '~css/varibles.styl';
    .issue{
        background: $content-background ;
        .panel{
            background: #fff;
        }
        .panel+.panel{
            margin: 15px 10px 0;
        }
    }
    .info{
        padding: .4em 10px;
        font-size: 1.3em;
    }
    .camera-btn{
        font-size: 40px;
        display: inline-block;
        line-height: 1;
    }
    .image-list .image{
        display: inline-block;
        position: relative;
        margin: 5px;
        height: 50px;
        width:50px;
        text-align: center;
        background: $content-background ;
        vertical-align: middle;
        .close{
            position: absolute;
            padding: 5px;
            right: -5px;
            top: -5px;
            font-size: 15px;
            font-weight: bold;
            color: #f44336;
        }
        img{
            height: 100%;
            max-width: 50px;
        }
    }
</style>
