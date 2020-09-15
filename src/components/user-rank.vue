<template>
    <view class="user-list">
    <view class="userinfo" v-for="(item, index) in list" :key="index">
        <view class="ranking">
            <i class="iconfont" v-if="index < 3">&#xe78a;</i>
            {{ index + 1 }}
        </view>
        <view class="avatar">
             <uni-icons v-if="!item.avatar" type="person" color="#fff" size="22" />
            <image :src="item.avatar" mode="aspectFill" v-else>
        </view>
        <view class="info">
            <text class="nickname">{{ item.nickname }}</text>
            <text class="number" v-if="isNum">{{ item.doneQuesNum }}题</text>
            <text class="number" v-else>{{ item.daysOfPersistence }}天</text>
        </view>
    </view>
</view>
</template>

<script>
import uniIcons from '@/components/uni-notice-bar/uni-icons/uni-icons.vue';

export default {
    props: {
        list: {
            type: Array,
            default: []
        },
        isNum: {
            type: Boolean,
            default: true
        }
    },
    components: {
        uniIcons
    }
}
</script>

<style lang="scss" scoped>
.user-list {
    &:first-child {
        border-top: 1px solid #f0f0f0;
    }
    .userinfo{
        width: 100%;
        height: 120rpx; 
        border-bottom: 1px solid #f0f0f0;
        display: flex;
        align-items: center;

        .ranking{
            font-size:28rpx;
            color:black;
            margin-left: 30rpx;
            position: relative;
            .iconfont {
                font-size: 30rpx;
                position: absolute;
                left: 50%;
                top: 60%;
                transform: translate(-50%, -50%);
            }
        }

        .avatar {
            float:left;
            width: 80rpx;
            height: 80rpx; 
            overflow: hidden;
            // background-color: rgb(169, 111, 111);
            margin-left: 40rpx; 
            position: relative;
            border-radius: 50%;

        
            image {
                width: 100%;
                height: 100%;
            }
        }
        .info {
            float:left;
            margin-left: 30rpx; 
            width: 540rpx; 
            .nickname {
                float:left;
                color: black;
                width:340rpx;
                font-size: 30rpx;
                line-height: 60rpx;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;

            }
            .number {
                float:right;
                color: #000000;
                font-size: 30rpx; 
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                margin-right: 20rpx;
            }
        }

    }
}

</style>