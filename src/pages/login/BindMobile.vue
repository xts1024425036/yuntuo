<template>
    <div>
        <logo-block></logo-block>
        <div class="content">
            <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="mobile" :attr="{maxlength:11}"></mt-field>
            <mt-field label="验证码" placeholder="验证码" type="tel" v-model="vcode" :attr="{maxlength:6}">
                <mt-button type="default" class="vcode-btn" :disabled="disableVcodeBtn" 
                           @click.native="sendVcode">{{vcodeBtnName}}</mt-button>
            </mt-field>
            <mt-button type="primary" size="large" :disabled="disCommitBtn" style="margin-top: 1em;" 
                       @click.native="commitVcode">确认绑定</mt-button>
        </div>
    </div>
</template>

<script>
    import LogoBlock from '@/common/LogoBlock';
    import { Toast } from 'mint-ui';
    import {sendVCodeToMobile} from '@/api/utils';
    import {wxBindMobile} from '@/api/login';

    const itvCount = 60;
    let secondsLeft = itvCount;
    let toastInstance; //弹出信息实例
    export default {
        name: 'BindMobile',
        components: {
            LogoBlock
        },
        data() {
            return {
                mobile: '',
                vcode: '',
                vcodeBtnName: '获取验证码',
                disableVcodeBtn: false
            };
        },
        computed: {
            disCommitBtn() {
                return this.vcode.length !== 6;
            }
        },
        activated() {
            if (this.$route.query.needBind) {
                this.showMessage("未绑定手机号,请先进行绑定");
            }
        },
        methods: {
            sendVcode() {
                console.log("send vcode");
                if (this.mobile.length !== 11) {
                    this.showMessage("请输入正确的手机号");
                    return;
                }
                this.disableVcodeBtn = true;
                sendVCodeToMobile(this.mobile).then(data => {
                    this.showMessage("发送成功");
                    this.vcodeBtnLife();//发送延时
                }).catch((err) => {
                    this.disableVcodeBtn = false;
                    this.showMessage(err.msg);
                });
            },
            commitVcode() {
                wxBindMobile(this.mobile, this.vcode).then(data => {

                    if (data.isBind) {
                        this.showMessage("绑定成功", "middle");
                        setTimeout(() => {
                            let redirectUrl = this.$route.query.redirect || "/";
                            this.$router.push(redirectUrl);
                        }, 2000);
                    }
                }).catch((err) => {
                    this.showMessage(err.msg);
                });

            },
            vcodeBtnLife() {
                secondsLeft--;
                this.vcodeBtnName = "重新发送(" + secondsLeft + "s)";
                if (secondsLeft >= 0) {
                    setTimeout(this.vcodeBtnLife, 1000);
                } else {
                    secondsLeft = itvCount;
                    this.disableVcodeBtn = false;
                    this.vcodeBtnName = "获取验证码";
                }
            },
            showMessage(msg, position) {
                if (toastInstance) {
                    toastInstance.close();
                }
                let _pst = position || 'bottom';
                console.log(_pst);
                toastInstance = Toast({
                    message: msg,
                    position: _pst
                });
            }
        },
        mounted() {

        }
    };
</script>

<style scoped lang="stylus">
    .vcode-btn{
        font-size: .28rem;
        height: .6rem;
        margin-left: .5em;
        padding: 0 6px;
    }
</style>