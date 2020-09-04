<template>
   <view>
        <chapter></chapter>
   </view>
</template>

<script>
import Chapter from '@/components/chapter.vue';
export default {
    components: {
        Chapter
    },
    onLoad () {
        uni.setNavigationBarTitle({
            title: '马原习题'
        });
    }
}
</script>

<style>

</style>