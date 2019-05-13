<template>
    <div class="stars flex">
        <i v-for="(starClass,idx) in starClasses" :class="'iconfont '+starClass" @click="selectStar(idx,$event)" v-model="score"></i>
        <div class="flex-item txtr"><mt-button v-if="needScored" @click="commitScore" :disabled="curScore<=0" class="sbt" plain>评分</mt-button></div>
    </div>
</template>

<script>
    const STAR_ON = 'icon-star-fill on';
    const STAR_OFF = 'icon-star';

    export default {
        name: 'StarEval',
        computed: {
            starClasses() {
                let result = [];
                for (var i = 1; i < 6; i++) {
                    result.push(this.curScore >= i ? STAR_ON : STAR_OFF);
                }
                return result;
            },
            needScored() {
                return this.score === null || this.score === 0;
            }
        },
        props: {
            score: {
                type: Number,
                default: 0
            }
        },
        watch: {
            score(val) {
                this.curScore = val;
            }
        },
        data() {
            return {
                curScore: this.score || 0
            };
        },
        methods: {
            selectStar(index, event) {
                if (this.score > 0) {
                    return;
                }
                this.curScore = index + 1;
            },
            commitScore() {
                this.$emit('commitScore', this.curScore);
            }
        }
    };
</script>

<style scoped lang="stylus">
    .stars{
        i{
            &.on{
                color:#f24141;
            }
            font-size: 28px;
            padding: 5px;
            width: 38px;
        }
        .sbt{
            color:#f24141;
            border-color: #f24141;
            font-size: 14px;
            height: 28px;
            line-height: 28px;
            margin-top: 5px;
            background: transparent;
            &.is-disabled{
                color:#999;
                border-color:#999;
            }
        }
    }
</style>
