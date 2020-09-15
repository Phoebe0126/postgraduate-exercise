<template>
  <view class="note-edit-wrapper">
      <textarea class="form-item" v-model="text" placeholder-style="color:#999" focus maxlength="*" disable-default-padding  placeholder="请输入你的笔记..."/>
      <view class="tip">温馨提示: 可以在个人信息页面查看和修改自己的笔记哦~</view>
      <button class="confirm-btn btn" @click="confirmEditNote()">发表笔记</button>
  </view>
</template>

<script>
import { addNote } from '../../api/note';

export default {
  data () {
    return {
      text: '',
      id: -1
    }
  },
  methods: {
    confirmEditNote () {
      if (this.text === '') {
        uni.showToast({
          title: '您还未输入笔记哦',
          icon: 'none'
        });
        return;
      }
      addNote({
        openID: getApp().globalData.openID,
        id: this.id,
        note: this.text
      })
      .then(res => {
        if (res.code === 0) {
          uni.showToast({
            title: '笔记保存成功',
            icon: 'none'
          });
          setTimeout(() => {
            uni.showLoading({
              title: '加载中'
            });
            uni.navigateBack();
          }, 1000);
        } else {
          uni.showToast({
            title: err.errMsg,
            icon: 'none'
          });
        }
      })
      .catch(err => {
         uni.showToast({
            title: err.errMsg,
            icon: 'none'
         });
      })
    },
    onLoad (query) {
      this.id = query.id;
      this.text = query.text;
    }
  }
}
</script>

<style lang="scss" scoped>
.note-edit-wrapper {
      font-size: 30rpx;
      width: 100%;
      box-sizing: border-box;
  .form-item {
      margin: 30rpx auto;
      height: 300rpx;
      background: #eee;
      border-radius: 5rpx;
      padding: 5rpx;
      width: 92%;
  }
  .tip {
    padding: 30rpx;
    font-size: 26rpx;
  }
  .btn {
    background: #ce8b8b;
    margin: 50rpx auto;
    width: 400rpx;
    color: #fff;
    font-size: 30rpx;
    border-radius: 50rpx;
    box-shadow: 0rpx 12rpx 10rpx #d4b2b2;  //下阴影
    transition: .3s ease-out;
  }
  .btn:hover{
    width: 410rpx;
    }
  .btn::after{
    border: none;
  }
}
</style>