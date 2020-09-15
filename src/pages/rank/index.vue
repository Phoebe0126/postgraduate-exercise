<template>
	<view>
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
                <view>
                    <user-rank
                        :list="current === 0 ? maxQuesRankList : maxDaysRankList"
                        :current="current"
                   ></user-rank>
                </view>
            </view>
            <encourage :current="current" :num="current === 0 ? personalData.doneQuesNum : personalData.daysOfPersistence"></encourage>
        </view>
	</view>
	</view>
</template>

<script>
import { getRankList } from '../../api/user';
import  { UserRank } from '@/components/user-rank';
import { uniSegmentedControl } from "@/components/uni-segmented-control";
import Encourage from "@/components/encourage";

export default {
    components: {
        UserRank,
        uniSegmentedControl,
        Encourage
    },
    data() {
        return {
            TabTitles: ['刷题数量', '坚持天数'],
            // 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
            current: 0, // tabs组件的current值，表示当前活动的tab选项
            maxQuesRankList: [],
            maxDaysRankList: [],
            personalData: {},
            rankList: []
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
        // tabs切换
        change() {
            this.current = 1 - this.current;
        },
    }
};
</script>

<style lang="scss" scoped>

.rank-wrapper {
    padding-bottom: 100rpx;
    .tabs-block {
        .tabs {
            margin-top: 20rpx;
        }
    }
}
</style>