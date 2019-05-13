<template>
    <div class="test">
        <mt-field label="金额(元):" placeholder="请输入支付的金额" type="tel" v-model="inFee"></mt-field>
        <mt-button type="primary" @click="goPay" size="large">支付1~10随机</mt-button>
    </div>
</template>

<script>
    import wx from 'weixin-js-sdk';
    import {getJssdkConfig, postJsapiPay} from '@/api/wxapi';
    import { Toast } from 'mint-ui';

    export default {
        name: 'WxJssdkTest',
        components: {

        },
        data() {
            return {
                isWxJsOk: false,
                inFee: 0
            };
        },
        computed: {

        },
        methods: {
            goPay() {
                if (!this.isWxJsOk) {
                    Toast("微信JSSDK未初始化成功");
                    return;
                }
                postJsapiPay("YTFNCWX", this.$store.state.gsid, this.inFee * 100, this.$store.state.wxUser.openid).then(data => {
                    console.log(data);
                    var payCfg = data.payConfig;
                    payCfg.success = function (res) {
                        console.log("调用支付成功");
                        console.log(res);
                        Toast("支付成功");
                    };
                    payCfg.fail = function (err) {
                        console.log(err);
                        Toast("支付失败: " + err.errMsg);
                    };
                    payCfg.cancel = function (err) {
                        console.log(err);
                        Toast("取消支付");
                    };
                    wx.chooseWXPay(payCfg);
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
                    jsApiList: ['chooseImage', 'previewImage', 'chooseWXPay']
                });
            }).catch(err => {
                Toast("初始化微信JSSDK失败: " + err.msg);
            });
            this.inFee = Math.round(Math.random() * 10);
            if (this.inFee === 0) {
                this.inFee = 10;
            }
            var _this = this;
            wx.ready(function () {
                console.log("wx jssdk ok");
                _this.isWxJsOk = true;
            });
            wx.error(function (res) {
                console.log("wx jssdk fail");
                Toast(res.errMsg);
            });
        }
    };
</script>

<style scoped lang="stylus">
    .test{padding: 10px;}
</style>