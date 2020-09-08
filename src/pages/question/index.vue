<template>
  <view class="question-wrapper" v-if="questionReady">
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
      <!-- 答案 -->
      <answer
        :userAnswer="userAnswer"
        :correctAnswer="questions[index].answer"
        :isCorrect="isCorrect"
        v-if="isConfirm"
      ></answer>
      <!-- 确认按钮 -->
      <button class="confirm-btn btn" @click="confirmAnswer(false)" v-show="!isConfirm">确认</button>
      <!-- 切换题目 -->
      <view class="change-ques">
            <button :class="['pre-btn', 'btn', index === 0 ? 'btn-disabled' : '']" @click="changeToPre" v-show="isConfirm" :disabled="index === 0">上一题</button>
            <button class="next-btn btn" @click="changeToNext" v-show="isConfirm" :disabled="index === questions.length - 1">下一题</button>
      </view> 
      <!-- 线条 -->
      <view class="line"  v-show="isConfirm"></view>
      <view class="tabs-block" v-show="isConfirm">
           <!-- 选择项 -->
            <view class="tabs">
                <uni-segmented-control
                    :current="current"
                    :values="tabs"
                    active-color="#c9a2a2"
                    @clickItem="changeTab"
                    style-type="text"
                ></uni-segmented-control>
            </view>
            <!-- 显示的内容 -->
            <view class="tab-content">
                <!-- 解析 -->
                <view v-if="current === 0" class="tips">
                    <view class="title">解析</view>
                    <view class="tip">{{ questions[index].tip }}</view>
                </view>
                <!-- 笔记 -->
                <view v-else class="note" @click="naviToEditNotePage">
                    <view>
                        <i class="iconfont">&#xe60f;</i>
                    </view>
                   <view class="text">点击发表笔记</view>
                   <view class="text">优质的笔记会在前排显示哦</view>
                </view>
            </view>
      </view>
  </view>
</template>

<script>
import Topic from '@/components/topic';
import VOption from '@/components/option';
import Answer from '@/components/answer';
import Progress from '@/components/progress';
import OptionRight from '@/components/option-right';
import { QUESTION_NAVBAR_TITLE, TABS_TITLE } from '../../consts/const';
import { uniSegmentedControl } from "@/components/uni-segmented-control";
import { getRandomQuestions } from '../../api/question';
import { setMarkDone, setMarkFaulty } from '../../api/record';

export default {
    components: {
        Topic,
        VOption,
        Answer,
        Progress,
        OptionRight,
        uniSegmentedControl
    },
    data () {
        return {
            // 题目
            questions: [],
            // 当前题目的下标
            index: 0,
            // 答题类型 0---模考、1---其他
            questionType: 0,
            title: QUESTION_NAVBAR_TITLE,
            questionReady: false,
            quesNumber: 0,
            // 题目选项
            options: [],
            // 用户的答案
            userAnswer: [],
            // 用户是否确认
            isConfirm: false,
            // 判断答案对错
            isCorrect: true,
            // 答案确认之后的样式
            confirmStyle: [],
            // 当前选中的选项卡
            current: 0,
            // tabs名称
            tabs: TABS_TITLE,
            // 用户选过的答案
            choosedAnswers: [],
            // 选项的背景颜色
            bgColors: ['', '', '', '']
        }
    },
    onLoad(query) {
        const arr = ['chapter', 'smart', 'random', 'wrong'];
        const index = arr.indexOf(query.type);

        // 设置标题
        uni.setNavigationBarTitle({
            title: this.title[index]
        });
        // 随机练习
        if (index !== 1) {
            this.questionType = 1;
            this.getRandomQuestions();
        }
    },
    onShow() {
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
        // 跳到下一题
        changeToNext () {
            this.resetData();
            // 如果该题已经做过
            if (this.choosedAnswers[this.index + 1]) {
                this.index += 1;
                this.userAnswer = this.choosedAnswers[this.index];

                this.confirmAnswer(true);
            } else {
                // 重置
                this.index += 1;
            }
            this.setOptions();
        },
        // 跳转到上一题
        changeToPre () {
            // 重置
            this.resetData();
            this.index -= 1;
            this.setOptions();

            // 默认做过

            this.userAnswer = this.choosedAnswers[this.index];
            this.confirmAnswer(true);
        },
        // 重置数据
        resetData () {
            this.isConfirm = false;
            this.userAnswer = [];
            this.current = 0;
            this.confirmStyle = [];
            this.bgColors = ['', '', '', ''];
        },
        getRandomQuestions () {
            getRandomQuestions()
            .then(res => {
                if (res.code === 0) {
                    this.questions = res.data;
                    this.setOptions();
                }
                this.questionReady = true;
            })
            .catch(err => {
                uni.showToast({
                    title: err,
                    icon: 'none'
                });
                this.questionReady = true;
            })
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
        // 确认答案
        confirmAnswer (isDone = false) {

            // 还未选择答案
            if (this.userAnswer.length === 0) {
                uni.showToast({
                    title: '该题还未作答哦~',
                    icon: 'none'
                });
                return;
            }
            // 判断答案是否正确
            const correctAnswer = this.questions[this.index].answer;
            // 添加进已选答案
            this.choosedAnswers.splice(this.index, 1, this.userAnswer);
            // 判断正误
            this.isCorrect = this.userAnswer.sort().join('') === correctAnswer ? true : false;
            // 设置选项样式
            const style = new Array(4).fill('');
            const ans = ['A', 'B', 'C', 'D'];
            // 正确答案
            ans.forEach((val, index) => {
                if (correctAnswer.includes(val)) {
                    style[index] = 'option-color-unchoose';
                }
            })

            // 错误答案
            this.userAnswer.forEach(val => {
                style[ans.indexOf(val)] = correctAnswer.includes(val) ? 'option-color-correct' : 'option-color-wrong';
            })


            this.confirmStyle = style;
            this.isConfirm = true;
            console.log(isDone)
            // 发起请求
            if (!isDone) {
                const question = this.questions[this.index];
                const params = {
                    openID: getApp().globalData.openID,
                    subject: question.subject,
                    chapterNumber: question.chapterNumber,
                    type: question.type,
                    quesNumber: question.quesNumber
                }
                if (this.isCorrect) {
                    this.setMarkDone(params);
                } else {
                    this.setMarkFaulty(params);
                }
            }
        },
        // 做错
        setMarkFaulty (params) {
            console.log('错', params)
            setMarkFaulty(params)
            .then(res => {
                if (res.code !== 0) {
                    uni.showToast({
                        title: '出错了，请重试~',
                        icon: 'none'
                    });
                }
            })
        },
        // 做对
        setMarkDone (params) {
            console.log('对', 'params')
            setMarkDone(params)
            .then(res => {
                if (res.code !== 0) {
                    uni.showToast({
                        title: '出错了，请重试~',
                        icon: 'none'
                    });
                }
            })
        },
        // 切换tab
        changeTab () {
            this.current = this.current === 0 ? 1 : 0;
        },
        // 跳转到笔记页面
        naviToEditNotePage () {
            uni.navigateTo({
                url: '../edit-note/index'
            });
        }
    }

}
</script>

<style lang="scss" scoped>

.question-wrapper {
    margin: 10rpx auto;
    font-family: Microsoft Yahei;
    .change-ques {
        display: flex;
        .btn {
            margin: 30rpx;
        }
        .pre-btn {
            flex: 1;
        }
        .next-btn {
            flex: 1;
        }
    }
    .btn {
        background: #ce8b8b;
        margin: 100rpx auto;
        width: 500rpx;
        font-size: 30rpx;
        color: #fff;
        // box-shadow: 5rpx 5rpx 2rpx 2rpx rgba(206, 139, 139, .6);
    }
    .btn-disabled {
        background: #ccc;
        color: #444;
    }
    .line {
        width: 100%;
        box-sizing: border-box;
        height: 10rpx;
        background: #eee;
    }
    .tabs-block {
        margin-top: 20rpx;
        .tab-content {
            padding: 10rpx;
            // 解析
            .tips {
                padding: 0 20rpx;
                font-size: 25rpx;
                .title {
                    padding-left: 10rpx;
                    border-left: 5rpx solid #c9a2a2;
                }
                .tip {
                    margin: 20rpx 0;
                }
            }
            .note {
                font-size: 30rpx;
                padding: 20rpx 0;
                color: #a7a7a7;
                text-align: center
            }
        }
    }
}
</style>