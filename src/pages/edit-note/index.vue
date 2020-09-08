<template>
  <view class="note-edit-wrapper">
      <textarea class="form-item" placeholder-style="color:#999" focus maxlength="*" disable-default-padding @confirm="confirmNotes" placeholder="请输入你的笔记..."/>
      <button class="confirm-btn btn" @click="confirmEditNote()">确认</button>
  </view>
</template>

<script>
export default {
  methods: {
    confirmNotes (e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped>
.note-edit-wrapper {
  .form-item {
      margin: 30rpx 20rpx;
      font-size: 28rpx;
      height: 300rpx;
      background: #eee;
      border-radius: 5rpx;
      padding: 5rpx;
  }
  .btn {
    background: #ce8b8b;
    margin: 100rpx auto;
    width: 500rpx;
    font-size: 30rpx;
    color: #fff;
}
}
</style>