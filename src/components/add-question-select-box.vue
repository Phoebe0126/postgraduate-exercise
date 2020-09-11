<template>
    <view class="content">
        <view class="select-wrapper">
            <span class="name">{{ name }}</span>
            <view class="select option" :class="{showAll: showAll}" @click="changeShowAll">{{ selectedItem }}</view>
            <view :class="{showAll: showAll}" class="options" :style="{height: 90 * len + 4 * (len - 1)+ 'rpx', zIndex: zIndex}">
                <view v-for="(li, index) in listItems" class="option" :key="index"
                @click="changeSelect(li.item, li.index)">{{ li.item }}</view>
            </view>
            <i @click="changeShowAll"></i>
        </view>
    </view>
</template>

<script>

export default {
    props: {
        name: {
            type: String,
            default: ''
        },
        items: {
            type: Array,
            default: () => []
        },
        zIndex: {
            type: Number,
            default: 1000
        }
    },
    data() {
        return {
            showAll: false,
            listItems : this.items.slice(1),
            selectedItem: this.items[0].item,
            selectedIndex: this.items[0].index,
            len: this.items.length - 1,
        }
    },
    methods: {
        changeShowAll() {
            this.showAll = !this.showAll;
        },
        changeSelect(item, index) {
            let beforeItem = this.selectedItem;
            let beforeIndex = this.selectedIndex;
            this.selectedItem = item;
            this.selectedIndex = index;
            for(let i = 0; i < this.listItems.length; i++){
                if(this.listItems[i].item == item) {
                    this.listItems.splice(i, 1);
                    this.listItems.push({
                        item: beforeItem,
                        index: beforeIndex
                    });
                    break;
                }
            }
            this.listItems.sort((a, b) => {
                return a.index - b.index;
            })
            this.$emit('changeSelect', this.selectedIndex);
            this.showAll = !this.showAll;
        }
    }
}
</script>

<style lang="scss">
    page {
        background: #E0E0E0;
    }
    .select-wrapper {
        width: 100%;
        height: 90rpx;
        display: flex;
        line-height: 100rpx;
        background: #DCCBCB;
        position: relative;
        .name {
            width: 20%;
            height: 90rpx;
            float: left;
            text-align: center;
        }
        .option {
            text-indent: 20rpx;
        }
        .select {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 70%;
            height: 90rpx;
            margin-bottom: 4rpx;
            background: #DCCBCB;
            float: left;
            text-align: left;
        }
        .select.showAll {
            box-shadow: -4rpx 0 10rpx #E0E0E0;
        }
        .options {
            width: 80%;
            overflow: hidden;
            position: absolute;
            background: #E0E0E0;
            top: 94rpx;
            left: 20%;
            display: none;
            // z-index: 1000;
            box-shadow: -4rpx 16rpx 20rpx #E0E0E0;
            .option {
                width: 100%;
                height: 90rpx;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                float: left;
                margin-bottom: 4rpx;
                background: #DCCBCB;
            }
            .option:last-child {
                margin-bottom: 0;
            }
        }
        .options.showAll {
            display: block;
        }
        i {
            display: block;
            background: url('/static/select.png') center center;
            width: 30rpx;
            height: 30rpx;
            position: absolute;
            right: 30rpx;
            top: 35rpx;
        }
    }
</style>