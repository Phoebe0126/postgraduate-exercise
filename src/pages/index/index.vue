<template>
	<view class="content">
		<!-- 公告栏 -->
		<view class="notice-wrapper">
			<uni-notice-bar 
				class="notice"
				scrollable="true" 
				single="true" 
				text="[单行] 这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏"
				background-color="#9f8080"
				showIcon="true"
				speed="50"
				color="#fff"
			>
			</uni-notice-bar>
		</view>
		<!-- 用户区域 -->
		<user
			:nickname="'小陈小陈早点睡觉'"
		></user>

		<view>
			<button @click="login">登录</button>
			<button open-type="getUserInfo" @getuserinfo="getUserInfo">授权登录</button>
		</view>
		<tip>	jjjj</tip>
		<view class="continueToDevelop">功能持续开发中，打造超好用的刷题小程序</view>
	</view>
</template>

<script>
import { getUserOpenId } from '../../api/user.js';
import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar/uni-notice-bar.vue';
import User from '@/components/user.vue';
import Tip from '@/components/tip.vue';

export default {
	data() {
		return {
			
		}
	},
	components: {
		uniNoticeBar,
		User,
		Tip
	},
	onLoad() {
		this.login();
	},
	methods: {
		login () {
			wx.login({
				success (res) {
					if (res.code) {
					// 获取用户的openId
					getUserOpenId({
						appid: 'wx0e8cbbba3aab1125',
						secret: '9097a462abccba0564091d8536fc7295',
						js_code: res.code,
						grant_type: 'authorization_code'
					}).then(res => {
						// 存储openId
						getApp().globalData.openID = res.openid;

						
						console.log(getApp().globalData.openID);
					})
					
					} else {
					console.log('登录失败！' + res.errMsg)
					}
				},
				fail (err) {
					console.log(err,2);
				}
			})
		},
		getUserInfo (res) {
			this.login();
			// todo 发起后端请求
			// 根据返回的数据传输相应的用户信息
			if (res.detail.userInfo) {
				const { avatarUrl, nickName, gender } = res.detail.userInfo;
				const params = {
					openID: getApp().globalData.openID,
					avatar: avatarUrl,
					gender,
					nickname: nickName
				}
			}
			console.log(res);
		}
	}
}
</script>

<style lang="scss">

	.content {
		background: #e0e0e0;
		padding-bottom: 100rpx;
		.notice-wrapper {
			padding: 20rpx 0;
			background: #c9a2a2;
			.notice {
				width: 100%;
				.uni-noticebar {
					padding: 8rpx 10rpx !important;
				}
				.uni-noticebar__content-text {
					font-size: 24rpx!important;
					font-weight: 100;
				}
				
			}
		}
		.continueToDevelop{
			font-family: Microsoft Yahei;
			font-size: 30rpx;
			color: #FFFFFF;
			text-align: center;
			background: #c9a2a2;
			width: 100%;
		}
	}

	
	
</style>
