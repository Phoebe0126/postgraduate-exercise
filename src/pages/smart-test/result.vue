<template>
<view class="result-wrapper">
    <view class="tips">恭喜你！完成本次练习</view>
    <view class="wrapper">
        <view class="score">
            <view class="title">你的得分</view>
            <view class="content">分</view>
        </view>
        <view class="line"></view>
        <view class="time">
            <view class="title">你的用时</view>
            <view class="content">时分秒</view>
        </view>
    </view>
</view>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.result-wrapper{
    .tips{
    color: #fff;
    font-size: 30rpx;
    height: 210rpx;
    padding-left: 50rpx;
    background: #c9a2a2;
    }
    .wrapper{
        width: 85%;
        height: 200rpx;
        background: #fff;
        top: 100rpx;
        left: 50rpx;
        position: absolute;
        display: flex;
        border-radius: 25rpx;
        box-shadow: 0rpx 5rpx 10rpx 10rpx rgba(1, 1, 1, .05);
        .score,.time{
            padding: 50rpx 94rpx;       
        }
        .line {
			border-right: 3rpx solid #c9a2a2;
			width: 1rpx;
			height: 70rpx;
            margin-top: 60rpx;
		}
        .title{
            padding-bottom: 10rpx;
        }
        .title,.content{
            color: #c9a2a2;
            text-align: center;
            font-size: 28rpx;
        }
    }
}

</style>