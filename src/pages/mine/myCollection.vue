<template>
    <view class="content">
        <!-- 科目选择 -->
        <view class="header">
        </view>
        <ul class="collections">
            <li style="color: e0e0e0;">
                <view class="collection">
                <p class="question" style="-webkit-box-orient: vertical;font-size：30rpx;">列宁科学分析了19世纪末20世纪初世界历史条件的变化，提出了社会主义革命可能在一国内啊啊啊啊啊啊哈哈哈哈昂哈哈哈哈哈行昂 </p>
                <i></i>
                </view>
                <span style="color: grey;"> 2020-09-07 17：17 </span>
            </li>
        </ul>
    </view>
</template>

<script>


export default {
    date(){
        return {
            items: [{
                avatarUrl:"aaassd",
                nickname:"小陈小陈早睡觉"
                
            }]
        }
    }
}
</script>

<style lang="scss">
    .content {
        background: #E0E0E0;
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        font-size: 30rpx;
        font-family: Microsoft Yahei;
        .header {
            top: 0;
            height: 100rpx;
            background:white
        }
        .collections {
            overflow: hidden;
            background: #E0E0E0;
            position: absolute;
            top: 110rpx;
            bottom: 0;
            width: 100%;
            padding: 0;
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
                    // position: relative;
                    // background:#f1eaea;
                    // margin-top:25rpx;
                    // margin-left: 7%;
                    position: absolute;
                    height: 60rpx;
                    width: 619rpx;
                    padding: 12rpx 33rpx 30rpx 17rpx;
                    left: 40rpx;
                    top: 22rpx;
                    background:#f1eaea;
                    .question {
                    display:-webkit-box;
                    height: 70rpx;
                    width:540rpx;
                    z-index: -1;
                    word-break: break-all;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    -webkit-line-clamp: 2;
                    }
                    i{
                    background: url('/static/navTo.png') center center;
                    //background-size:20rpx,20rpx;
                    width: 30rpx; 
                    height: 30rpx;
                    display: block; 
                    position: absolute;
                    right: 18rpx;
                    bottom: 16rpx;
                    }
                }
                span{
                    display: block;
                    position: absolute;
                    left:40rpx;
                    bottom:20rpx;
                }
                
            }
        }
    }
</style>