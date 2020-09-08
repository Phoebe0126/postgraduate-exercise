<template>
  <view class="chapter-wrapper">
      <view class="chapter-details">
        <view class="chapter-title"><view class="chapter-number">第{{ chapterNumber }}章</view> <br/> {{ chapter }}</view>
        <text class="problem-fraction">{{ doneNum }}题/{{ totalNum }}题</text>
      </view> 
      <view :class="['line', bordeColor[subject]]"></view>
  </view>
</template>

<script>
import { BG_COLOR } from '../consts/const';

export default {
    props: {
        chapterNumber: {
            type: Number,
            default: 1
        },
        chapter: {
            type: String,
            default: '的擦'
        },
        doneNum: {
            type: Number,
            default: 0
        },
        totalNum: {
            type: Number,
            default: 0
        },
        subject: {
            type: Number,
            default: 0
        }        

    },
    data () {
        return {
            bordeColor: BG_COLOR
        }
    },
    methods: {
        naviToProblemPage () {
            console.log(111)
            this.$emit('naviToProblemPage', this.chapterNum);
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../uni.scss";

  .chapter-wrapper{
    margin-left: 20rpx;
    margin-right: 20rpx;
   // margin-top: 10rpx;
    margin-bottom: 30rpx;
    padding-bottom: 20rpx;
    padding-top: 20rpx;
    background: #fff;
    border-radius: 25rpx;

     .chapter-details{
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: Microsoft Yahei;

        .chapter-title{  
        font-size:35rpx;
        color: #000;
        text-align: left;
        padding-left: 15rpx;
        width: 500rpx;
        .chapter-number{
          font-weight: bold;
        }
        }
        .problem-fraction{
        font-size: 30rpx;
        color: #aaadc2;
        padding-right: 15rpx;
        }
     }
     .line{
        height: 5rpx;
        margin-left: 15rpx;
        margin-right: 15rpx;

      }
  }
</style>