<template>
    <div class="lm-ctt">
        <mt-navbar v-if="dateFilters.length>1" v-model="tabSel" :fixed="true">
            <mt-tab-item v-for="dflt in dateFilters" 
                         :key="dflt.id" :id="dflt.id">{{dflt.name}}</mt-tab-item>
        </mt-navbar>
        <div v-if="dateFilters.length>1" style="height: 49px;"></div>

        <div class="loadmore-ctn" ref="loadmoreCtn">
            <load-more ref="scroll"
                       :data="orderList"
                       :scrollbar="true"
                       :pullDownRefresh="true"
                       :pullUpLoad="true"
                       @pullingDown="reloadListData"
                       @pullingUp="loadMoreData">
                <router-view :orderList="orderList" 
                    @setOptions="initOptions"
                    @showImageViewer="showImageViewer">
                    <li v-if="noDataFound" slot="no-result">
                        <div class="no-result txtc">
                            <i></i>
                            <span>您还没有相关订单</span>
                        </div>
                    </li>
                </router-view>
            </load-more>
        </div>

        <image-viewer :visible="imageViewerVis"
            :imageList="imageList"
            @onViewerToogle="onImageViewerToggle">

        </image-viewer>
    </div>
</template>

<script>
    import {findOrders} from '@/api/orders';
    import LoadMore from '@/common/LoadMore';
    import ImageViewer from '@/common/ImageViewer';
    import { Toast } from 'mint-ui';

    export default {
        name: 'CusOrders',
        components: {
            LoadMore,
            ImageViewer
        },
        data() {
            return {
                screenHeight: 667,
                orderList: [],
                nextPageNo: 1,
                tabSel: '',
                dateFilters: [],
                selType: '',
                imageViewerVis: false,
                imageList: []
            };
        },
        computed: {
            noDataFound() {
                return this.orderList.length === 0;
            },
            needReload() {
                const {tabSel, selType} = this;
                return {tabSel, selType};
            }
        },
        watch: {
            needReload(val) {
                console.log("reload all Data");
                this.reloadListData();
            }
        },
        methods: {
            initOptions(option) {
                this.selType = option.selType;
                let dateSels = option.dateSels;
                this.dateFilters = dateSels;
                if (option.defaultDateId) {
                    this.tabSel = option.defaultDateId;
                } else if (dateSels && dateSels.length > 0) {
                    this.tabSel = dateSels[0].id;
                } else {
                    this.tabSel = '';
                }
            },
            reloadListData() {
                this.nextPageNo = 1;
                this.initLoadMoreHeight();
                this.loadMoreData();
                this.$refs.scroll.scrollTo(0, 0);//滚动到最顶端
            },
            loadMoreData() {
                findOrders(this.nextPageNo, this.tabSel, this.selType).then(data => {
                    console.log(data);
                    if (this.nextPageNo === 1) {
                        //载入的是第1页,初始载入
                        this.orderList = [];
                    }
                    if (data.dataList !== null && data.dataList.length !== 0) {
                        this.orderList = this.orderList.concat(data.dataList);
                        this.nextPageNo++;
                    } else {
                        this.$refs.scroll.forceUpdate();
                    }
                }).catch(err => {
                    if (this.nextPageNo === 1) {
                        //载入的是第1页,初始载入
                        this.orderList = [];
                    }
                    this.$refs.scroll.forceUpdate();
                    Toast(err.msg);
                });
            },
            initLoadMoreHeight() {
                //初始化LoadMore父容器高度
                this.$refs.loadmoreCtn.style.height = document.documentElement.clientHeight - (this.dateFilters.length > 1 ? 49 : 0) + "px";
            },
            showImageViewer(imageDatas) {
                this.imageList = imageDatas || [];
                this.imageViewerVis = true;
            },
            onImageViewerToggle(val) {
                this.imageViewerVis = val;
            }
        },
        mounted() {
            console.log("this mounted");
            this.initLoadMoreHeight();
            window.onresize = () => {
                this.initLoadMoreHeight();
            };
        }
    };
</script>

<style lang="stylus">
    @import '~css/varibles.styl';
    .lm-ctt{
        background: $content-background ;
    }
    .loadmore-ctn{
        min-height: 1px;
        overflow: hidden;
        ul:before{
            content: "";
            display: block;
            height: 1px;
        }
        .order-item{
            background: #fff;
            min-height: 50px;
            margin: 15px 8px 0;
            border-radius: 5px;
            align-items: stretch;
            & > *{
                width: 100%;
                padding: .4em 10px;
            }
            & .separate{
                padding: 0;
            }
            .shop{
                color: #000;
                line-height: .56rem;
                font-size: .32rem;
                .iconfont{
                    font-size: 1em;
                    font-weight: bold;
                }
            }
            .tel{
                width: 50px;
                i{font-size: .56rem;}
            }
            .order-dtl{
                span{
                    width: 100%;
                    padding:.2em 0 .3em;
                    &.time{
                        width: 10em;
                    }
                }
            }
        }
        .no-result{
            position: absolute;
            top: 20%;
            width: 100%;
            color:#aaa;
            i{
                display:inline-block;
                width: 40vw;
                height: 55vw;
                background: url('~@/assets/images/noresult.png') no-repeat top center;
                background-size: 100% auto;
            }
            span{
                color:#333;
                margin-top: 28px;
                display: block;
                font-size: .4rem;
            }
        }
        button{
            font-size: 1em;
            padding: 0 .5em;
            height: 2em;
            line-height: 1;
            border-radius: .5em;
        }
    }
</style>