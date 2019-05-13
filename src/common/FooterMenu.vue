<template>
    <div style="background: #fff;" class="my-footer flex">
        <router-link tag="div" to="/orders/uncomplete" class="flex-item">
            <!--<i class="iconfont icon-store"></i>-->
            <div class="desc">未完成单</div>
        </router-link>
        <router-link tag="div" to="/orders/complete" class="flex-item">
            <!--<i class="iconfont icon-wxbzhuye"></i>-->
            <div class="desc">完结单</div>
        </router-link>
        <router-link tag="div" to="/orders/issue" class="flex-item">
            <!--<i class="iconfont icon-gifts"></i>-->
            <div class="desc">问题单</div>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: 'FooterMenu',
        components: {

        },
        data() {
            return {

            };
        },
        methods: {

        },
        mounted() {

        }
    };
</script>

<style scoped lang="stylus">
    .my-footer{
        color: #000000;
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        box-sizing: border-box;
        text-align: center;
        position: fixed;
        left: 0;
        bottom: 0px;
        box-shadow: 0 0 1vh #dedede;
        font-size: 0.3rem;
        z-index: 210;
        background-color: #fff;
    }
    .my-footer .flex-item{
        /*padding-top: 0.2rem;*/
    }
    .my-footer .iconfont{
        font-size: 2.2em;
    }
    .my-footer .desc{
        width: 100%;
        line-height: normal;
        display: inline-block;
    }
    .my-footer .router-link-exact-active{
        color: #409EFF;
    }
</style>
