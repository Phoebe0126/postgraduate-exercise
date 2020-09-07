<template>
  <view class="progress-wrapper">
    <view class="grogress-box">
      <progress activeColor="#a0bfc0" percent="40" stroke-width="5"/>
    </view>
    <view>1/20</view>
  </view>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
  .progress-wrapper{
      padding-left: 20rpx;
      padding-right: 20rpx;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      .progress-box{
        box-sizing: border-box;
      }
  } 
</style>