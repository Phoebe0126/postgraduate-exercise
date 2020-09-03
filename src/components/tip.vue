<template>
  <view class="tip-wrapper">
    <image class="img1" src="../static/tip_img/begin_description.png">
    <text class="little_title">宝典说明</text>
    <br/>
    <view class="tips">
     <image class="img2" src="../static/tip_img/begin_point.png">
     <view class="list">
       <view>1、本题库涵盖考研政治选择题所有知识点</view>
       <view>2、模考刷题：模拟考试+刷题目（实践）</view>
       <view>3、别人还没复习，你已经拥有选择题40+资本</view>
     </view>
    </view>
   
  </view>
</template>

<script>
export default {
    
}
</script>

<style>
  .tip-wrapper{
    background: #fff;
    font-family: Microsoft Yahei;
    font-size: 26rpx;
    color: #886d6d;
    position: relative;
    text-align: center;
    margin-left: 40rpx;
    margin-right: 40rpx;
    margin-top: 40rpx;
    margin-bottom: 40rpx;
    padding-top: 25rpx;
    padding-bottom: 30rpx;
  }
  .little_title{
    font-size: 35rpx;
  }
  .list{
    left: 300rpx;
    text-align: left;
    padding-left: 70rpx;
    letter-spacing: 3rpx;
    line-height: 38rpx;
    padding-top: 25rpx;
  }
  .img1{
    width: 45rpx;
    height: 45rpx;
  }
  
  .img2{
    width: 28rpx;
    height: 105rpx;
    position: absolute;
    left: 30rpx;
    padding-top: 30rpx;
  }
 


</style>