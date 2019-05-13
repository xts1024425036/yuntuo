<template>
    <div id="app">
        <!-- exclude="Detail"   Detail组件不缓存 activated deactivated 不生效  -->
        <!-- <keep-alive exclude="Detail"> -->
        <keep-alive>
            <router-view/>
        </keep-alive>
        <footer-menu v-if='false'></footer-menu>
    </div>
</template>

<script>
    import FooterMenu from '@/common/FooterMenu';
    export default {
        name: 'App',
        components: {
            FooterMenu
        }
    }
</script>

<style>
</style>
