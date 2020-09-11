<template>
    <view class="content">
        <view class="header">
            <view class="avatar-container">
                <uni-icons v-if="avatarUrl == null || avatarUrl == ''" type="person" size="40" color="white"></uni-icons>
                <image v-else :src="avatarUrl" mode="aspectFill"  /> 
            </view>
            <span>管理员</span>
        </view>
        <!-- 导航栏：设置公告栏、添加题目 -->
        <nav-lists :items="navItems" :top="'200rpx'" @navToSetNoticeBar="navToSetNoticeBar"
            @navToAddQuestion="navToAddQuestion"></nav-lists>
    </view>
</template>

<script>
import uniIcons from '@/components/uni-notice-bar/uni-icons/uni-icons.vue';
import navLists from '@/components/nav-lists.vue';
import { ADMIN_LISTS} from '../../consts/const';
import { getUserAllInfo } from '../../api/user'

export default {
    data() {
        return {
            navItems: ADMIN_LISTS,
            avatarUrl: ''
        }
    },
    components: {
        uniIcons,
        navLists
    },
    onLoad() {
        this.getUserInfo();
    },
    methods: {
        navToSetNoticeBar() {
            uni.navigateTo({
                url: "./admin/setNoticeBar"
            });
        },
        navToAddQuestion() {
            uni.navigateTo({
                url: "./admin/addQuestion"
            });
        },
        getUserInfo() {
            let that = this;
            getUserAllInfo({
                openID: getApp().globalData.openID
            }).then(res => {
                if(res.code == 0) {
                    that.avatarUrl = res.data.avatar;
                }
            }).catch(err => {
                uni.showToast({
                    title: err,
                    icon: 'none'
                });
            })
        }
    }
}
</script>

<style lang="scss">
    .content {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: #E0E0E0;
        .header {
            height: 200rpx; 
            display: flex;
            flex-direction: row;
            justify-content: start;
            align-items: center;
            background: #DCCBCB;
            box-shadow: 0 10rpx 10rpx #E0E0E0;
            z-index: 1000;
            .avatar-container {
                height: 100rpx;
                width: 100rpx;
                border-radius: 50%;
                overflow: hidden;
                background: #CE8B8B;
                margin-left: 50rpx;
                position: relative;
                margin-right: 50rpx;
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
        }
    }
</style>