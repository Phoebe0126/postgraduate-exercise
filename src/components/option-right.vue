<template>
  <view class="option-right-wrapper" >
    <view class="two-tips">
      <text class="alone-tick">{{ typeText }}选题</text>
      <text class="right-rate" v-if="moduleType !== 2">正确率：{{ correctRate }}%</text>
      <view class="clock-block" v-else>
        <i class="iconfont">&#xe655;</i>
        <v-clock class="clock"  ref="clock"></v-clock>
      </view>
    </view>
    <view class="collect" @click="changeCollectStatus">
      <i class="iconfont" v-if="!isCollected && quesId">&#xe83f;</i>
      <i class="iconfont heart-red" v-else>&#xe85c;</i>
      <text>收藏题目</text>
    </view>
  </view>
</template>

<script>
import VClock from '@/components/clock';
import { checkIsCollected, collect, cancelCollection } from '../api/record';

export default {
  components: {
    VClock
  },
  methods: {
    clockend(res){
      this.$refs.clock.end();
    },
    changeCollectStatus () {
      // 收藏、取消收藏
      const params = {
          openID: getApp().globalData.openID,
          id: this.quesId
      };
      // 取反
      this.isCollected = !this.isCollected;

      if (this.isCollected) {
          // 收藏
          collect(params)
          .then(res => {
              if (res.code !== 0) {
                  uni.showToast({
                      title: res.msg,
                      icon: 'none'
                  });
                  return;
              }
              this.isCollected = true;
          })
          .catch(err => {
              uni.showToast({
                  title: err,
                  icon: 'none'
              });
          })
      } else {
          // 取消收藏
          cancelCollection(params)
          .then(res => {
              if (res.code !== 0) {
                  uni.showToast({
                      title: res.msg,
                      icon: 'none'
                  });
                  return;
              }
              this.isCollected = false;
          })
          .catch(err => {
              uni.showToast({
                  title: err,
                  icon: 'none'
              });
          })
      }
    },
    checkIsCollected () {
    // 请求题目是否收藏过
    checkIsCollected({
      openID: getApp().globalData.openID,
      id: this.quesId
    })
    .then(res => {
        if (res.code !== 0) {
          this.isCollected = false;
        } else {
          this.isCollected = res.data;
        }
    })
  },
  },
  mounted(){
    if (this.moduleType === 2) {
       this.$refs.clock.start(); 
    }
  },
  props: {
      type: {
        type: Number,
        default: 1
      },
      correctRate: {
        type: Number,
        default: 0
      },
      quesId: {
        type: Number,
        default: -1
      },
      moduleType: {
        type: Number,
        default: 0
      },
      isConfirm: {
        type: Boolean,
        default: false
      }
   },
   watch: {
    quesId: {
       immediate: true,
       handler () {
         this.checkIsCollected();
      }
    },
    isConfirm: {
      immediate: true,
      handler (val) {
        if (val) {
          this.clockend();
        }
      }
    }
   },
  data () {
    return {
      isCollected: false
    }
  },
  computed: {
    typeText () {
      return this.type === 1 ? '单' : '多';
    }
  }
}
</script>

<style lang="scss" scoped>
.option-right-wrapper{
    margin-top: 20rpx;
    display: flex;
    justify-content: space-between;
    font-size: 30rpx;
    padding: 10rpx 20rpx;
    align-items: center;
    .two-tips {
        color: #fff;
        margin-top: 5rpx;
        margin-bottom: 5rpx;
        font-size: 26rpx;
        display: flex;
        .alone-tick{
            background: #c9a2a2;
            padding-left: 15rpx;
            padding-right: 15rpx;
            margin-right: 20rpx;
        }
        .right-rate{
            background: #a3c1a3;
            padding-left: 15rpx;
            padding-right: 15rpx;
        }
        .clock-block {
          display: flex;
          color: #db9873;
          align-items: center;
          font-size: 30rpx;
          .clock {
            font-weight: bold;
          }
          .iconfont {
            font-size: 35rpx;
          }
        }
    }
    .collect {
      color: #999;
      display: flex;
      align-items: center;
      .iconfont {
        font-size: 30rpx;
        margin-right: 10rpx;
      }
      .heart-red {
        color:red;
        margin-right: 10rpx;
      }
    }
}

</style>
