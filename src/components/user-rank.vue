<template>
    <view class="user-list">
    <view class="userinfo" >
        <view class="ranking">
            1
        </view>
        <view class="avatar">
            <image src="https://thirdwx.qlogo.cn/mmopen/vi_32/oUicWDFmZmf8qgfY0NLmIwedj9uDt28tUpIsadMjbQwC2IhQBgzphWY83CWiaaxteQ4XR07kvicvrUibkFdaQqBzLg/132" mode="aspectFill">
        </view>
        <view class="info">
            <text class="nickname">小陈小陈早点睡觉小陈小陈早点睡觉</text>
            <text class="number">58542题</text>
        </view>
    </view>
</view>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.user-list {
    .userinfo{
        width: 100%;
        height: 150rpx; 
        border-bottom: 1px solid #f0f0f0;
        display: flex;
        align-items: center;

        .ranking{
            //float: left;
            font-size:28rpx;
            color:black;
            margin-left: 30rpx;

        }

        .avatar {
            float:left;
            width: 80rpx;
            height: 80rpx; 
            overflow: hidden;
            // background-color: rgb(169, 111, 111);
            margin-left: 40rpx; 
            position: relative;
            border-radius: 50%;

        
            image {
                width: 100%;
                height: 100%;
            }
        }
        .info {
            float:left;
            margin-left: 30rpx; 
            width: 540rpx; 
            .nickname {
                float:left;
                color: black;
                width:340rpx;
                font-size: 36rpx;
                line-height: 60rpx;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;

            }
            .number {
                float:right;
                color: #000000;
                font-size: 36rpx; 
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                margin-right: 20rpx;
            }
        }

    }
}

</style>