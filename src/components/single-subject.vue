<template>
  <view class="single-subject-wrapper">
      <view class="info" @click="changeIsShow">
          <view class="title">{{ subjectTitle[index] }}</view>
          <view :class="['questions', subjectColor[index]]">
              <text class="doneNum">{{ doneNum }}题/{{ totalNum }}题</text>
          </view>
      </view>
      <view :class="['line', borderColor[index]]"></view>
      <view class="line-process" v-if="isShow">
        <view :class="['rate-block', subjectColor[index]]">
          <view class="rate process-rate">学习进度：{{ process }}%</view>
          <view class="rate correct-rate">考点正确率: {{ correctRate }}%</view>
        </view>
        <view class="study">
          <view :class="['btn', backgroundColor[index]]" @click="naviToChapterPage">{{ doneNum !== 0 ? '继续学习' : '开始学习'}}</view>
        </view>
      </view>
  </view>
</template>

<script>
import { SUBJECT_COLOR, BORDER_COLOR, BG_COLOR, SUBJECT_TITLE } from '../consts/const.js';

export default {
  props: {
    index: {
      type: Number,
      default: 2
    },
    doneNum: {
      type: Number,
      default: 0
    },
    totalNum: {
      type: Number,
      default: 0
    },
    process: {
      type: Number,
      default: 0
    },
    correctRate: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      subjectColor: SUBJECT_COLOR,
      borderColor: BORDER_COLOR,
      backgroundColor: BG_COLOR,
      subjectTitle: SUBJECT_TITLE,
      // 是否展示下方區域
      isShow: false
    }
  },
  methods: {
    changeIsShow () {
      this.isShow = !this.isShow;
    },
    // 切换到对应科目的章节列表页面
    naviToChapterPage () {
      this.$emit('naviToChapterPage', this.index);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../uni.scss";

.single-subject-wrapper {
  margin: 40rpx 0;
  .info {
    display: flex;
    justify-content: space-between;
    font-size: 39rpx;
    font-family: Microsoft Yahei;
    align-items: center; 
    .title {
      color: #000;
      font-weight: bold;
    }
    .questions {
      font-size: 26rpx;
    }
  }
  .line {
    margin: 10rpx 0 20rpx 0;
    width: 100%;
  }
  .line-process {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 32rpx;
    margin-top: 30rpx;
    .rate-block {
     .rate {
        margin-bottom: 10rpx;
     }
    }
    .study {
      .btn {
        color: #fff;
        padding: 5rpx 25rpx;
      }
    }
  }
}
</style>