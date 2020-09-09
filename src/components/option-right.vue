<template>
  <view class="option-right-wrapper" >
    <view class="two-tips">
      <text class="alone-tick">{{ typeText }}选题</text>
      <text class="right-rate">正确率：{{ correctRate }}%</text>
      <v-clock class="clock" @clockend="clockend" ref="clock"></v-clock>
    </view>
    <view class="collect" @click="changeCollectStatus">
      <i class="iconfont" v-if="!isCollected">&#xe83f;</i>
      <i class="iconfont heart-red" v-else>&#xe85c;</i>
      <text>收藏题目</text>
    </view>
  </view>
</template>

<script>
import VClock from '@/components/clock';
export default {
  components: {
    VClock
  },
  methods: {
    clockend(res){
      console.log(res)
    },
  },
   mounted(){
    //console.log(this.$refs.clock);
    this.$refs.clock.start(); 
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
      isCollected: {
        type: Boolean,
        default: false
      }
   },
  computed: {
    typeText () {
      return this.type === 1 ? '单' : '多';
    }
  },
  methods: {
    changeCollectStatus () {
      console.log(this.isCollected);
      this.$emit('changeCollectStatus', !this.isCollected);
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
        font-size: 28rpx;
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
    .collect {
      color: #999;
      display: flex;
      align-items: center;
      .iconfont {
        font-size: 28rpx;
      }
      .heart-red {
        color:red;
      }
    }
}

</style>
