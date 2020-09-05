<template>
    <view class="content">
        <!-- 用户头像、昵称、座右铭 -->
        <view class="header">
            <view class="avatar">
                <uni-icons v-if="!avatarUrl" type="person" size="40" color="#E2C9C9"></uni-icons>
                 <image v-else :src="avatarUrl" mode="aspectFill" /> 
            </view>
            <view class="info">
                <span class="nickname">{{ nickname }}</span>
                <p class="motto">座右铭：{{ motto }}</p>
            </view>
        </view>
        <!-- 目标学习天数 -->
        <view class="goal">目标学习天数：<span style="color: white;">{{ goal + ' '}}</span>天</view>
        <ul class="mine">
            <li class="note" style="color: #6A3F3F;">
                <span style="background: #6A3F3F;"></span>
                <span>我的笔记</span>
                <i></i>
            </li>
            <li class="collection" style="color: #9F8080;">
                <span style="background: #9F8080;"></span>
                <span>我的收藏</span>
                <i></i>
            </li>
            <li class="userinfo" style="color: #C9A2A2;" @click="navToMyInfo">
                <span style="background: #C9A2A2;"></span>
                <span>个人信息</span>
                <i></i>
            </li>
        </ul>
    </view>
</template>

<script>
import uniIcons from '@/components/uni-notice-bar/uni-icons/uni-icons.vue';
import {getUserAllInfo} from '../../api/user'

export default {
    data () {
        return {
            avatarUrl: '',
            nickname: '',
            motto: '',
            goal: 0
        }
    },
    components: {
        uniIcons
    },
    // onLoad() {
    //     this.getUserInfo();
    // },
    onShow() {
        this.getUserInfo();
    },
    methods: {
        navToMyInfo() {
            uni.navigateTo({
                url: "./myInfo"
            }) 
        },
        getUserInfo() {
            getUserAllInfo({
                openID: getApp().globalData.openID
            }).then(res => {
                if(res.code == 0) {
                    this.avatarUrl = res.data.avatar;
                    this.nickname = res.data.nickname;
                    this.motto = res.data.motto == null ?'说点什么吧~': res.data.motto;
                    this.goal = res.data.goal == null ? '-': res.data.goal;
                }
            }).catch(err => console.log(err))
        },
    },
    onShow () {
        uni.hideLoading();
    }
}
</script>

<style lang="scss">
    .content {
        font-family: Microsoft Yahei;
    }
    .header {
        display: flex;
        height: 240rpx; 
        background: #E2C9C9;
        align-items: center;
        justify-content: start;
        box-shadow: 0 2px 3px grey;
        .avatar {
            width: 100rpx;
            height: 100rpx; 
            border-radius: 50%; 
            overflow: hidden;
            background: white;
            margin-left: 40rpx; 
            image {
                width: 100%;
                height: 100%;
            }
            uni-icons {
                position: relative;
                left: 8rpx;
            }
        }
        .info {
            margin-left: 30rpx; 
            width: 540rpx; 
            .nickname {
                font-size: 36rpx;
                line-height: 60rpx;
            }
            .motto {
                color: #735F5F;
                font-size: 22rpx; 
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }
    }
    .goal {
        height: 120rpx;
        background: #D4C1C1;
        line-height: 120rpx;
        padding-left: 60rpx;
        color: #6A3F3F; 
        font-size: 34rpx;
    }
    .mine {
        overflow: hidden;
        background: gainsboro;
        position: absolute;
        top: 360rpx;
        bottom: 0;
        width: 100%;
        padding: 0;
        li {
            height: 90rpx;
            background: white;
            width: 100%;
            float: left;
            list-style-type: none;
            margin-top: 30rpx; 
            position: relative;
            font-size: 24rpx;
            line-height: 90rpx;
            span {
                float: left;
                display: block;
            }
            span:nth-child(1) {
                height: 30rpx;
                width: 30rpx; 
                border-radius: 50%;
                position: relative;
                top: 30rpx;
                left: 60rpx;
                margin-right: 80rpx;
            }
            i {
                background: url('/static/navTo.png') center center;
                width: 30rpx; 
                height: 30rpx; 
                display: block;
                position: absolute; 
                right: 50rpx;
                top: 30rpx;
            }
        }
    }
</style>