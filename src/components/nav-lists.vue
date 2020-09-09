<template>
    <view class="nav-wrapper">
        <ul class="nav-container" :style="{top: top}">
            <li v-for="item in items" :key="item.id" :class="item.class" 
                :style="{color: item.color}" @click="navTo(item.navToFunc)">
                <span :style="{background: item.color}"></span>
                <span>{{ item.content }}</span>
                <i></i>
            </li>
        </ul>
  </view>
</template>

<script>
export default {
    props: { 
        items: {
            type: Array,
            default: () => []
        },
        top: {
            type: String,
            default: ''
        }
    },
    methods: {
        navTo(funcName) {
            this.$emit(funcName);
        }
    }
}
</script>

<style lang="scss">
    .nav-container {
        overflow: hidden;
        background: gainsboro;
        position: absolute;
        // top: 360rpx;
        bottom: 0;
        width: 100%;
        padding: 0;
        li {
            height: 90rpx;
            background: white;
            width: 100%;
            float: left;
            list-style-type: none;
            margin-top: 30rpx; 
            position: relative;
            font-size: 24rpx;
            line-height: 90rpx;
            span {
                float: left;
                display: block;
            }
            span:nth-child(1) {
                height: 30rpx;
                width: 30rpx; 
                border-radius: 50%;
                position: relative;
                top: 30rpx;
                left: 60rpx;
                margin-right: 80rpx;
            }
            i {
                background: url('/static/navTo.png') center center;
                width: 30rpx; 
                height: 30rpx; 
                display: block;
                position: absolute; 
                right: 50rpx;
                top: 30rpx;
            }
        }
    }
</style>
