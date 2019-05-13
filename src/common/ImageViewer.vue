<template>
    <mt-popup v-model="viewerVisible" popup-transition="popup-fade" 
              class="image-viewer-pop">
        <span class="notice txtc">点击任意位置可关闭浏览</span>
        <mt-swipe class="image-viewer" :auto="0" :prevent="true" :speed="100" :continuous="false"
                  v-if="showSwiper">
            <mt-swipe-item v-for="(item,index) in imageList" :key="index">
                <div class="image-item" @click="closeAll">
                    <img :src="item"/>
                </div>
            </mt-swipe-item>
        </mt-swipe>
    </mt-popup>
</template>

<script>
    export default {
        name: 'ImageViewer',
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            imageList: {
                type: Array,
                default: function () {
                    return [];
                }
            }
        },
        data() {
            return {
                viewerVisible: this.visible
            };
        },
        computed: {
            showSwiper() {
                return this.imageList.length > 0;
            }
        },
        watch: {
            visible(val) {
                this.viewerVisible = val;
            },
            viewerVisible(val) {
                this.$emit('onViewerToogle', val);
            }
        },
        methods: {
            closeAll() {
                this.viewerVisible = false;
            }
        }
    };
</script>

<style lang="stylus">

    .image-viewer-pop{
        width:100%;
        .notice{
            position: fixed;
            width: 100%;
            top: -10px;
            color:#b2b09a;
        }
        ~ .v-modal{opacity: 0.8;}
        .mint-swipe-indicator{opacity: 0.8;}
        &.mint-popup{
            background: transparent;
        }
        .image-viewer{
            width: 100%;
            height: 95vh;
            color:#ccc;
        }
        .image-item{
            width: 100%;
            height: 100%;
            display: flex;
            justify-content:center;
            align-items:center;
            img{
                width: 100%;
                height: auto;
                max-height: 95vh;
            }
        }
    }
</style>
