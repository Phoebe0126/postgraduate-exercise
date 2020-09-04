<template>
  <view class="chapter-wrapper">
      <view class="chapter_details">
        <text class="chapter_title">第一章   绪论</text>
        <text class="problem_fraction">43题/368题</text>
      </view>
      <hr class="line">
  </view>
</template>

<script>
export default {

}
</script>

<style>
  .chapter-wrapper{
    background: #fff;
    margin-top: 60rpx;
    margin-bottom: 40rpx;
    margin-left: 40rpx;
    margin-right: 40rpx;
  }
  .chapter_details{
    display: flex;
    justify-content: space-between;
  }
  .chapter_title{
    font-family: Microsoft Yahei;
    font-size:30rpx;
    color: #000;
    text-align: left;
    padding-left: 15rpx;
  }
  .problem_fraction{
    font-family: Mcrosoft Yahei;
    font-size: 25rpx;
    color: #aaadc2;
    padding-right: 15rpx;
  }
  .line{
    margin-top: 6rpx;
    border-top: 4rpx solid #aaadc2;
  }
</style>