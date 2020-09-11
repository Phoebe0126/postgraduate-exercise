<template>
    <view class="content">
        <ul class="note-container">
            <li v-for="(item, index) in items" :key="index" @click="naviToquesPage(item)">
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
        items: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        naviToquesPage ({ id }) {
            this.$emit('naviToquesPage', id);
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
            height: 240rpx;
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
                top: 8rpx;
            }
            .note {
                background: #F1EAEA;
                width: 600rpx;
                height: 68rpx;
                padding: 10rpx 30rpx 10rpx 30rpx;
                position: absolute;
                left: 50rpx;
                bottom: 30rpx;
                p {
                    font-size: 24rpx;
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