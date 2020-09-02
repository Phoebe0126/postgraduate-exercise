<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view>
			<text class="title">{{title}}</text>
			<button @click="login">登录</button>
			<button open-type="getUserInfo" @getuserinfo="getUserInfo">授权登录</button>
		</view>
			<view class="continueToDevelop">功能持续开发中，打造超好用的刷题小程序</view>
	</view>
</template>

<script>
import { getUserOpenId } from '../../api/user.js';

	export default {
		data() {
			return {
				title: 'Hello'
			}
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
	.content{

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
