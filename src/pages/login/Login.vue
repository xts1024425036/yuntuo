<template>
    <div class="ctnMiddle">
        <mt-spinner type="triple-bounce" color="rgb(38, 162, 255)" :size="60" class="spnr" v-if="showSpinner"></mt-spinner>
    </div>
</template>

<script>
    import {isWX} from 'js/tools';
    import {Toast, MessageBox} from 'mint-ui';
    import {wxOAuthLogin} from '@/api/login';

    export default {
        name: 'Login',
        components: {

        },
        data() {
            return {
                showSpinner: true
            };
        },
        methods: {
        },
        activated() {
            let token = this.$store.state.token;
            let redirectUrl = this.$route.query.redirect || "/";
            if (token) {
                //有token直接到跳转目标页
                this.$router.push(redirectUrl);
                return;
            }

            if (isWX()) {
                console.log("wx device");
                let _appid = this.$route.query.appid;
                let _code = this.$route.query.code;
                let _state = this.$route.query.state;
                if (_code) {
                    //有code参数, 到后台进行授权
                    wxOAuthLogin(_appid, _code, _state).then(data => {
                        console.log("login success");
                        this.$store.dispatch("saveTokenAndWXUser", data)
                                .then(() => {
                                    if (!data.bindMobile) {
                                        //未绑定手机号
                                        this.$router.push({name: 'BindMobile', query: {redirect: redirectUrl, needBind: true}});
                                    } else {
                                        this.$router.push(redirectUrl);
                                    }
                                });
                    }).catch(err => {
                        MessageBox.confirm(err.msg).then(action => {
                            this.$router.push({name: 'Login', query: {redirect: redirectUrl}});
                        }).catch(error => {
                            console.log("press cancel");
                        });
                    });
                } else {
                    //无code参数, 跳转到授权链接
                    let _curUrl = document.location.href;
                    document.location.href = "https://tp.ymdatas.com/wxsvr/api/wxlogin/pre?appid=" + this.$store.state.wxAppid + "&codeMode=1&rurl=" + encodeURIComponent(_curUrl);
                }
            } else {
                Toast({
                    message: '当前设备不受支持,请在微信中打开',
                    duration: -1,
                    iconClass: 'iconfont icon-frown ntc'
                });
                this.showSpinner = false;
            }
        }
    };
</script>

<style scoped lang="stylus">
    .ctnMiddle{text-align: center;padding-top: 45%;}
</style>