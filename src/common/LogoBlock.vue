<template>
    <div class="logo-ctnr">
        <div class="logo-pic"></div><br/>
        <div class="desc1">云驼联盟</div><br/>
        <div class="desc2">家居送装维修专业云平台</div>
    </div>
</template>

<script>
    export default {
        name: 'LogoBlock',
        data() {
            return {

            };
        }
    };
</script>

<style scoped lang="stylus">
    .logo-ctnr{
        margin: 12vh 0 5vh;
        text-align: center;
    }
    .logo-pic{
        display: inline-block;
        width: 20vw;
        height:20vw;
        background: url('~@/assets/images/icon-128.png') no-repeat center center;
        background-size: 100% auto;
        border-radius: 5px;
    }
    .desc1{
        display: inline-block;
        width: 20vw;
        text-align:justify;
        text-justify:inter-ideograph;
        margin-top: 3vw;
        height: 1em;
        &:after{
            content: " ";
            display: inline-block;
            width: 100%;
            height:1px;
        }
    }
    .desc2{
        display: inline-block;
        color:#999;
        font-family: "FangSong","Microsoft Yahei";
        font-size: .2rem;
        letter-spacing: .08rem;
    }
</style>
