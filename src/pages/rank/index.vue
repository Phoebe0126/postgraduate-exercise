<!--
 * @Author: your name
 * @Date: 2020-09-11 19:32:51
 * @LastEditTime: 2020-09-14 09:21:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \postgraduate\src\pages\rank\index.vue
-->
<template>
<view class="rank-wrapper">
    <!-- 导航栏 -->
    <view class="nav">

    </view>

    <!-- 用户列表 -->
    <view class="user-list">
        <view class="userinfo" >
            <view class="ranking">
                1
            </view>
            <view class="avatar">
                <image src="https://thirdwx.qlogo.cn/mmopen/vi_32/oUicWDFmZmf8qgfY0NLmIwedj9uDt28tUpIsadMjbQwC2IhQBgzphWY83CWiaaxteQ4XR07kvicvrUibkFdaQqBzLg/132" mode="aspectFill">
                 <!-- <image src="avatarUrl" mode="aspectFill"  />  -->
            </view>
            <view class="info">
                <text class="nickname">小陈小陈早点睡觉小陈小陈早点睡觉</text>
                <text class="number">58542题</text>
            </view>
        </view>

    </view>

</view>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>

.nav {
    width: 100%;
    height: 100rpx;
    background-color: palegoldenrod;
}

.userinfo{
    width: 100%;
    height: 150rpx; 
    //background: rgb(167, 67, 67);
    border-style: solid;
    border-width: 1px 0;
    border-color: #f0f0f0;
    display: flex;
    align-items: center;

    .ranking{
        //float: left;
        fnot-size:28rpx;
        font-color:black;
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
        // uni-icons {
        //     width: 80rpx; 
        //     height: 80rpx;
        //     position: absolute;
        //     left: 10rpx; 
        //     top: 5rpx;
        // }
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

</style>