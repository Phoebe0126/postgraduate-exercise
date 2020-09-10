<template>
  <view class="wrapper">
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
            :isConfirm="isConfirm"
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
                :userAnswer="choosedAnswers[index]"
                :correctAnswer="questions[index].answer"
                :isCorrect="isCorrect"
                v-if="isConfirm"
            ></answer>
            <!-- 切换题目 -->
            <view class="change-ques">
                <button :class="[isConfirm && index === questions.length -1 ? '' : 'pre-btn', 'btn']" @click="changeToPre" v-show="index > 0" >上一题</button>
                <button :class="[index === 0 ? '' : 'next-btn' , 'btn']" @click="changeToNext" v-show="index < questions.length - 1" >下一题</button>
                <!-- 确认按钮 -->
                <button :class="['next-btn', 'btn']" @click="confirmSubmit" v-show="!isConfirm && index === questions.length - 1" >完成</button>
            </view> 
        
    
            <view class="tabs-block" v-if="isConfirm">
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
                <view class="tab-content" v-if="questions.length > 0">
                    <!-- 解析 -->
                    <view v-if="current === 0" class="tips">
                        <view class="title">解析</view>
                        <view class="tip">{{ questions[index].tip }}</view>
                    </view>
                    <!-- 笔记 -->
                    <view v-else>
                    <note @getNote="getNote" :quesId="questions[index].id" :noteInfo="noteInfo"></note>
                    </view>
                </view>
            </view>
            <!-- 答题卡 -->
            <answer-sheet
                :choosedAnswers="choosedAnswers"
                @changeIndex="changeIndex"
                @exchangeAnswerSheet="showAnswerSheet"
                :showDetail="showDetail"
                :isConfirm="isConfirm"
                :isWrong="isWrong"
            ></answer-sheet>
    </view>
    <view class="fullopacity fullbg" v-if="showDetail" @click="hideAnswerSheet"></view>
  </view>

</template>

<script>
import Topic from '@/components/topic';
import Progress from '@/components/progress';
import VOption from '@/components/option';
import Note from '@/components/note';
import { getSimulation } from '../../api/question';
import OptionRight from '@/components/option-right';
import Answer from '@/components/answer';
import { TABS_TITLE } from '../../consts/const';
import { setMarkDone, setMarkFaulty, saveSimulationResult } from '../../api/record';
import { getNote } from '../../api/note';
import { uniSegmentedControl } from "@/components/uni-segmented-control";
import AnswerSheet from '@/components/answer-sheet';

export default {
    components: {
        Note,
        Topic,
        Progress,
        OptionRight,
        VOption,
        Answer,
        uniSegmentedControl,
        AnswerSheet
    },
    data () {
        return {
            questions: [],
            index: 0,
            questionReady: false,
            options: [],
            // 选项的背景颜色
            bgColors: ['', '', '', ''],
            userAnswer: [],
            isConfirm: false,
            confirmStyle: [],
            choosedAnswers: new Array(33).fill([]),
            current: 0,
            tabs: TABS_TITLE,
            noteInfo: null,
            showDetail: false,
            isWrong: []
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
    onShow() {
        uni.hideLoading();
        // 笔记编辑页返回请求笔记
        if (this.questions.length !== 0 && this.current === 1) {
            this.getNote();
        }
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
            if (this.isConfirm) {
                this.confirmStyle = [];
                this.bgColors = ['', '', '', ''];
            }
        },
        // 显示答题详情
        showAnswerSheet () {
            // 保存本次做题数据
            if (!this.isConfirm) {
                this.choosedAnswers.splice(this.index, 1, this.userAnswer);
            }
            this.showDetail = true;
        },
        // 隐藏答题详情 
        hideAnswerSheet () {
            this.showDetail = false;
        },
        // 跳转到相应的题目
        changeIndex (quesOrder) {

            this.showDetail = false;
            this.resetData();
            this.index = quesOrder;
            this.setOptions();

            if (this.isConfirm) {
                // 做完了
                this.confirmAnswer();
                if (this.current === 1) {
                    this.getNote();
                }
            } else {
                if (Array.isArray( this.choosedAnswers[this.index])) {
                    this.choosedAnswers[this.index].forEach(val => {
                        const index = val.charCodeAt(0) - 'A'.charCodeAt(0);
                        this.changeOption(index);
                    })
                }
            }
                
        },
        changeToPre () {
            if (!this.isConfirm) {
                this.choosedAnswers.splice(this.index, 1, this.userAnswer);
            }
                
            this.resetData();
            this.index -= 1;
            this.setOptions();

            if (this.isConfirm) {
                // 做完了
                this.confirmAnswer();
                if (this.current === 1) {
                    this.getNote();
                }
            } else {
                if (Array.isArray( this.choosedAnswers[this.index])) {
                    this.choosedAnswers[this.index].forEach(val => {
                        const index = val.charCodeAt(0) - 'A'.charCodeAt(0);
                        this.changeOption(index);
                    })
                }
            }
        },
        changeToNext () {
           if (!this.isConfirm) {
                this.choosedAnswers.splice(this.index, 1, this.userAnswer);
            } else {
                this.confirmAnswer();
            }
            this.resetData();
            this.index = this.index < this.questions.length - 1 ? ++this.index : this.index;
            this.setOptions();
            if (this.isConfirm) {
                // 做完了
                this.confirmAnswer();
                if (this.current === 1) {
                    this.getNote();
                }
            } else {
                if (Array.isArray( this.choosedAnswers[this.index])) {
                    this.choosedAnswers[this.index].forEach(val => {
                        const index = val.charCodeAt(0) - 'A'.charCodeAt(0);
                        this.changeOption(index);
                    })
                }
            }
        },
        confirmAnswer (firstDone = false) {

            // 判断答案是否正确
            const correctAnswer = this.questions[this.index].answer;
            console.log(this.choosedAnswers, this.index);
            // 判断正误
            this.isCorrect = this.choosedAnswers[this.index].sort().join('') === correctAnswer ? true : false;

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
            this.choosedAnswers[this.index].forEach(val => {
                style[ans.indexOf(val)] = correctAnswer.includes(val) ? 'option-color-correct' : 'option-color-wrong';
            })

            this.confirmStyle = style;

            // 发起请求
            if (firstDone) {
                this.setQuestionsDone()
            }
        },

        // 计算分数
        calculateScore(){
            let score = 0;
            for(let i=0;i<this.isWrong.length;i++){
                if(i<16 && !this.isWrong[i]){
                    score = score + 1;
                }else if(!this.isWrong[i]){
                    score = score + 2;
                }
            }
            uni.showToast({
                title: '你的分数是' + score +'分',
                icon: 'none'
            })
        },

        // 提交用户答题情况
        setQuestionsDone () {

            const idArr = this.questions.map(val => val.id);
            const isWrong = this.questions.map((val, index) => val.answer !== this.choosedAnswers[index].sort().join(''));
            this.isWrong = isWrong;

            this.calculateScore();

            const params = {
                openID: getApp().globalData.openID,
                id: idArr,
                isWrong
            }

            saveSimulationResult(params)
            .then(res => {
                if (res.code !== 0) {
                    uni.showToast({
                        title: '提交失败，请重试',
                        icon: 'none'
                    });
                }
            })
            .catch(err => {
                uni.showToast({
                    title: err,
                    icon: 'none'
                });
            })
        },
        changeTab () {
            this.current = this.current === 0 ? 1 : 0;
            if (this.current === 1) {
                this.getNote();
            }
        },
        // 获取用户的笔记
        getNote () {
            getNote({
                openID: getApp().globalData.openID,
                id: this.questions[this.index].id
            })
            .then(res => {
                if (res.code === 0) {
                    this.noteInfo = res.data;
                }else{
                    this.noteInfo = null;
                }
            })
            .catch(err => {
                uni.showToast({
                    title: err,
                    icon: 'none'
                });
            })    
        },
        confirmSubmit () {
            const that = this;
            uni.showModal({
                title: '温馨提示',
                content: '确定提交答题卡么？',
                confirmText: '确定提交',
                cancelText: '检查试卷',
                cancelColor: '#888',
                confirmColor: '#000',
                success: function(res) {
                    if (res.confirm){
                        that.isConfirm = true;
                        that.choosedAnswers.splice(that.index, 1, that.userAnswer);
                        that.confirmAnswer(true);
                    }
                }
            })
        }      
    }
}
</script>

<style lang="scss" scoped>
.smart-test-wrapper {
    margin: 0 auto;
    font-family: Microsoft Yahei;
    padding-bottom: 80rpx;
    .change-ques {
        display: flex;
        .pre-btn, .next-btn{
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
            
        }
    }
}

.fullbg {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgb(1, 1, 1);
    transition: all 2s;
    opacity: 0;
    opacity: .5;
}
</style>