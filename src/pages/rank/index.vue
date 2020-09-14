<template>
	<view>
		<u-steps :list="numList" :current="1"></u-steps>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				numList: [{
					name: '下单'
				}, {
					name: '出库'
				}, {
					name: '运输'
				}, {
					name: '签收'
				}, ],
			}
		}
	}
</script>

<style lang="scss" scoped>
@import "uview-ui/index.scss";


</style>