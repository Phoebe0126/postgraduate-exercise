<template>
  <view class="wrapper">
        <view class="sheet-btn" v-if="!showDetail" @click="exchange">
            <i class="iconfont">&#xe67a;</i>
            <text>答题卡</text>
        </view>
        <view class="content" v-else>
            <!-- 头部 -->
            <view class="header-explain">
                <view class="noDone" v-if="!isConfirm">
                    <view class="undo">
                        <view class="circle"></view>
                        <text>未做</text>
                    </view>
                    <view class="hasDo">
                        <view class="circle"></view>
                        <text>已做</text>
                    </view>
                </view>
                <view class="done" v-else>
                    <view class="answer-right">
                        <view class="circle"></view>
                        <text>正确</text>
                    </view>
                    <view class="answer-false">
                        <view class="circle"></view>
                        <text>错误</text>
                    </view>
                    <view class="undo">
                        <view class="circle"></view>
                        <text>未做</text>
                    </view>
                </view>
            </view>
            <!-- 每个答题项 -->
            <view class="footer-detail">
                <view 
                    v-for="(item, index) in answerArr" 
                    :key="index" 
                    :class="['circle', 
                             !isConfirm ? item.isChoosed ? 'bg-color-hasDone' : ''
                                : item.isChoosed ? isWrong[index] ? 'bg-color-wrong' : 'bg-color-right'
                                : ''
                            ]"
                    @click="changeIndex(index)"
                >
                    <view class="text">
                        {{ item.index }}
                    </view>
                </view>
            </view>
        </view>
  </view>
</template>

<script>
export default {
    props: {
        isConfirm: {
            type: Boolean,
            default: false
        },
        choosedAnswers: {
            type: Array,
            default: []
        },
        isWrong: {
            type: Array,
            default: []
        },
        showDetail: {
            type: Boolean,
            deafult: false
        }
    },
    computed: {
        answerArr () {
            let index = 1;
            return new Array(33).fill('').map(val => ({isChoosed: this.choosedAnswers[index - 1].length > 0, index: index++}));
        }
    },
    methods: {
        exchange () {
            this.$emit('exchangeAnswerSheet');
        },
        changeIndex (index){
            this.$emit('changeIndex', index);
        }
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    background: #fff;
    width: 100%;
    box-sizing: border-box;
    font-size: 35rpx;
    color: #c9a2a2;
    position: fixed;
    bottom: 0;
    z-index: 100;
    .sheet-btn {
        padding: 10rpx 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2rpx solid #c9a2a2;
        .iconfont {
            font-size: 45rpx;
            margin-right: 10rpx;
        }
    }
    .circle {
        width: 30rpx;
        height: 30rpx;
        border: 1rpx solid #8ca1b3;
        border-radius: 50%;
        margin: 10rpx;
    }
    .content {
        padding: 10rpx;
        color: #8ca1b3;
        font-size: 30rpx;
        .header-explain {
            .noDone, .done {
                width: 100%;
                display: flex;
                padding: 0 20rpx;
                align-items: center;
            }
            .noDone {
                .undo, .hasDo {
                    display: flex;
                    align-items: center;
                }
                .hasDo {
                    .circle {
                        background: #8ca1b3;
                    }
                }
            }
            .done{
                .answer-right,.answer-false,.undo{
                    display: flex;
                    align-items: center;
                }
                .answer-right{
                   .circle{
                       background:#7eb7a6;
                       border: 1rpx solid #7eb7a6;
                   }
                }
                .answer-false{
                    .circle{
                        background: #e0b6b6;
                        border: 1rpx solid #e0b6b6;
                    }
                }
            }
        }
        .footer-detail {
            margin: 10rpx auto;
            width: 700rpx;
            display: flex;
            flex-wrap: wrap;
            font-size: 30rpx;
            justify-content: flex-start;
            align-content: center;
            color: #000;
            box-sizing: border-box;
            .circle {
                height: 60rpx;
                width: 60rpx;
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 20rpx;
                box-sizing: border-box;
            }
            .bg-color-hasDone {
                background: #8ca1b3;
                color: #fff;
            }
            .bg-color-right {
                color: #fff;
                background:#7eb7a6;
                border: 1rpx solid #7eb7a6;
            }
            .bg-color-wrong {
                color: #fff;
                background:#e0b6b6;
                border: 1rpx solid #e0b6b6;
            }

        }
    }
}
</style>