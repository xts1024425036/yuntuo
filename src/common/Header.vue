<template>
    <mt-header fixed class="header" :title="title">
        <router-link v-if="!hideBack" to="/" slot="left">
            <mt-button icon="back" @click="goBack"></mt-button>
        </router-link>
    </mt-header>
</template>

<script>
    export default {
        name: 'MyHeader',
        props: ["title", "hideBack"],
        components: {

        },
        data() {
            return {

            };
        },
        methods: {
            goBack: function () {
                this.$router.go(-1);
            }
        },
        mounted() {

        }
    };
</script>

<style lang="stylus">
    .header{
        height: 0.84rem;
        color: #333;
        background-color: #fff;
        /*border-bottom: 1px solid #ccc;*/
        & h1{font-size: 20px;}
    }
    .header-ctt{
        padding-top: 0.84rem;
    }
</style>
