<template>
    <view class="note" @click="naviToEditNotePage">
        <view>
            <i class="iconfont">&#xe60f;</i>
        </view>
        <view class="text">点击发表笔记</view>
        <view class="text">优质的笔记可以帮助你考得更高哦~</view>
    </view>
</template>

<script>
export default {
    props: {
        quesId: {
            type: Number,
            default: -1
        }
    },
    watch: {
        quesId: {
            immediate: true,
            handler (val) {
                this.questionId = val;
            }
        }
    },
    data () {
        return {
            questionId: this.quesId
        }
    },
    methods: {
        // 跳转到笔记页面
        naviToEditNotePage () {
            uni.navigateTo({
                url: `../edit-note/index?id=${this.questionId}`
            });
        }
    }
}
</script>

<style lang="scss" scoped>
 .note {
    font-size: 30rpx;
    padding: 20rpx 0;
    color: #a7a7a7;
    text-align: center
}
</style>