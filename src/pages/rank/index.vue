<template>
	<view>
		<view>
			<u-tabs-swiper ref="uTabs" :list="TabTitles" active-color="#c9a2a2" :current="current" @change="tabsChange" :is-scroll="false"
			 swiperWidth="750"></u-tabs-swiper>
		</view>
		<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
					<!-- 用户列表 -->
                    <view class="user-list">
                        <view class="userinfo" >
                            <view class="ranking">
                                1
                            </view>
                            <view class="avatar">
                                <image src="https://thirdwx.qlogo.cn/mmopen/vi_32/oUicWDFmZmf8qgfY0NLmIwedj9uDt28tUpIsadMjbQwC2IhQBgzphWY83CWiaaxteQ4XR07kvicvrUibkFdaQqBzLg/132" mode="aspectFill">
                            </view>
                            <view class="info">
                                <text class="nickname">小陈小陈早点睡觉小陈小陈早点睡觉</text>
                                <text class="number">58542题</text>
                            </view>
                        </view>
                    </view>
				</scroll-view>
			</swiper-item>
            <swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
					2
				</scroll-view>
			</swiper-item>
		</swiper>
        <view v-if="current === 0">
            <encourage></encourage>
        </view>
        <view v-else>
            <encourage></encourage>
        </view>
	</view>
</template>

<script>
import { getMaxQuesRank, getMaxDaysRank } from '../../api/user';
import Encourage from '@/components/encourage.vue';

	export default {
        components: {
        Encourage
	},
		data() {
			return {
				TabTitles: [{
					name: '刷题数量'
				}, {
					name: '坚持天数'
                }],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
                swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
                maxQuesRankList: [],
                maxDaysRankList: []
			};
        },
        onLoad () {
            // 获取刷题数量
            this.getMaxQuesRank();
            this.getMaxDaysRank();
        },
        onShow () {
            uni.hideLoading();
        },
		methods: {
            // 获取刷题数量前20
            getMaxQuesRank () {
                getMaxQuesRank({
                    openID: getApp().globalData.openID
                })
                .then(res => {
                    if (res.code === 0) {
                        console.log(res)
                        this.maxQuesRankList = res.data;
                    }
                })
                .catch(err => {
                    uni.showToast({
                        title: err,
                        icon: 'none'
                    });
                })
            },
            // 获取坚持天数前20
            getMaxDaysRank () {
                getMaxDaysRank({
                    openID: getApp().globalData.openID
                })
                .then(res => {
                    if (res.code === 0) {
                        console.log(res)
                        this.maxDaysRankList = res.data;
                    }
                })
                .catch(err => {
                    uni.showToast({
                        title: err,
                        icon: 'none'
                    });
                })
            },
			// tabs通知swiper切换
			tabsChange(index) {
                this.swiperCurrent = index;
                console.log(this.current);
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				
			}
		}
	};
</script>

<style lang="scss" scoped>
@import "uview-ui/index.scss";

.userinfo{
    width: 100%;
    height: 150rpx; 
    border-style: solid;
    border-width: 1px 0;
    border-color: #f0f0f0;
    display: flex;
    align-items: center;

    .ranking{
        //float: left;
        font-size:28rpx;
        color:black;
        margin-left: 30rpx;

    }

    .avatar {
        float:left;
        width: 80rpx;
        height: 80rpx; 
        overflow: hidden;
        // background-color: rgb(169, 111, 111);
        margin-left: 40rpx; 
        position: relative;
        border-radius: 50%;

       
        image {
            width: 100%;
            height: 100%;
        }
    }
    .info {
        float:left;
        margin-left: 30rpx; 
        width: 540rpx; 
        .nickname {
            float:left;
            color: black;
            width:340rpx;
            font-size: 36rpx;
            line-height: 60rpx;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;

        }
        .number {
            float:right;
            color: #000000;
            font-size: 36rpx; 
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            margin-right: 20rpx;
        }
    }

}
</style>