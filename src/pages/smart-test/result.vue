<template>
  <view class="result-wrapper">
      <view class="answer-tips">
          <view class="text">答题卡</view>
          <view class="bomb-tips">
              <i></i>
              <text>tips: 点击题号查看对应解析</text>
          </view>
      </view>
      <view class="answer-block">
          <view class="ques-block" v-for="(item, index) in quesArr" :key="index">
              <text>{{ index + 1 }}</text>
              <i>×</i>
          </view>
      </view>
  </view>
</template>

<script>
export default {
   data () {
       return {
           quesArr: getApp().globalData.resultArr
       }
   }
}
</script>

<style lang="scss" scoped>
.result-wrapper {
    .answer-tips {
        padding: 10rpx 20rpx;
        font-size: 30rpx;
        display: flex;
        justify-content: space-between;
        .bomb-tips {
            font-size: 25rpx;
            color: orange;
        }
    }
    .answer-block {
        margin: 20rpx auto;
        padding-top: 20rpx;
        padding-bottom: 20rpx;
        border-radius: 10rpx;
        width: 650rpx;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        box-shadow: 3rpx 4rpx 10rpx 5rpx rgba(0, 0, 0, .1);
        .ques-block {
            width: 130rpx;
            box-sizing: border-box;
            text-align: center;
            margin-bottom: 10rpx;
            margin-top: 10rpx;
        }
    }
}
</style>