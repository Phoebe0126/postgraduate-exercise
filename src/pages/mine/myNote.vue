<template>
  <view class="content"> 
      <view class="header">
        <subject-select-box @changeSubject="changeSubject"></subject-select-box>
      </view>
      <my-note-list :items="items" :key="noteListKey"  @naviToquesPage="naviToquesPage"></my-note-list>
  </view>
</template>

<script>
import { SUBJECT_SHORT_TITLE} from '../../consts/const'
import subjectSelectBox from '@/components/subject-select-box.vue';
import myNoteList from '@/components/mynote-list.vue';
import { getSubjectNotes } from '../../api/note'


export default {
    data() {
        return {
            subjects: SUBJECT_SHORT_TITLE,
            subject: '马原',
            items: [],
            noteListKey: 0
        }
    },
    components: {
        subjectSelectBox,
        myNoteList
    },
    onLoad() {
        this.getMyNoteBySubject();
    },
    methods: {
        naviToquesPage (quesId) {
            uni.showLoading({
                title: '加载中'
            });
            uni.navigateTo({
                url: `../question/index?id=${quesId}`
            });
        },
        changeSubject(subjectName){
            this.subject = subjectName;
            this.getMyNoteBySubject();
            this.noteListKey += 1;
        },
        getSubjectIndex() {
            for(let i in SUBJECT_SHORT_TITLE) {
                if(SUBJECT_SHORT_TITLE[i] == this.subject) {
                    return parseInt(i) + 1;
                }
            }
            return -1;
        },
        getMyNoteBySubject() {
            let that = this;
            getSubjectNotes({
                openID: getApp().globalData.openID,
                subject: that.getSubjectIndex()
            }).then(res => {
                if(res.code == 0) {
                    this.items = res.data;
                }
                else {
                    this.items = [];
                    uni.showToast({
                        title: res.msg,
                        icon: 'none'
                    })
                }
            })
        }
    }
}
</script>

<style lang="scss">
    page {
        background: #E0E0E0;
    }
    .header {
        height: 100rpx;
        background: white;
        position: relative;
        subject-select-box {
            position: absolute;
            top: 20rpx;
            left: 30rpx;
        }
    }
</style>