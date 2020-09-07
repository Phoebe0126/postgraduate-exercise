<template>
  <view class="question-wrapper">
      <!-- 题干 -->
      <topic :text="text"></topic>
      <!--进度条-->
      <progress></progress>
      <!--单选 正确率-->
      <option-right></option-right>
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
      <button class="confirm-btn" @click="confirmAnswer" v-show="!isConfirm">确认</button>
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
                    <view class="tip">{{ tip }}</view>
                </view>
                <!-- 笔记 -->
                <view v-else class="note">
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
import Option from '@/components/option';
import Answer from '@/components/answer';
import Progress from '@/components/progress';
import OptionRight from '@/components/option-right';
import { QUESTION_NAVBAR_TITLE, TABS_TITLE } from '../../consts/const';
import { uniSegmentedControl } from "@/components/uni-segmented-control";

export default {
    components: {
        Topic,
        Option,
        Answer,
        Progress,
        OptionRight,
        uniSegmentedControl
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
            confirmStyle: [],
            // 当前选中的选项卡
            current: 0,
            // tabs名称
            tabs: TABS_TITLE,
            // 解析内容
            tip: '阿萨德你家是多少安静的少年德你家是多少安静的少年德你家是多少安静的少年德你家是多少安静的少年德你家是多少安静的少年德你家是多少安静的少年时'
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
            // 还未选择答案
            if (this.userAnswer.length === 0) {
                uni.showToast({
                    title: '该题还未作答哦~',
                    icon: 'none'
                });
                return;
            }
            // 判断答案是否正确
            this.isCorrect = this.userAnswer.sort().join('') === this.correctAnswer ? true : false;
            // 设置选项样式
            const style = new Array(4).fill('');
            const ans = ['A', 'B', 'C', 'D'];
            // 正确答案
            ans.forEach((val, index) => {
                if (this.correctAnswer.includes(val)) {
                    style[index] = 'option-color-unchoose';
                }
            })
            // 错误答案
            this.userAnswer.forEach(val => {
                style[ans.indexOf(val)] = this.correctAnswer.includes(val) ? 'option-color-correct' : 'option-color-wrong';
            })
            this.confirmStyle = style;
            this.isConfirm = true;
        },
        // 切换tab
        changeTab () {
            this.current = this.current === 0 ? 1 : 0;
        }
    }

}
</script>

<style lang="scss" scoped>

.question-wrapper {
    margin: 10rpx auto;
    font-family: Microsoft Yahei;
    .confirm-btn {
        background: #ce8b8b;
        margin: 100rpx auto;
        width: 500rpx;
        font-size: 30rpx;
        color: #fff;
        border-radius: 20rpx;
        // box-shadow: 5rpx 5rpx 2rpx 2rpx rgba(206, 139, 139, .6);
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
                color: #ccc;
                text-align: center
            }
        }
    }
}
</style>