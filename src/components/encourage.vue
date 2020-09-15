<template>
    <view class="encourage">
        <text v-if="current === 0">你已经刷了{{ num }}道题，继续加油哦~</text>
        <text v-else>你已经坚持了{{ num }}天，坚持就是胜利！</text>
    </view>
</template>

<script>
export default {
    props: {
        num: {
            type: Number,
            default: 0
        },
        current: {
            type: Number,
            default: 0
        }
    }
}
</script>

<style lang="scss" scoped>
   .encourage{
        z-index: 5;
        position: fixed;
        width: 100%;
        height: 100rpx;
        bottom: 0;
        border-top-width: 5rpx;
        border-top-style: solid;
        border-top-color: #eee;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(255, 255, 255, 1);
       .tip{
           font-size: 25rpx;
           //text-align: center;
       }
   }
</style>