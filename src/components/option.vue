<template>
  <view class="answer-wrapper">
      <view :class="['option', bgColors[index], confirmColor[index]]" v-for="(item, index) in options" :key="index" @click="changeBgColor(index)">
          <view class="option-left">
            <text class="option-letter">{{ item.letter }}</text>
            <text class="option-text">{{ item.text }}</text>
          </view>
          <view class="option-right" v-if="confirmColor[index]">
                <i class="iconfont icon-wrong" v-if="confirmColor[index] === 'option-color-wrong'">&#xe8ae;</i>
                <i class="iconfont icon-correct" v-else>&#xe8ad;</i>
          </view>
      </view>
  </view>
</template>

<script>
export default {
    props: {
        options: {
            type: Array,
            default: []
        },
        isConfirm: {
            type: Boolean,
            default: false
        },
        confirmStyle: {
            type: Array,
            default: []
        },
        type: {
            type: Number,
            default: 1
        },
        bgColors: {
            type: Array,
            default: []
        }
    },
    data () {
        return {
            confirmColor: []
        }
    },
    watch: {
        'confirmStyle': {
            handler: function (newValue){
                this.confirmColor = newValue;  
            },
            deep: true
        }
    },
    methods: {
        // 选中切换背景颜色
        changeBgColor (index) {
            if (!this.isConfirm) {
                this.$emit('changeOption', index)
            }
        }
    }
}
</script>

<style lang="scss" scoped>


.answer-wrapper {
    .option {
        border-radius: 10rpx;
        margin: 40rpx 20rpx;
        font-size: 30rpx;
        border: 2rpx solid #c6d3dc;
        // background: #e8edf1;
        padding: 0 40rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &-left {
            .option-letter {
                margin-right: 30rpx;
            }
            margin: 30rpx 0;
        }
        &-right {
            .icon-wrong {
                color: #9d2c2c;
                font-size: 60rpx;
            }
            .icon-correct {
                color: #4caa90;
            }
        }
    }
    .choose-bg-color {
        background: #c0cdd8;
        border: 2rpx solid #a2a9b0;
    }
    .option-color-correct {
        background: #e1e5e1;
        border: 2rpx solid #a0baaa;
    }
    .option-color-wrong {
        background: #f1e8e8;
        border: 2rpx solid #e0b6b6;
    }
    .option-color-unchoose {
        border: 2rpx solid #a0baaa;
    }
}
</style>