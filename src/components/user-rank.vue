<template>
    <view class="user-list">
    <view class="userinfo" v-for="(item, index) in list" :key="index">
        <view class="ranking">
            <i class="iconfont" v-if="index < 3" :class="color[index]">&#xe78a;</i>
            <text :class="index < 3 && color[index]">{{ index + 1 }}</text>
        </view>
        <view>
            
        <view class="avatar">
            <uni-icons  class="default-person" v-if="!item.avatar" type="person" color="#fff" size="22" />
            <image :src="item.avatar" mode="aspectFill" v-else>
            <i class="iconfont crown" >&#xec3b;</i>
        </view>
        </view>
        <view class="info">
            <text class="nickname">{{ item.nickname }}</text>
            <text class="number" v-if="current === 0">{{ item.doneQuesNum }}题</text>
            <text class="number" v-else>{{ item.daysOfPersistence }}天</text>
        </view>
    </view>
</view>
</template>

<script>
import uniIcons from '@/components/uni-notice-bar/uni-icons/uni-icons.vue';
import { COLOR_MEDAL } from '../consts/const';

export default {
    props: {
        list: {
            type: Array,
            default: []
        },
        current: {
            type: Number,
            default: 0
        }
    },
    components: {
        uniIcons
    },
    data () {
        return {
            color: COLOR_MEDAL
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../uni.scss";

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
            font-size: 26rpx;
            color:black;
            margin-left: 30rpx;
            position: relative;
            width: 50rpx;
            text-align: center;
            .iconfont {
                position: absolute;
                left: 50%;
                top: 55%;
                transform: translate(-50%, -50%);
            }
            .color-gold {
                color: $uni-color-gold;
            }
            .color-silver {
                color: $uni-color-silver;
            }
            .color-copper {
                color: $uni-color-copper;
            }
        }

        .avatar {
            float:left;
            width: 80rpx;
            height: 80rpx; 
            background-color: #dccbcb;
            margin-left: 20rpx; 
            position: relative;
            border-radius: 50%;

            .crown {
                position: absolute;
                right: -23rpx;
                top: -15rpx;
                color:#efb336;
                font-size: 40rpx;
                transform: rotate(54deg);
            }

            .default-person {
               position: absolute;
               left: 50%;
               top: 50%;
               transform: translate(-50%, -50%);
            }
        
            image {
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }
        .info {
            margin-left: 30rpx; 
            width: 540rpx; 
            display: flex;
            align-items: center;
            justify-content: space-between;
            .nickname {
                color: black;
                width:340rpx;
                font-size: 30rpx;
                line-height: 60rpx;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;

            }
            .number {
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