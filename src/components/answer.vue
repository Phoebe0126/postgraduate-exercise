<template>
  <view class="answer-wrapper">
      <view class="user-answer">你的答案: 
          <text :class="['option-user', isCorrect ? '' : 'option-wrong-user']">{{ userAnswerStr || '偷懒没做答！哼！' }}</text>
      </view>
      <view class="correct-answer">正确答案: 
          <text class="option-correct">{{ correctAnswer }}</text>
      </view>
  </view>
</template>

<script>
export default {
    props: {
        userAnswer: {
            type: Array,
            default: []
        },
        correctAnswer: {
            type: String,
            default: ''
        },
        isCorrect: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        userAnswerStr () {
            return this.userAnswer.sort().join('');
        }
    }
}
</script>

<style lang="scss" scoped>
.answer-wrapper {
    padding: 10rpx 20rpx;
    display: flex;
    justify-content: space-between;
    font-size: 30rpx;
    .option-user {
        color: #4caa90;
        margin-left: 10rpx;
    }
    .option-wrong-user {
        color: #ce8b8b
    }
    .option-correct {
        color: #4caa90;
        margin-left: 10rpx
    }
}
</style>