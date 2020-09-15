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
	<view class="rank-wrapper">  
        <view class="tabs-block">
           <!-- 选择项 -->
            <view class="tabs">
                <uni-segmented-control
                    :current="current"
                    :values="TabTitles"
                    active-color="#c9a2a2"
                    @clickItem="change"
                    style-type="text"
                    class="u-tabs"
                ></uni-segmented-control>
            </view>
            <!-- 显示的内容 -->
            <view class="tab-content">
                <!-- 解析 -->
                <view v-if="current === 0" class="tips">
                   <user-rank
                    :list="maxQuesRankList"
                    :isNum="true"
                   ></user-rank>
                </view>
                <!-- 笔记 -->
                <view v-else>
                    <user-rank
                        :list="maxDaysRankList"
                        :isNum="false"
                   ></user-rank>
                </view>
            </view>
        </view>
	</view>
	</view>
</template>

<script>
import { getRankList } from '../../api/user';
import  { UserRank } from '@/components/user-rank';
import { uniSegmentedControl } from "@/components/uni-segmented-control";

export default {
    components: {
        UserRank,
        uniSegmentedControl
    },
    data() {
        return {
            TabTitles: ['刷题数量', '坚持天数'],
            // 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
            current: 0, // tabs组件的current值，表示当前活动的tab选项
            maxQuesRankList: [],
            maxDaysRankList: [],
            personalData: {}
        };
    },
    onLoad () {
        this.getRankList();
    },
    onShow () {
        uni.hideLoading();
    },
    methods: {
        // 获取刷题数量和坚持天数前20
        getRankList () {
            getRankList({
                openID: getApp().globalData.openID
            })
            .then(res => {
                if (res.code === 0) {
                    console.log(res)
                    const data = res.data;
                    this.maxQuesRankList = data.rankNum;
                    this.maxDaysRankList = data.rankDays;
                    this.personalData = data.mine;
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
        change() {
            this.current = 1 - this.current;
            console.log(this.current);
        },
    }
};
</script>

<style lang="scss" scoped>

.rank-wrapper {
    .tabs-block {
       
        .tabs {
            margin-top: 20rpx;
        }
    }
}
</style>