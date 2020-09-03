
<template>
  <view class="user-wrapper">
      <!-- 头像、昵称 -->
      <view class="user-info">
          <view class="avatar">
              <uni-icons v-if="!avatarUrl" type="person" color="#fff" size="16" />
              <image v-else :src="avatarUrl" mode="aspectFill" />
          </view>
          <view class="nickname">{{ nickname }}</view>
      </view>
      <!-- 剩余天数 -->
      <view class="remainDays">  
          剩余：<text >{{ validRemainingDays }}</text>天
      </view>
  </view>
</template> 

<script>
import uniIcons from '@/components/uni-notice-bar/uni-icons/uni-icons.vue';

export default {
    props: {
        avatarUrl: { 
            type: String,
            default: 'https://thirdwx.qlogo.cn/mmopen/vi_32/oUicWDFmZmf8qgfY0NLmIwedj9uDt28tUpIsadMjbQwC2IhQBgzphWY83CWiaaxteQ4XR07kvicvrUibkFdaQqBzLg/132'
        },
        nickname: {
            type: String,
            default: ''
        },
        remainingDays: {
            type: Number,
            default: -1
        }
    },
    computed: {
        validRemainingDays () {
            return this.remainingDays < 0 ? '-' : this.remainingDays;
        }
    },
    components: {
        uniIcons
    }

}
</script>

<style lang="scss">
.user-wrapper {
    padding: 10rpx 30rpx;
    background: #fff;
    display: flex;
    justify-content: space-between;
    font-size: 24rpx;
    align-items: center;
    font-family: Microsoft Yahei;
    .user-info {
        display: flex;
        align-items: center;
        .avatar {
            display: flex;
            justify-content: center;
            align-items: center;
            background: #c9a2a2;
            border-radius: 50%;
            width: 50rpx;
            height: 50rpx;
            image {
                width: 50rpx;
                height: 50rpx;
                border-radius: 50%;
            }
        }
        .nickname {
           margin-left: 20rpx;
        }
    }
    .remainDays {
        color: #000;
        text {
            padding: 0 5rpx;
            font-size: 32rpx;
            color: #c9a2a2;
        }
    }
}
</style>