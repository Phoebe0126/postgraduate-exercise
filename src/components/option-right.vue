<template>
  <view class="option-right-wrapper">
    <view class="two-tips">
      <text class="alone-tick">单选题</text>
      <text class="right-rate">正确率：74%</text>
    </view>
  </view>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.option-right-wrapper{
    .two-tips {
        font-size: 22rpx;
        color: #fff;
        margin-left: 20rpx;
        margin-top: 5rpx;
        margin-bottom: 5rpx;
        .alone-tick{
            background: #c9a2a2;
            padding-left: 15rpx;
            padding-right: 15rpx;
            margin-right: 5rpx;
        }
        .right-rate{
            background: #a3c1a3;
            padding-left: 15rpx;
            padding-right: 15rpx;
        }
    }
}

</style>
