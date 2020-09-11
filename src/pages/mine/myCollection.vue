<template>
    <view class="content">
        <!-- 科目选择 -->
        <view class="header">
            <subject-select-box @changeSubject="changeSubject"></subject-select-box>
        </view>
        <my-collect-list :items="items" :key="collectListKey"></my-collect-list>
    </view>
</template>

<script>
import { SUBJECT_SHORT_TITLE} from '../../consts/const'
import subjectSelectBox from '@/components/subject-select-box.vue';
import myCollectList from '@/components/mycollect-list.vue';
import { getCollected } from '../../api/question'

export default {
    data() {
        return {
            subjects: SUBJECT_SHORT_TITLE,
            subject: '马原',
            items: [],
            collectListKey: 0
        }
    },
    components: {
        subjectSelectBox,
        myCollectList
    },
    // ons() {
       
    // },
    onLoad(){
        this.subject = '马原'
        this.getMyCollectBySubject();
    },
    methods: {
        changeSubject(subjectName){
            this.subject = subjectName;
            this.getMyCollectBySubject();
            this.collectListKey += 1;
        },
        getSubjectIndex() {
            for(let i in SUBJECT_SHORT_TITLE){
                if(SUBJECT_SHORT_TITLE[i] == this.subject) {
                    return parseInt(i) +1 ;
                }
            }
            return -1;
        },
        getMyCollectBySubject() {
            let that = this;
            getCollected({
                openID: getApp().globalData.openID,
                subject: that.getSubjectIndex()
            }).then(res => {
                if(res.code == 0) {
                    this.items = res.data;
                }
                else {
                    this.items = [];
                    uni.showToast({
                        title:res.msg,
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
        // top: 0;
        height: 100rpx;
        background:white;
        position: relative;
        subject-select-box {
            position: absolute;
            top: 20rpx;
            left: 30rpx;
        }
    }
</style>