<template>
  <view class="subject-wrapper">
      <view>
          <single-subject 
            v-for="(item, index) in arr" 
            :key="index"
            :index="index"
            :doneNum="item.doneNum"
            :totalNum="item.totalNum"
            :process="item.progress"
            :correctRate="item.correctRate"
            @naviToChapterPage="naviToChapterPage"
          ></single-subject>
      </view>
  </view>
</template>

<script>
import SingleSubject from '@/components/single-subject.vue';
import { getTotalProgress } from '../../api/record';

export default {
    components: {
        SingleSubject
    },
    data () {
        return {
            arr: []
        }
    },
    onShow () {
        this.getTotalProgress();
        uni.hideLoading();
    },
    methods: {
        naviToChapterPage (index) {
            uni.navigateTo({
                url: `../list/index?subject=${++index}`
            });
        },
        getTotalProgress () {
            getTotalProgress({
                openID: getApp().globalData.openID
            })
            .then(res => {
                if (res.code === 0) {
                    this.arr = res.data;
                }
            })
            .catch(err => {
                uni.showToast({
                    title: err,
                    icone: 'none'
                });
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.subject-wrapper {
    padding: 50rpx;
}

</style>