<template>
   <view>
        <chapter
            v-for="(item, index) in ChapterArr"
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

export default {
    data () {
        return {
            // 上方的习题标题
            abbrTitle: SUBJECT_ABBR_TITLE,
            // 章节数组
            ChapterArr: [{
                chapterNumber: 1,
                chapter: '万万万依i',
                totalNum: 12,
                doneNum: 2
            }, {
                chapterNumber: 2,
                chapter: '暗示大家',
                totalNum: 12,
                doneNum: 2
            }],
            // 科目ID
            subject: 0
        }
    },
    components: {
        Chapter
    },
    onLoad (option) {
        // todo获取请求
        this.subject = option.subject - 1;
        uni.setNavigationBarTitle({
            title: this.abbrTitle[this.subject]
        });
    }
}
</script>

<style>

</style>