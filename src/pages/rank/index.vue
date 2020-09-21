<template>
    <view>
        <touch-swiper>
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
        </touch-swiper>
    </view>
</template>

<script>
import { getNumRank, getDaysRank } from '../../api/user';
import  { UserRank } from '@/components/user-rank';
import { uniSegmentedControl } from "@/components/uni-segmented-control";
import Encourage from "@/components/encourage";
import touchSwiper from "@/components/touchSwiper";

export default {
    components: {
        UserRank,
        uniSegmentedControl,
        Encourage,
        touchSwiper
    },
    data() {
        return {
            TabTitles: ['刷题数量', '坚持天数'],
            // 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
            current: 0, // tabs组件的current值，表示当前活动的tab选项
            maxQuesRankList: [],
            maxDaysRankList: [],
            personalData: {
                doneQuesNum: 0,
                daysOfPersistence: 0
            },
            rankList: []
        };
    },
    onLoad () {
        this.getNumRank();
    },
    methods: {
        // 获取刷题数量前20
        getNumRank () {
            uni.showLoading({
                title: '加载中'
            });
            getNumRank({
                openID: getApp().globalData.openID
            })
            .then(res => {
                uni.hideLoading();
                if (res.code === 0) {
                    const data = res.data;
                    this.maxQuesRankList = data.rankNum;
                    this.personalData.doneQuesNum = data.mine.doneQuesNum;
                } else {
                    uni.showToast({
                        title: '暂无排行数据~',
                        icon: 'none'
                    });
                }
            })
            .catch(err => {
                uni.hideLoading();
                uni.showToast({
                    title: err.errMsg,
                    icon: 'none'
                });
            })
        },
        // 获取坚持天数前20
        getDaysRank () {
            uni.showLoading({
                title: '加载中'
            });
            getDaysRank({
                openID: getApp().globalData.openID
            })
            .then(res => {
                uni.hideLoading();
                if (res.code === 0) {
                    this.maxDaysRankList = res.data.rankDays;
                    this.personalData.daysOfPersistence = res.data.mine.daysOfPersistence;
                } else {
                    uni.showToast({
                        title: '暂无排行数据~',
                        icon: 'none'
                    });
                }
            })
            .catch(err => {
                uni.hideLoading();
                uni.showToast({
                    title: err.errMsg,
                    icone: 'none'
                });
            })
        },
        // tabs切换
        change() {
            this.current = 1 - this.current;
            if (this.maxDaysRankList.length <= 0 && this.current === 1) {
                this.getDaysRank();
            }
        }
    }
};
</script>

<style lang="scss" scoped>

.rank-wrapper {
    padding-bottom: 100rpx;
    min-height: 100vh;
    .tabs-block {
        .tabs {
            margin-top: 20rpx;
        }
    }
}
</style>