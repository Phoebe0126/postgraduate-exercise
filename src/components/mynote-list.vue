<template>
    <view class="content">
        <ul class="note-container">
            <li v-for="(item, index) in items" :key="index">
                <h3 class="title">{{ item.question }}</h3>
                <span class="createdTime">{{ item.createTime }}</span>
                <view class="note">
                    <p>{{ item.note }}</p>
                    <i></i>
                </view>
            </li>
        </ul>
    </view>
</template>

<script>
export default {
    props: {
        // top: {
        //     type: String,
        //     default: ''
        // },
        items: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            // items: [
            //     {question: '马克思主义是关于无产阶级和人类解放的科学', createdTime: '2020-9-1 14:31', note: 'good1马克思主义是关于无产阶级和人类解放的科学good1马克思主义是关于无产阶级和人类解放的科学good1马克思主义是关于无产阶级和人类解放的科学good1马克思主义是关于无产阶级和人类解放的科学good1马克思主义是关于无产阶级和人类解放的科学'},
            //     {question: '在马克思主义创立过程中，第一次比较系统地阐述了历史唯物主义基本原理的著作是', createdTime: '2020-9-1 14:32', note: 'good2马克思主义是关于无产阶级和人类解放的科学good1马克思主义是关于无产阶级和人类解放的科学good1马克思主义是关于无产阶级和人类解放的科学good1马克思主义是关于无产阶级和人类解放的科学'},
            //     {question: '在伦敦海格特公墓的马克思墓碑上，镌刻着马克思的一句名言：“哲学家们只是用不同的方式解释世界，而问题在于改变世界。 ” 马克思主义理论区别于其他理论的显著特征是马克思主义是关于无产阶级和人类解放的科学', createdTime: '2020-9-1 14:33', note: 'good3good1马克思主义是关于无产阶级和人类解放的科学good1马克思主义是关于无产阶级和人类解放的科学good1马克思主义是关于无产阶级和人类解放的科学good1马克思主义是关于无产阶级和人类解放的科学good1马克思主义是关于无产阶级和人类解放的科学good1马克思主义是关于无产阶级和人类解放的科学'},
            //     {question: '在伦敦海格特公墓的马克思墓碑上，镌刻着马克思的一句名言：“哲学家们只是用不同的方式解释世界，而问题在于改变世界。 ” 马克思主义理论区别于其他理论的显著特征是马克思主义是关于无产阶级和人类解放的科学', createdTime: '2020-9-1 14:33', note: 'good3good1马克思主义是关于无产阶级和人类解放的科学good1马克思主义是关于无产阶级和人类解放的科学good1马克思主义是关于无产阶级和人类解放的科学good1马克思主义是关于无产阶级和人类解放的科学good1马克思主义是关于无产阶级和人类解放的科学good1马克思主义是关于无产阶级和人类解放的科学'},
            //     {question: '在伦敦海格特公墓的马克思墓碑上，镌刻着马克思的一句名言：“哲学家们只是用不同的方式解释世界，而问题在于改变世界。 ” 马克思主义理论区别于其他理论的显著特征是马克思主义是关于无产阶级和人类解放的科学', createdTime: '2020-9-1 14:33', note: 'good3good1马克思主义是关于无产阶级和人类解放的科学good1马克思主义是关于无产阶级和人类解放的科学good1马克思主义是关于无产阶级和人类解放的科学good1马克思主义是关于无产阶级和人类解放的科学good1马克思主义是关于无产阶级和人类解放的科学good1马克思主义是关于无产阶级和人类解放的科学'},
            //     {question: '在伦敦海格特公墓的马克思墓碑上，镌刻着马克思的一句名言：“哲学家们只是用不同的方式解释世界，而问题在于改变世界。 ” 马克思主义理论区别于其他理论的显著特征是马克思主义是关于无产阶级和人类解放的科学', createdTime: '2020-9-1 14:33', note: 'good3good1马克思主义是关于无产阶级和人类解放的科学good1马克思主义是关于无产阶级和人类解放的科学good1马克思主义是关于无产阶级和人类解放的科学good1马克思主义是关于无产阶级和人类解放的科学good1马克思主义是关于无产阶级和人类解放的科学good1马克思主义是关于无产阶级和人类解放的科学'},
            //     {question: '在伦敦海格特公墓的马克思墓碑上，镌刻着马克思的一句名言：“哲学家们只是用不同的方式解释世界，而问题在于改变世界。 ” 马克思主义理论区别于其他理论的显著特征是马克思主义是关于无产阶级和人类解放的科学', createdTime: '2020-9-1 14:33', note: 'good3good1马克思主义是关于无产阶级和人类解放的科学good1马克思主义是关于无产阶级和人类解放的科学good1马克思主义是关于无产阶级和人类解放的科学good1马克思主义是关于无产阶级和人类解放的科学good1马克思主义是关于无产阶级和人类解放的科学good1马克思主义是关于无产阶级和人类解放的科学'}
            // ]
        }
    }
}
</script>

<style lang="scss">
    .note-container {
        margin-top: 20rpx;
        width: 100%;
        li {
            padding-left: 50rpx;
            margin-top: 10rpx;
            height: 210rpx;
            display: flex;
            background: white;
            position: relative;
            flex-direction: column;
            .title {
                margin-top: 20rpx;
                font-size: 30rpx;
                width: 520rpx;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .createdTime {
                color: grey;
                font-size: 24rpx;
                position: relative;
                top: 2rpx;
            }
            .note {
                background: #F1EAEA;
                width: 600rpx;
                height: 68rpx;
                padding: 10rpx 30rpx 10rpx 30rpx;
                position: absolute;
                left: 50rpx;
                bottom: 20rpx;
                p {
                    font-size: 24rpx;
                    // line-height: 24rpx;
                    height: 60rpx;
                    width: 550rpx;
                    display: -webkit-box;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    word-wrap: break-word;
                    white-space: normal !important;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
                i {
                    position: absolute;
                    background: url('/static/navTo.png') center center;
                    width: 30rpx;
                    height: 30rpx;
                    bottom: 22rpx;
                    right: 14rpx;
                }
            }
        }
    }
</style>