<template>
  <view class="result-wrapper">
    <view class="tips">恭喜你！完成本次练习</view>
    <view class="wrapper">
        <view class="score">
            <view class="title">你的得分</view>
            <view class="content">{{ score }}分</view>
        </view>
        <view class="line"></view>
        <view class="time">
            <view class="title">你的用时</view>
            <view class="content">{{ time }}</view>
        </view>
    </view>
    <view class="answer-tips">
          <view class="text">答题卡</view>
          <view class="bomb-tips">
              <i class="iconfont">&#xe63e;</i>
              <text>tips: 点击题号查看对应解析</text>
          </view>
      </view>
      <view class="answer-block">
          <view class="ques-block" v-for="(item, index) in quesArr" :key="index" @click="naviToQuesDetail(index)">
              <text>{{ index + 1 }}</text>
              <view class="is-wrong-block">
                    <text class="isWrong"  v-if="quesArr[index] === 0">未做答</text>
                    <i class="iconfont isWrong right" v-else-if="quesArr[index] === 1">&#xe60a;</i>
                    <i class="iconfont isWrong" v-else>&#xe609;</i>
              </view>
          </view>
      </view>
      <view class="btn-block">
        <button class="btn" @click="checkAnalysis" >查看解析</button>
        <button class="btn" @click="doAgain">再来一套</button>
      </view> 
  </view>
</template>

<script>
export default {
   data () {
       return {
           quesArr: getApp().globalData.resultArr,
           score: 0,
           time: getApp().globalData.time
       }
   },
   created () {
       this.calculateScore();
   },
   methods: {
        // 计算分数
        calculateScore(){
            let i = 0;
            this.score = this.quesArr.reduce((pre, cur) => {
                pre += cur === 1 ? i < 16 ? 1 : 2 : 0;
                i++;
                return pre;
            }, 0);
        },
        naviToQuesDetail (index) {
            getApp().globalData.index = index;
            uni.navigateBack();
        },
        // 查看解析
        checkAnalysis () {
            getApp().globalData.index = 0;
            uni.navigateBack();
        },
        // 重做
        doAgain () {
            // 关闭所有页面，打开新的页面
            uni.reLaunch({
                 url: './index'
            });
        }
   }
}
</script>

<style lang="scss" scoped>
.result-wrapper {
    .tips{
        background: #c9a2a2;
        color: #fff;
        font-size: 30rpx;
        height: 210rpx;
        padding-left: 50rpx;
    }
    .wrapper{
        width: 85%;
        height: 200rpx;
        background: #fff;
        top: 100rpx;
        left: 50rpx;
        position: absolute;
        display: flex;
        border-radius: 25rpx;
        box-shadow: 0rpx 5rpx 10rpx 10rpx rgba(1, 1, 1, .05);
        .score,.time{
            padding: 50rpx 94rpx;       
        }
        .line {
			border-right: 3rpx solid #c9a2a2;
			width: 1rpx;
			height: 70rpx;
            margin-top: 60rpx;
		}
        .title{
            padding-bottom: 10rpx;
        }
        .title,.content{
            color: #c9a2a2;
            text-align: center;
            font-size: 28rpx;
        }
    }
    .answer-tips {
        margin-top: 100rpx;
        padding: 10rpx 20rpx;
        font-size: 30rpx;
        display: flex;
        justify-content: space-between;
        .bomb-tips {
            display: flex;
            align-items: center;
            font-size: 25rpx;
            color: orange;
        }
    }
    .answer-block {
        margin: 20rpx auto;
        padding-top: 20rpx;
        padding-bottom: 20rpx;
        border-radius: 10rpx;
        width: 650rpx;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        box-shadow: 3rpx 4rpx 10rpx 5rpx rgba(0, 0, 0, .1);
        .ques-block {
            width: 130rpx;
            box-sizing: border-box;
            text-align: center;
            margin-bottom: 10rpx;
            margin-top: 10rpx;
            font-size: 25rpx;
            .is-wrong-block {
                .isWrong {
                    color: #bf7979;
                    font-size: 27rpx;
                }
                .right {
                    color: #33a083;
                }
                .iconfont {
                    margin-top: 2rpx;
                }
            }
        }
    }
    .btn-block {
        display: flex;
        .btn {
            flex: 1;
            margin: 30rpx;
            background: #ce8b8b;
            width: 500rpx;
            font-size: 30rpx;
            color: #fff;
            border-radius: 50rpx;
            box-shadow: 0rpx 12rpx 10rpx #d4b2b2;  //下阴影
            transition: .3s ease-out;
        }
        .btn:hover{
          width: 510rpx;
        }
        .btn::after{
            border: none;
        }
    }
}

</style>