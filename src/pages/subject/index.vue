<template>
  <view class="subject-wrapper">
      <view>
          <single-subject 
          v-for="(key, index) in arr" 
          :key="index"
          :index="index"
          @naviToChapterPage="naviToChapterPage"
          ></single-subject>
      </view>
  </view>
</template>

<script>
import SingleSubject from '@/components/single-subject.vue';

export default {
    components: {
        SingleSubject
    },
    onLoad () {
        // todo 请求信息
    },
    data () {
        return {
            arr: [1,2,3,4]
        }
    },
    methods: {
        naviToChapterPage (index) {
            console.log(111)
            uni.navigateTo({
                url: `../list/index?subject=${++index}`
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.subject-wrapper {
    padding: 50rpx;
}

</style>