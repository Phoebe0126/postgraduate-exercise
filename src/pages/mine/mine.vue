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
            @navToMyNote="navToMyNote" @navToMyCollection="navToMyCollection"> 
        </nav-lists>
    </view>
</template>

<script>
import uniIcons from '@/components/uni-notice-bar/uni-icons/uni-icons.vue';
import navLists from '@/components/nav-lists.vue';
import { getUserAllInfo } from '../../api/user';
import { MINE_LISTS} from '../../consts/const'

export default {
    data () {
        return {
            avatarUrl: '',
            nickname: '',
            motto: '',
            goal: 0,
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
            getUserAllInfo({
                openID: getApp().globalData.openID
            }).then(res => {
                if(res.code == 0) {
                    this.avatarUrl = res.data.avatar;
                    this.nickname = res.data.nickname;
                    this.motto = (res.data.motto == null || res.data.motto == '') ?'说点什么吧~': res.data.motto;
                    this.goal = res.data.goal == null ? '-': res.data.goal;
                }
            }).catch(err => console.log(err))
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
    // .mine {
    //     overflow: hidden;
    //     background: gainsboro;
    //     position: absolute;
    //     top: 360rpx;
    //     bottom: 0;
    //     width: 100%;
    //     padding: 0;
    //     li {
    //         height: 90rpx;
    //         background: white;
    //         width: 100%;
    //         float: left;
    //         list-style-type: none;
    //         margin-top: 30rpx; 
    //         position: relative;
    //         font-size: 24rpx;
    //         line-height: 90rpx;
    //         span {
    //             float: left;
    //             display: block;
    //         }
    //         span:nth-child(1) {
    //             height: 30rpx;
    //             width: 30rpx; 
    //             border-radius: 50%;
    //             position: relative;
    //             top: 30rpx;
    //             left: 60rpx;
    //             margin-right: 80rpx;
    //         }
    //         i {
    //             background: url('/static/navTo.png') center center;
    //             width: 30rpx; 
    //             height: 30rpx; 
    //             display: block;
    //             position: absolute; 
    //             right: 50rpx;
    //             top: 30rpx;
    //         }
    //     }
    // }
</style>