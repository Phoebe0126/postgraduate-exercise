<template>
  <view class="topic-wrapper">
      {{ text }}
  </view>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="scss" scoped>
.topic-wrapper {
    padding: 20rpx;
    font-family: Microsoft Yahei;
    font-size: 30rpx;
}
</style>