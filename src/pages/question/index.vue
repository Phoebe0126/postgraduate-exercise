<template>
  <view class="question-wrapper">
      <!-- 题干 -->
      <topic :text="text"></topic>
      <!-- 选项 -->
      <Option 
        :options="options" 
        @changeOption="changeOption" 
        :isConfirm="isConfirm"
        :confirmStyle="confirmStyle"
      ></Option>
      <!-- 答案 -->
      <answer
        :userAnswer="userAnswer"
        :correctAnswer="correctAnswer"
        :isCorrect="isCorrect"
        v-if="isConfirm"
      ></answer>
      <!-- 确认按钮 -->
      <button class="confirm-btn" @click="confirmAnswer">确认</button>
  </view>
</template>

<script>
import Topic from '@/components/topic';
import Option from '@/components/option';
import Answer from '@/components/answer';
import { QUESTION_NAVBAR_TITLE } from '../../consts/const';

export default {
    components: {
        Topic,
        Option,
        Answer
    },
    data () {
        return {
            // 题干
            text: '经济建设是全党的中心工作，坚持以经济建设为中心不动摇，就必须坚持以经济体制改革为重点不动摇。当前，我国深化经济体制改革的重点是',
            // 答题类型 0---模考、1---其他
            questionType: 0,
            title: QUESTION_NAVBAR_TITLE,
            // 题目选项
            options: [{
                letter: 'A',
                text: '筑牢现代化经济体系的坚实基础'
            }, {
                letter: 'B',
                text: '筑牢现代化经济体系的坚实基础'
            }, {
                letter: 'C',
                text: '筑牢现代化经济体系的坚实基础'
            }, {
                letter: 'D',
                text: '筑牢现代化经济体系的坚实基础'
            }],
            // 用户的答案
            userAnswer: [],
            // 正确答案
            correctAnswer: 'ABC',
            // 用户是否确认
            isConfirm: false,
            // 判断答案对错
            isCorrect: true,
            // 答案确认之后的样式
            confirmStyle: []
        }
    },
    onLoad(query) {
       
        const arr = ['chapter', 'smart', 'random', 'wrong'];
        const index = arr.indexOf(query.type);

        // 设置标题
        uni.setNavigationBarTitle({
            title: this.title[index]
        });

        if (index !== 1) {
            this.questionType = 1;
        }
    },
    onShow() {
        uni.hideLoading();
    },
    methods: {
        changeOption (charCode, isCancel) {
            const char = String.fromCharCode(charCode);

            if (isCancel) {
                this.userAnswer.splice(this.userAnswer.indexOf(char), 1);
            } else {
                this.userAnswer.push(char);
            }
        },
        // 确认答案
        confirmAnswer () {
            console.log(this.isConfirm)
            // 判断答案是否正确
            this.isCorrect = this.userAnswer.sort().join('') === this.correctAnswer ? true : false;
            // 设置选项样式
            const style = new Array(4).fill('');
            const ans = ['A', 'B', 'C', 'D'];
            this.userAnswer.forEach(val => {
                style[ans.indexOf(val)] = this.correctAnswer.includes(val) ? 'option-color-correct' : 'option-color-wrong';
            })
            this.confirmStyle = style;
            this.isConfirm = true;
        }
    }

}
</script>

<style lang="scss" scoped>
.question-wrapper {
    margin: 10rpx auto;
    .confirm-btn {
        background: #ce8b8b;
        margin: 100rpx auto;
        width: 500rpx;
        font-size: 30rpx;
        color: #fff;
        border-radius: 20rpx;
    }
}
</style>