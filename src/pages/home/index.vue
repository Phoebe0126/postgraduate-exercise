<template>
	<view class="content" v-if="isRequestComplete">
		<!-- 公告栏 -->
		<view class="notice-wrapper">
			<uni-notice-bar 
				class="notice"
				scrollable="true" 
				single="true" 
				text="[单行] 这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏"
				background-color="#9f8080"
				showIcon="true"
				speed=50
				color="#fff"
			>
			</uni-notice-bar>
		</view>
		<view @click="navigateToMine">
			<!-- 用户区域 -->
			<user
				:nickname="nickName"
				:isAuthed="isAuthed"
				:avatarUrl="avatarUrl"
				:remainingDays="daysRemaining"
				@getUserInfo="getUserInfo"
				v-if="isRequestComplete"
			></user>			
		</view>
		<!-- 主体内容区域 -->
		<!-- 用户刷题信息 -->
		<view class="user-exercise-info">
			<view class="user-persist center">
				<view class="text">坚持天数</view>
				<view class="number">{{ 88 }}天</view>
			</view>
			<view class="line">
			</view>
			<view class="user-correct-ratio center">
				<view class="text">刷题正确率</view>
				<view class="number">{{ 55 }}%</view>
			</view>
		</view>
		<!-- 刷题模块 -->
		<view class="section">
			<view class="section-left">
				<view class="section-chapter" @click="naviToChapter">
					<image src="../../static/section/begin_chapter.png" mode="aspectFill" />
					<view class="section-chapter-text">{{ title[0] }}</view>
				</view>
				<view class="section-smart">
					<image src="../../static/section/begin_smart.png" mode="aspectFill" />
					<view class="section-smart-text">{{ title[1] }}</view>
				</view>
			</view>
			<view class="section-right">
				<view class="section-random" @click="naviToRandromPage">
					<view class="section-random-text">{{ title[2] }}</view>
					<image src="../../static/section/begin_random.png" mode="aspectFill" />
				</view>
				<view class="section-wrong">
					<image src="../../static/section/begin_wrong.png" mode="aspectFill" />
					<view class="section-wrong-text">{{ title[3] }}</view>
				</view>
			</view>
		</view>
		<tip>
		</tip>
		<view class="continueToDevelop">功能持续开发中，打造超好用的刷题小程序</view>
	</view>
</template>
 
<script>
import { getUserOpenId, getUserShortInfo, saveUserShortInfo, getUserAllInfo } from '../../api/user.js';
import { QUESTION_NAVBAR_TITLE } from '../../consts/const';
import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar/uni-notice-bar.vue';
import User from '@/components/user.vue';
import Tip from '@/components/tip.vue';
 
export default {
	data() {
		return {
			isAuthed: false,
			nickName: '',
			avatarUrl: '',
			title: QUESTION_NAVBAR_TITLE,
			daysRemaining: -1,
			isRequestComplete: false
		}
	},
	components: {
		uniNoticeBar,
		User,
		Tip
	},
	onShow() {
		this.login();
	},
	methods: {
		// 授权获取用户信息
		getUserInfo (res) {
			// 根据返回的数据传输相应的用户信息
			if (res.detail.userInfo) {
				// 已授权
				this.isAuthed = true;

				const { avatarUrl, nickName, gender } = res.detail.userInfo;
				this.avatarUrl = avatarUrl;
				this.nickName = nickName;

				const params = {
					openID: getApp().globalData.openID,
					avatar: avatarUrl,
					gender,
					nickname: nickName
				}
				// 存入授权用户个人信息
				saveUserShortInfo(params)
				.then(res => {
					if (res.code !== 0) {
						uni.showToast({
							title: '授权失败，请重试~',
							icon: 'none'
						});
					}
				})
			}
		},
		// 请求已登录用户信息
		getLoginUserInfo () {
			// 获取用户头像和昵称
			getUserShortInfo({
				openID: getApp().globalData.openID
			}).then(res => {
				// 已授权登录过
				if (res.code === 0) {
					this.isAuthed = true;
					this.nickName = res.data.nickname;
					this.avatarUrl = res.data.avatar;
					this.daysRemaining = res.data.daysRemaining;
				}
				this.isRequestComplete = true;
				uni.hideLoading();
			}).catch(err => {
				uni.hideLoading();
				this.isRequestComplete = true;
				uni.showToast({
					title: err,
					icon: 'none'
				});
			})
		},
		login () {
			uni.showLoading({
				title: '加载中'
			});
			const that = this;
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
							that.getLoginUserInfo();
						})
					} else {
						uni.showToast({
							title: res.errMsg,
							icon: 'none'
						});
					}
				},
				fail (err) {
					uni.showToast({
						title: err,
						icon: 'none'
					});
				}
			})
		},
		// 跳转到我的界面
		navigateToMine () {
			if (!this.isAuthed) {
				uni.showToast({
                    title: '您还未登录喲~',
                    icon: 'none'
				});
				return;
			}
			uni.navigateTo({
				url: '../mine/mine'
			})
		},
		// 跳转到章节练习页面
		naviToChapter () {
		    if (!this.isAuthed) {
				uni.showToast({
					title: '您还未登录喲~',
					icon: 'none'
				});
				return;
			}
			uni.navigateTo({
				url: '../subject/index'
			})
		},
		// 跳转到随机练习界面
		naviToRandromPage () {
			if (!this.isAuthed) {
				uni.showToast({
                    title: '您还未登录喲~',
                    icon: 'none'
				});
				return;
			}
			uni.navigateTo({
				url: '../question/index?type=random'
			});
		}
	}
}
</script>

<style lang="scss" scoped>

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
		.user-exercise-info {
			display: flex;
			justify-content: space-around;
			padding: 20rpx;
			align-items: center;
			.text {
				font-size: 30rpx;
				margin-bottom: 20rpx;
				color: #374959;
			}
			.number {
				color: #6a3f3f;
				font-size: 50rpx;
			}
			.line {
				border-right: 3rpx solid #fff;
				width: 1rpx;
				height: 90rpx;
			}
			.center {
				text-align: center;
			}
		}
		.section {
			margin: 20rpx 0;
			display: flex;
			flex-wrap: wrap;
			color: #fff;
			position: relative;
			height: 500rpx;
			font-size: 40rpx;
			&-left {
				flex-basis: 380rpx;
				position: relative;
				margin-left: 30rpx;
			}
			&-right {
				flex: 1;
				position: relative;
			}
			&-chapter {
				background: #c9a2a2;
				border-radius: 20rpx;
				margin-right: 20rpx;
				height: 150rpx;
				display: flex;
				align-items: center;
				box-sizing: border-box;
				width: 90%;
				image {
					margin-left: 25rpx;
					width: 90rpx;
					height: 90rpx;
				}
				&-text {
					align-self: flex-end;
					padding-bottom: 30rpx;
					margin: 0 30rpx;
				}
			}
			&-random {
				background: #aaadc2;
				box-sizing: border-box;
				height: 280rpx;
				border-radius: 20rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 50rpx 40rpx;
				width: 90%;
				&-text {
					width: 30rpx;
				}
				image {
					width: 150rpx;
					height: 150rpx;
				}
			}
			&-smart {
				background: #a5b8c8;
				display: flex;
				justify-content: space-between;
				border-radius: 20rpx;
				box-sizing: border-box;
				width: 90%;
				padding: 40rpx;
				position: absolute;
				top: 170rpx;
				bottom: 0;
				margin-right: 20rpx;
				align-items: center;
				image {
					width: 160rpx;
					height: 160rpx;
				}
				&-text {
					margin: 40rpx 30rpx;
					width: 30rpx;
				}
			}
			&-wrong {
				background: #a0bfc0;
				box-sizing: border-box;
				width: 90%;
				border-radius: 20rpx;
				height: 200rpx;
				display: flex;
				justify-content: space-between;
				position: absolute;
				align-items: center;
				// top: 305rpx;
				bottom: 0;
				padding: 30rpx;
				image {
					width: 110rpx;
					height: 110rpx;
				}
				&-text {
					margin-right: 20rpx;
					width: 80rpx;
				}
			}
		}
	}



	
</style>
