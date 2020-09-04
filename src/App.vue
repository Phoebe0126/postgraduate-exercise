<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
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
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
