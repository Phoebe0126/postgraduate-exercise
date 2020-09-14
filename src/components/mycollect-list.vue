<template>
    <view class="content">
        <ul class="collect-container">
            <li v-for="(item, index) in items" :key="index" @click="naviToquesPage(item)">
                <view class="collection">
                <p class="question" style="-webkit-box-orient: vertical;">{{ item.question }}：</p>
                <i></i>
                </view>
                <span class="createdTime" style="color:grey">{{ item.collectedTime }}</span>
            </li>
        </ul>
    </view>
</template>

<script>
export default {
    props:{
        items: {
            type: Array,
            default: ()=>[]
        }
    },
    methods: {
        naviToquesPage ({ id }) {
            this.$emit('naviToquesPage', id);
        }
    }
}
</script>

<style lang="scss">
    .collect-container{
        overflow: hidden;
        position: absolute;
        margin-top: 20rpx;
        width: 100%;
        li{
            height: 180rpx;
            background: #ffffff;
            width: 100%;
            float: left;
            margin-top: 10rpx; 
            list-style-type: none;
            position: relative;
            font-size: 24rpx;
            .collection{
                position: absolute;
                height: 60rpx;
                width: 619rpx;
                padding: 12rpx 33rpx 30rpx 17rpx;
                left: 40rpx;
                top: 22rpx;
                background:#f1eaea;
                .question {
                display:-webkit-box;
                height: 68rpx;
                width: 540rpx;
                z-index: -1;
                word-break: break-all;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp: 2;
                }
                i{
                background: url('/static/navTo.png') center center;
                width: 30rpx; 
                height: 30rpx;
                display: block; 
                position: absolute;
                right: 18rpx;
                bottom: 16rpx;
                }
            }
            .createdTime{
                display: block;
                position: absolute;
                left:40rpx;
                bottom:20rpx;
            }
        }
    }
</style>