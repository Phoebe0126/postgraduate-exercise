<template>
  <view class="smart-test-wrapper" v-if="questionReady">
      <!-- 题干 -->
      <topic :text="`${index + 1}. ${questions[index].question}`"></topic>
      <!--进度条-->
      <progress
        :currentIndex="index + 1"
        :totalNum="questions.length"
      ></progress>
       <!--单选 正确率-->
      <option-right
        :type="questions[index].type"
        :correctRate="questions[index].correctRate"
        :quesId="questions[index].id"
        :moduleType="2"
      ></option-right>
        <!-- 选项 -->
        <v-option 
        :options="options" 
        @changeOption="changeOption" 
        :isConfirm="isConfirm"
        :confirmStyle="confirmStyle"
        :bgColors="bgColors"
        :type="questions[index].type"
        ></v-option>
        <!-- 切换题目 -->
        <view class="change-ques">
            <button :class="['pre-btn', 'btn']" @click="changeToPre" v-show="!isConfirm && index !== 0" >上一题</button>
            <button :class="[index === 0 ? '' : 'next-btn', 'btn']" @click="changeToNext" v-show="!isConfirm && index < questions.length - 1" >下一题</button>
            <!-- 确认按钮 -->
            <!-- <button class="complete-btn btn" @click="confirmAnswer" v-if="!isConfirm && index === questions.length - 1">已完成</button> -->
            <button :class="['next-btn', 'btn']" @click="confirmAnswer" v-show="!isConfirm && index === questions.length - 1" >完成</button>
        </view> 
  </view>
</template>

<script>
import Topic from '@/components/topic';
import Progress from '@/components/progress';
import VOption from '@/components/option';
import { getSimulation } from '../../api/question';
import OptionRight from '@/components/option-right';

export default {
    components: {
        Topic,
        Progress,
        OptionRight,
        VOption
    },
    data () {
        return {
            questions: [],
            index: 32,
            questionReady: false,
            options: [],
            // 选项的背景颜色
            bgColors: ['', '', '', ''],
            userAnswer: [],
            isConfirm: false,
            confirmStyle: [],
            choosedAnswers: []
        }
    },
    onLoad () {
        getSimulation()
        .then(res => {
            if (res.code === 0) {
                this.questions = res.data.single.concat(res.data.plural);
                this.questionReady = true;
                this.setOptions();
            }
        })
        .catch(err => {
            uni.showToast({
                title: err,
                icon: 'none'
            });
        })
    },
    onShow () {
        uni.hideLoading();
    },
    methods: {
        // 设置选项
        setOptions () {
            let arr = [];
            for (let i = 0; i < 4; i++) {
                let char = String.fromCharCode('A'.charCodeAt(0) + i);
                arr.push({
                    letter: char,
                    text: this.questions[this.index][char].split('.')[1]
                })
            }
            this.options = arr;
        },
        changeOption (index) {
            // 单选
            if (this.questions[this.index].type === 1) {
                this.bgColors.forEach((val, i) => {
                    if (i !== index) {
                        this.bgColors.splice(i, 1, '');
                        const ch = String.fromCharCode('A'.charCodeAt(0) + i);
                        if (this.userAnswer.includes(ch)) {
                            this.userAnswer.splice(this.userAnswer.indexOf(ch), 1);
                        }
                    }
                })
            }

            this.bgColors.splice(index, 1, this.bgColors[index] ? '' :'choose-bg-color');

            const char = String.fromCharCode('A'.charCodeAt(0) + index);

            const isCancel = !this.bgColors[index];

            if (isCancel) {
                this.userAnswer.splice(this.userAnswer.indexOf(char), 1);
            } else {
                this.userAnswer.push(char);
            }
        },
        // 重置数据
        resetData () {
            this.userAnswer = [];
            this.bgColors = ['', '', '', ''];
        },
        changeToPre () {
            this.choosedAnswers.splice(this.index, 1, this.userAnswer);
            this.index -= 1;
            this.resetData();
        },
        changeToNext () {
            this.choosedAnswers.splice(this.index, 1, this.userAnswer);
            this.index += 1;
            this.resetData();
        },
        confirmAnswer () {
            console.log(this.choosedAnswers)
            uni.showModal({
                title: '温馨提示',
                content: '确定提交答题卡么？',
                confirmText: '确定提交',
                cancelText: '检查试卷',
                cancelColor: '#000',
                confirmColor: '#000',
                success: function(res) {
                    if (res.confirm){
                        console.log('用户点击了确定提交')
                    }else if (res.cancel){
                        console.log('用户点击了检查试卷')
                    }
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.smart-test-wrapper {
    margin: 10rpx auto;
    font-family: Microsoft Yahei;
    .change-ques {
        display: flex;
        .pre-btn {
            flex: 1;
            margin: 30rpx;
        }
        .next-btn {
            flex: 1;
            margin: 30rpx;
        }
        .complete-btn {
            flex: 1;
            margin: 30rpx;
        }
    }
    .btn {
        background: #ce8b8b;
        margin: 60rpx auto;
        width: 500rpx;
        font-size: 30rpx;
        color: #fff;
        border-radius: 50rpx;
        box-shadow: 0rpx 12rpx 10rpx #d4b2b2;  //下阴影
        transition: .3s ease-out;
    }
    .btn:hover{
       width: 510rpx;
    }
    .btn::after{
        border: none;
    }
}
</style>