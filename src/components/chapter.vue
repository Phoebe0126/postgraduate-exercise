<template>
  <view class="chapter-wrapper">
      <view class="chapter-details">
        <text class="chapter-title">第{{ chapterNumber }}章 {{ chapter }}</text>
        <text class="problem-fraction">{{ doneNum }}题/{{ totalNum }}题</text>
      </view>
      <hr :class="['line', bordeColor[subject]]">
  </view>
</template>

<script>
import { BORDER_COLOR } from '../consts/const';

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
            bordeColor: BORDER_COLOR
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
    font-size: 25rpx;
    background: #fff;
    margin-top: 60rpx;
    margin-bottom: 40rpx;
    margin-left: 40rpx;
    margin-right: 40rpx;
  }
  .chapter-details{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .chapter-title{
    font-family: Microsoft Yahei;
    color: #000;
    text-align: left;
    padding-left: 15rpx;
    font-weight: bold;
  }
  .problem-fraction{
    font-family: Mcrosoft Yahei;
    font-size: 20rpx;
    color: #aaadc2;
    padding-right: 15rpx;
  }
  .line{
    margin-top: 6rpx;
  }
</style>