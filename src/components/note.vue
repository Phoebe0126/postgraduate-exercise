<template>
    <view class="note">
      <view v-if="!info" class="note-default" @click="naviToEditNotePage">
            <view>
                <i class="iconfont">&#xe60f;</i>
            </view>
            <view class="text">点击发表笔记</view>
            <view class="text">优质的笔记可以帮助你考得更高哦~</view>
      </view>
      <view v-else class="note-info">
           <view class="note-info-up">
                <view class="user-info">
                    <view class="avatar">
                        <image  :src="info.avatar" mode="aspectFill" class="image" />
                    </view>
                    <view class="nickname">{{ info.nickname }}</view>
                </view>
                <view class="more" @click="naviToPopup">
                    <i class="iconfont">&#xe62b;</i>
                </view>
           </view>
           <view class="note-info-text">
               {{ info.note }}
           </view>
           <view class="note-info-time">
               {{ info.createTime }}
           </view>
      </view>
    </view>
</template>

<script>
import { deleteNote } from '../api/note.js';

export default {
    props: {
        quesId: {
            type: Number,
            default: -1
        },
        noteInfo: {
            type: Object,
            default: null
        }
    },
    watch: {
        quesId: {
            immediate: true,
            handler (val) {
                this.questionId = val;
            }
        },
        noteInfo: {
            immediate: true,
            handler (val) {
                console.log(val);
                this.info = val;
            }
        }
    },
    data () {
        return {
            questionId: this.quesId,
            info: this.noteInfo
        }
    },
    methods: {
        // 跳转到笔记页面
        naviToEditNotePage () {
            uni.navigateTo({
                url: `../edit-note/index?id=${this.questionId}${this.info ? '&text=' + this.info.note : ''}`
            });
        },
        //编辑，删除笔记的弹窗
        naviToPopup(){
            let a = this.questionId;
            let b = this;
            wx.showActionSheet({
                itemList: ['编辑','删除'],
                success(res){
                    console.log(res.tapIndex)
                    if(res.tapIndex === 0){
                        b.naviToEditNotePage();
                    }else if(res.tapIndex === 1){
                        deleteNote({
                            openID: getApp().globalData.openID,
                            id: a
                        })
                        .then(res => {
					        if (res.code !== 0) {
						    uni.showToast({
                                title: '删除失败，请重试~',
                                icon: 'none'
                            });
                            return;
                          }
                          b.$emit('getNote');
                        })
                    }
            
                }
           })
        }
    }
}
</script>

<style lang="scss" scoped>
 .note {
    font-size: 30rpx;
    &-default {
        padding: 20rpx 0;
        color: #a7a7a7;
        text-align: center;
    }

    &-info {
        padding: 10rpx 20rpx;
        color: #a8a8a8;
        &-up {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .user-info {
                display: flex;
                align-items: center;
                .avatar {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: #c9a2a2;
                    border-radius: 50%;
                    width: 60rpx;
                    height: 60rpx;
                    .image {
                        width: 65rpx;
                        height: 65rpx;
                        border-radius: 50%;
                    }
                }
                .nickname {
                    margin-left: 20rpx;
                    font-size: 30rpx;
                    color: #0c0c0c;
                }
            }
        }
        &-text, &-time {
            margin-left: 70rpx;
            padding: 10rpx 10rpx;
        }
        &-text {
            color: #0c0c0c;
        }
        &-time {
            font-size: 26rpx;
        }
    }
    
}
</style>