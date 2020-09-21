<template>
    <view @touchstart="handleTouchStart" @touchend="hanldeTouchEnd">
        <slot></slot>
    </view>
</template>

<script>
export default {
    data() {
        return {
            startTime: 0,
            endTime: 0,
            touchStartX: 0,
            touchEndX: 0,
            touchStartY: 0,
            touchEndY: 0,
            interval: 5000,
            distance: 2
        }
    },
    methods: {
        handleTouchStart (e) {
            this.startTime = Date.now()
            this.touchStartX = e.changedTouches[0].clientX
            this.touchStartY = e.changedTouches[0].clientY
        },
        hanldeTouchEnd (e) {
            this.endTime = Date.now()
            this.touchEndX = e.changedTouches[0].clientX
            this.touchEndY = e.changedTouches[0].clientY
            // 判断是否超时
            if (this.endTime - this.startTime > this.interval) {
                return
            }
            // 判断是否超过一定滑动距离
            if (Math.abs(this.touchEndX - this.touchStartX) < this.distance || Math.abs(this.touchEndY - this.touchStartY) > this.distance * 20) {
                return 
            }
            // 判断滑动的方向
            const direction = this.touchEndX - this.touchStartX < 0 ? 'right' : 'left'
            this.$emit('swiperaction', {direction})
          
        }
    }
}
</script>

<style lang="scss">
    
</style>