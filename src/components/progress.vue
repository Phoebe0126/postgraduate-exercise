<template>
  <view class="progress-wrapper">
    <view class="progress-box">
      <progress :percent="percent" stroke-width="5"/>
    </view>
    <view class="text">{{ currentIndex }}/{{ totalNum }}题</view>
  </view>
</template>

<script>
export default {
  props: {
    currentIndex: {
      type: Number,
      default: 1
    },
    totalNum: {
      type: Number,
      default: 100
    }
  },
  computed: {
    percent () {
      return this.currentIndex / this.totalNum * 100;
    }
  }
}
</script>

<style lang="scss" scoped>
  .progress-wrapper{
      padding-left: 20rpx;
      padding-right: 20rpx;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .progress-box{
        box-sizing: border-box;
        width: 85%;
      }
      .text {
        font-size: 25rpx;
        color: #999;
      }
  } 
</style>