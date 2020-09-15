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
        :correctRate="questions[index].correctRate"
        :quesId="questions[index].id"
        :moduleType="moduleType"
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
            <button :class="[index === questions.length - 1 ? '' : 'pre-btn', 'btn']" @click="changeToPre" v-show="isConfirm && index !== 0" >上一题</button>
            <button :class="[index === 0 ? '' : 'next-btn', 'btn']" @click="changeToNext" v-show="isConfirm && index < questions.length - 1" >下一题</button>
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
            <touch-swiper @swiperaction="handleSwiperAction">
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
            </touch-swiper>
            
      </view>
  </view>
</template>

<script>
import Topic from '@/components/topic';
import VOption from '@/components/option';
import Answer from '@/components/answer';
import Progress from '@/components/progress';
import OptionRight from '@/components/option-right';
import Note from '@/components/note';
import touchSwiper from "@/components/touchSwiper";
import { QUESTION_NAVBAR_TITLE, TABS_TITLE, SUBJECT_NAVBAR_COLOR } from '../../consts/const';
import { uniSegmentedControl } from "@/components/uni-segmented-control";
import { getRandomQuestions, getChapterQuestions, getWrongQuestions, getOneQuestion } from '../../api/question';
import { setMarkDone, setMarkFaulty } from '../../api/record';
import { getNote } from '../../api/note';

export default {
    components: {
        Note,
        Topic,
        VOption,
        Answer,
        Progress,
        OptionRight,
        uniSegmentedControl,
        touchSwiper
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
            bgColors: ['', '', '', ''],
            // 标题背景颜色
            titleColor: SUBJECT_NAVBAR_COLOR,
            // 模块类型
            moduleType: 0, // 0---章节、1---随机、2---智能、3---错题
            // 笔记的信息
            noteInfo: null
        }
    },
    onLoad(query) {
        // 收藏和笔记跳转
        if (query.id) {
            getOneQuestion({
                openID: getApp().globalData.openID,
                id: query.id
            })
            .then(res => {

                if (res.code === 0) {
                    this.questions = res.data;
                    // 获取笔记
                    this.getNote();
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
            return;
        }

        const arr = ['chapter', 'random', 'smart', 'wrong'];
        this.moduleType = arr.indexOf(query.type);

        // 设置标题
        uni.setNavigationBarTitle({
            title: this.title[this.moduleType]
        });

        // 随机练习
        if (this.moduleType !== 2) {
            this.questionType = 1;
            // 随机练习
            if (this.moduleType === 1) {
                this.getRandomQuestions();
            } else if ( this.moduleType === 0) {
                // 章节练习
                this.getChapterQuestions(query.subject, query.chapterNumber);
            } else if(this.moduleType === 3){
                 //错题重练
                this.getWrongQuestions();
            }
        }
    },
    onShow() {
        uni.hideLoading();
        // 笔记编辑页返回请求笔记
        if (this.questions.length !== 0 && this.current === 1) {
            this.getNote();
        }
    },
    methods: {
        // 获取章节题目
        getChapterQuestions (subject, chapterNumber) {
            getChapterQuestions({
                subject,
                chapterNumber
            })
            .then(res => {
                 if (res.code === 0) {
                    this.questions = res.data;
                    // 获取笔记
                    this.getNote();
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
        //获取随机练习
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
        //获取错题
        getWrongQuestions () {
            getWrongQuestions({
                openID: getApp().globalData.openID
            })
            .then(res => {

                if (res.code === 0) {
                    this.questions = res.data;
                    this.questionReady = true;
                    this.setOptions();
                }else{
                    uni.showToast({
                        title: '你太厉害了，还没有错题呢~',
                        icon: 'none'
                    });
                }
                
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

            // 发起请求
            if (!isDone) {
                const question = this.questions[this.index];
                const params = {
                    openID: getApp().globalData.openID,
                    id: question.id
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
            setMarkFaulty(params)
            .then(res => {
                if (res.code !== 0) {
                    uni.showToast({
                        title: '出错了，请重试~',
                        icon: 'none'
                    });
                    return;
                }
                this.questions[this.index].correctRate = res.data.correctRate;
            })
        },
        // 做对
        setMarkDone (params) {
            setMarkDone(params)
            .then(res => {
                if (res.code !== 0) {
                    uni.showToast({
                        title: '出错了，请重试~',
                        icon: 'none'
                    });
                    return;
                }
                this.questions[this.index].correctRate = res.data.correctRate;
            })
        },
        // 切换tab
        changeTab () {
            this.current = this.current === 0 ? 1 : 0;
            if (this.current === 1) {
                this.getNote();
            }
        },
        handleSwiperAction ({direction}) {
            if (direction === 'left' && this.current === 1) {
               this.changeTab();
            } else if (direction === 'right' && this.current === 0) {
               this.changeTab();
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
        // 题目已完成
        complete () {
            uni.navigateBack();
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
        .pre-btn {
            flex: 1;
            margin: 30rpx;
        }
        .next-btn {
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
           
        }
    }
}
</style>