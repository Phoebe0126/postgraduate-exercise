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
	/*每个页面公共css */
</style>
