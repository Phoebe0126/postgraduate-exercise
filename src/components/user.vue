
<template>
  <view class="user-wrapper">
      <!-- 头像、昵称 -->
      <view class="user-info">
          <view class="avatar">
              <uni-icons v-if="!isAuthed" type="person" color="#fff" size="22" />
              <image v-else :src="avatarUrl" mode="aspectFill" class="image" />
          </view>
          <view class="nickname" v-if="isAuthed">{{ nickname }}</view>
          <button class="login_button" open-type="getUserInfo" @getuserinfo="getUserInfo" v-else>立即登录</button>
      </view>
     
      <!-- 剩余天数 -->
      <view class="remainDays">  
          剩余：<text class="text">{{ validRemainingDays }}</text>天
      </view>

  </view>
</template> 

<script>
import uniIcons from '@/components/uni-notice-bar/uni-icons/uni-icons.vue';

export default {
    props: {
        avatarUrl: { 
            type: String,
            default: ''
        },
        nickname: {
            type: String,
            default: ''
        },
        remainingDays: {
            type: Number,
            default: -1
        },
        isAuthed: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        validRemainingDays () {
            return this.remainingDays < 0 ? '-' : this.remainingDays;
        }
    },
    components: {
        uniIcons
    },
    methods: {
        getUserInfo (res) {
			this.$emit('getUserInfo', res);
		}
    }

}
</script>

<style lang="scss">
.user-wrapper {
    padding: 20rpx 50rpx;
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
           font-size: 32rpx;
        }
    }
    .remainDays {
        color: #000;
        .text {
            padding: 0 5rpx;
            font-size: 32rpx;
            color: #c9a2a2;
        }
    }
}
.login_button::before{
		border: 0;
		border: none;
}
.login_button::after{
		border: 0; margin: 20rpx 0;
		border: none;
}
.login_button{
    background: #fff;
    color: #c9a2a2;
    font-size: 32rpx;
    margin-left: 10rpx;
}
	
</style>