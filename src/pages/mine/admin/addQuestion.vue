<template>
    <view class="content">
        <view class="header">
            <add-question-select-box class="subject li" :name="'科目'" :items="subjectItems" 
                @changeSelect="changeSubject" :zIndex=1001></add-question-select-box>
            <add-question-select-box class="chapter li" :name="'章节'" :items="chapterItems"
                @changeSelect="changeChapter" v-if="update" :zIndex=1000 ></add-question-select-box>
        </view>
        <view class="question-info">
            <!-- 类型 -->
            <view class="type li">
                <span>类型</span>
                <view>
                    <radio-group @change="typeChange" class="typeRadio" >
                        <!-- 单选 -->
                        <radio value=1 :checked="type == 1" color="#CE8B8B"></radio>
                        <span>单选题</span>
                        <!-- 多选 -->
                        <radio value=2 :checked="type == 2" color="#CE8B8B"></radio>
                        <span>多选题</span>
                    </radio-group>
                </view>
                
            </view>
            <!-- 题干 -->
            <view class="question li">
                <span>题干</span>
                <view>
                    <textarea v-model="question"></textarea>
                </view>
            </view>
            <!-- 选项 -->
            <view class="options li">
                <span>选项</span>
                <view>
                    <ul>
                        <li><span>A</span><input type="text" v-model="optionA"></li>
                        <li><span>B</span><input type="text" v-model="optionB"></li>
                        <li><span>C</span><input type="text" v-model="optionC"></li>
                        <li><span>D</span><input type="text" v-model="optionD"></li>
                    </ul>
                </view>
            </view>
            <!-- 正确答案 -->
            <view class="answer li">
                <span>正确答案</span>
                <view>
                    <input type="text" v-model="answer">
                </view>
            </view>
            <!-- 解析 -->
            <view class="tip li">
                <span>解析</span>
                <view>
                    <textarea v-model="tip"></textarea>
                </view>
            </view>
        </view>
        <button class="save" @click="saveQuestion">保存设置</button>
    </view> 
</template>

<script>
import addQuestionSelectBox from '@/components/add-question-select-box.vue';
import { SUBJECT_TITLE} from '../../../consts/const'
import { getChapterNames, createOneQuestion } from '../../../api/question'


export default {
    data() {
        return {
            selectedSubject: 1,
            selectedChapter: 1,
            type: 0,
            question: '',
            optionA: '',
            optionB: '',
            optionC: '',
            optionD: '',
            answer: '',
            tip: '',
            chapterItems: [{item: '', index: 0}],
            update: true
        }
    },
    computed: {
        subjectItems() {
            let arr = [];
            for(let i = 0; i < SUBJECT_TITLE.length; i++){
                arr.push({
                    item: SUBJECT_TITLE[i],
                    index: parseInt(i) + 1
                });
            }
            return arr;
        }
    },
    components: {
        addQuestionSelectBox
    },
    onLoad() {
        this.refreshChapters();
    },
    methods: {
        typeChange(e) {
            this.type = parseInt(e.detail.value);
        },
        changeSubject(subjectIndex) {
            this.selectedSubject = subjectIndex;
            this.refreshChapters();
        },
        changeChapter(chapterIndex) {
            this.selectedChapter = chapterIndex;
        },
        refreshChapters(){
            let that = this;
            getChapterNames({
                subject: that.selectedSubject
            }).then(res => {
                if(res.code == 0){
                    let arr = res.data;
                    that.chapterItems = [];
                    for(let i in arr) {
                        that.chapterItems[i] = {
                            item: `第${arr[i].chapterNumber}章 ${arr[i].chapter}`,
                            index: arr[i].chapterNumber
                        };
                    }
                }
                //刷新章节选项
                that.update = false;
                that.$nextTick(() => {
                    that.update = true
                });
                that.selectedChapter = that.chapterItems[0].index;
            }).catch(err => {
                uni.showToast({
                    title: err.errMsg,
                    icon: 'none'
                })
            })
        },
        saveQuestion() {
            if(![1, 2, 3, 4].includes(this.selectedSubject)) {
                uni.showToast({
                    title: '科目输入错误',
                    icon: 'none'
                });
                return;
            }
            if(![1, 2].includes(this.type)) {
                uni.showToast({
                    title: '类型输入错误',
                    icon: 'none'
                });
                return;
            }
            if(this.type == 1 && this.answer.length > 1) {
                uni.showToast({
                    title: '类型和答案不匹配',
                    icon: 'none'
                });
                return;
            }
            if(this.type == 2 && this.answer.length < 2) {
                uni.showToast({
                    title: '类型和答案不匹配',
                    icon: 'none'
                });
                return;
            }
            if(this.type == 1 && !['A', 'B', 'C', 'D'].includes(this.answer)){
                uni.showToast({
                    title: '答案只能为A, B, C, D',
                    icon: 'none'
                });
                return;
            }
            if(this.type == 2){
                for(let i = 0; i < this.answer.length; i++){
                    if(!['A', 'B', 'C', 'D'].includes(this.answer[i])){
                        uni.showToast({
                            title: '答案中只能出现A, B, C, D',
                            icon: 'none'
                        });
                        return;
                    }
                }
            }
            let that = this;
            let tmp = that.chapterItems[that.selectedChapter - 1].item;
            createOneQuestion({
                subject: that.selectedSubject,
                chapter: tmp.slice(4),
                chapterNumber: that.selectedChapter,
                type: that.type,
                question: that.question,
                A: that.optionA,
                B: that.optionB,
                C: that.optionC,
                D: that.optionD,
                answer: that.answer,
                tip: that.tip
            }).then(res => {
                uni.showToast({
                    title: res.msg,
                    icon: 'none'
                });
            }).catch(err => {
                uni.showToast({
                    title: err.errMsg,
                    icon: 'none'
                });
            })
        }
    }
}
</script>

<style lang="scss">
    page {
        background: #E0E0E0;
    }
    textarea {
        // background: #F1EAEA;
        // border-radius: 20rpx;
        background: white;
        border: 2rpx solid #CE8D8D;
        border-radius: 20rpx;
    }
    input {
        background: white;
        border: 2rpx solid #CE8D8D;
        border-radius: 20rpx;
    }
    .header {
        margin-top: 20rpx;
        height: 184rpx;
        background: #E0E0E0;
        // .subject {
        //     z-index: 1001
        // }
        .li {
            float: left;
            width: 100%;
        }
        .chapter {
            margin-top: 4rpx;
        }
    }
    .question-info {
        margin-top: 20rpx;
        width: 100%;
        .li {
            margin-bottom: 4rpx;
            background: #DCCBCB;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-items: start;
            >span {
                width: 20%;
                text-align: center;
            }
            >view {
                width: 80%;
            }
        }
        .type {
            height: 90rpx;
            radio-group {
                margin-left: 10rpx;
                radio:nth-of-type(2) {
                    margin-left: 50rpx;
                }
            }
        } 
        .question {
            height: 360rpx;
            textarea {
                width: 480rpx;
                height: 280rpx;
                line-height: 50rpx;
                padding: 20rpx;
                margin-left: 20rpx;
            }
        } 
        .options {
            margin-bottom: 20rpx;
            height: 360rpx;
            ul {
                width: 100%;
                height: 100%;
                li {
                    width: 520rpx;
                    height: 90rpx;
                    float: left;
                    padding: 0 20rpx;
                    display: flex;
                    flex-direction: row;
                    justify-content: start;
                    align-items: center;
                    span {
                        width: 40rpx;
                        display: block;
                        height: 90rpx;
                        line-height: 90rpx;
                    }
                    input {
                        padding: 0 20rpx;
                        width: 440rpx;
                        height: 60rpx;
                    }
                }
            }
        } 
        .answer {
            height: 90rpx;
            input {
                padding: 0 20rpx;
                width: 480rpx;
                height: 60rpx;
                margin-left: 20rpx;
                // background: #F1EAEA;
                // border-radius: 20rpx;
                // border: none;
            }
        }
        .tip {
            height: 360rpx;
            textarea {
                width: 480rpx;
                height: 280rpx;
                line-height: 50rpx;
                padding: 20rpx;
                margin-left: 20rpx;
            }
        }
    }
    .save {
        height: 80rpx;
        width: 100%;
        margin-top: 30rpx;
        color: white;
        background: #CE8B8B;
        border-radius: 0;
        border: none;
        margin-bottom: 60rpx;
        line-height: 80rpx;
    }
</style>