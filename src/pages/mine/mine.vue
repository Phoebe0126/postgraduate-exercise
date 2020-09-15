<template>
    <view class="content">
        <!-- 用户头像、昵称、座右铭 -->
        <view class="header">
            <view class="avatar">
                <uni-icons v-if="avatarUrl == null || avatarUrl == ''" type="person" size="40" color="#E2C9C9"></uni-icons>
                 <image v-else :src="avatarUrl" mode="aspectFill"  /> 
            </view>
            <view class="info">
                <span class="nickname">{{ nickname }}</span>
                <p class="motto">座右铭：{{ motto }}</p>
            </view>
        </view>
        <!-- 目标学习天数 -->
        <view class="goal">目标学习天数：<span style="color: white;">{{ goal + ' '}}</span>天</view>
        <!-- 导航栏：我的笔记、我的收藏、个人信息、管理员入口 -->
        <nav-lists :items="navItems" :top="'360rpx'" @navToMyInfo="navToMyInfo" @navToAdmin="navToAdmin"
            @navToMyNote="navToMyNote" @navToMyCollection="navToMyCollection" :isAdmin="isAdmin"> 
        </nav-lists>
    </view>
</template>

<script>
import uniIcons from '@/components/uni-notice-bar/uni-icons/uni-icons.vue';
import navLists from '@/components/nav-lists.vue';
import { getUserAllInfo } from '../../api/user';
import { MINE_LISTS, MINE_LISTS_ADMIN } from '../../consts/const'

export default {
    data () {
        return {
            avatarUrl: '',
            nickname: '',
            motto: '',
            goal: 0,
            // isAdmin: false,
            navItems: MINE_LISTS
        }
    },
    components: {
        uniIcons,
        navLists
    },  
    onShow () {
        this.getUserInfo();
    },
    methods: {
        navToMyNote() {
            uni.navigateTo({
                url: "./myNote"
            }) 
        },
        navToMyInfo() {
            uni.navigateTo({
                url: "./myInfo"
            }) 
        },
        navToMyCollection() {
            uni.navigateTo({
                url: "./myCollection"
            }) 
        },
        navToAdmin() {
            uni.navigateTo({
                url: "./admin"
            })
        },
        getUserInfo() {
            let that = this;
            getUserAllInfo({
                openID: getApp().globalData.openID
            }).then(res => {
                if(res.code == 0) {
                    that.avatarUrl = res.data.avatar;
                    that.nickname = res.data.nickname;
                    that.motto = (res.data.motto == null || res.data.motto == '') ?'说点什么吧~': res.data.motto;
                    that.goal = res.data.goal == null ? '-': res.data.goal;
                    if(res.data.isAdmin == true) {
                        that.navItems = MINE_LISTS_ADMIN;
                    }
                }
            }).catch(err => {
                uni.showToast({
                    title: err.errMsg,
                    icon: 'none'
                });
            })
        },  
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
        z-index: 1000;
        box-shadow: 0 10rpx 10rpx #E0E0E0;
        .avatar {
            width: 100rpx;
            height: 100rpx; 
            border-radius: 50%; 
            overflow: hidden;
            background: white;
            margin-left: 40rpx; 
            position: relative;
            image {
                width: 100%;
                height: 100%;
            }
            uni-icons {
                width: 80rpx; 
                height: 80rpx;
                position: absolute;
                left: 10rpx; 
                top: 5rpx;
            }
        }
        .info {
            margin-left: 30rpx; 
            width: 540rpx; 
            .nickname {
                display: block;
                font-size: 36rpx;
                line-height: 60rpx;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
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
</style>