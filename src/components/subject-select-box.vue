<template>
  <view class="content"> 
      <view class="subject-select-box">
          <view class="selected subject-option" @click="changeShowAll" :class="{showAll: showAll}">
              <span>{{ selectedSubject }}</span>
              <i></i>
          </view>
          <view v-for="(subject, index) in subjects" :key="index" class="subject-option" @click="changeSelect(subject)"
            :class="{showAll: showAll}">
              <span>{{ subject }}</span>
          </view>
      </view>
  </view>
</template>

<script>
import { SUBJECT_SHORT_TITLE} from '../consts/const'

export default {
    data() {
        return {
            subjects: SUBJECT_SHORT_TITLE.slice(1, 4),
            selectedSubject: '马原',
            showAll: false
        }
    },
    methods: {
        changeShowAll() {
            this.showAll = !this.showAll;
        },
        changeSelect(subjectName) {
            let before = this.selectedSubject;
            this.selectedSubject = subjectName;
            //删除选中的科目
            for(let i in this.subjects) {
                if(this.subjects[i] == subjectName) {
                    this.subjects[i] = before;
                    break;
                }
            } 
            this.$emit('changeSubject', subjectName);
            this.changeShowAll();
        }
    }
}
</script>

<style lang="scss">
    .subject-select-box {
        width: 200rpx; 
        height: 240rpx;
        border-radius: 16rpx;
        overflow: hidden;
        .subject-option {
            width: 200rpx; 
            height: 60rpx;
            background: #DCCBCB;
            color: white;
            position: relative;
            display: none;
            span {
                line-height: 60rpx;
                margin-left: 30rpx;
            }
        }
        .subject-option.selected {
            display: block;
            border-radius: 16rpx;
            i {
                display: block;
                background: url('/static/select.png') center center;
                width: 30rpx;
                height: 30rpx;
                position: absolute;
                right: 30rpx;
                top: 12rpx;
            }
        }
        .subject-option.selected.showAll {
            border-radius: 16rpx 16rpx 0 0;
        }
        .subject-option.showAll {
            display: block;
            z-index: 1000;
        }
    }
</style>