<template>
  <view class="option-right-wrapper" >
    <view class="two-tips">
      <text class="alone-tick">{{ typeText }}选题</text>
      <text class="right-rate">正确率：74%</text>
      <v-clock class="clock" @clockend="clockend" ref="clock"></v-clock>
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
      }
   },
  computed: {
    typeText () {
      return this.type === 1 ? '单' : '多';
    }
  },

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
