<template>
   <view class="list-wrapper">
        <chapter
            v-for="(item, index) in chapterArr"
            :key="index"
            :chapterNumber="item.chapterNumber"
            :chapter="item.chapter"
            :totalNum="item.totalNum"
            :doneNum="item.doneNum"
            :subject="subject"
        ></chapter>
   </view>
</template>

<script>
import Chapter from '@/components/chapter.vue';
import { SUBJECT_ABBR_TITLE } from '../../consts/const.js';
import { getChapterProgress } from '../../api/record';

export default {
    data () {
        return {
            // 上方的习题标题
            abbrTitle: SUBJECT_ABBR_TITLE,
            // 章节数组
            chapterArr: [],
            // 科目ID
            subject: 0
        }
    },
    components: {
        Chapter
    },
    onLoad (option) {
        this.subject = option.subject - 1;
        uni.setNavigationBarTitle({
            title: this.abbrTitle[this.subject]
        });

        this.getChapterProgress();
    },
    methods: {
        getChapterProgress () {
            getChapterProgress({
                openID: getApp().globalData.openID,
                subject: this.subject + 1
            })
            .then(res => {
                if (res.code === 0) {
                    this.chapterArr = res.data;
                }
            })
            .catch(err => {
                uni.showToast({
                    title: err,
                    icon: 'none'
                });
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>