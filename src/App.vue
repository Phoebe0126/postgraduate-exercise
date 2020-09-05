<script>
import { getUserOpenId } from './api/user.js';

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
	globalData: {  
		openID: ''  
	}
}
</script>

<style>
@import "./static/styles/iconfont.wxss";
</style>
