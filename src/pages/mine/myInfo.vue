<template>
    <view class="content">
        <!-- 头像、昵称、性别、学校、座右铭、刷题目标 -->
        <ul class="container">
            <li class="avatar">
                <span>头像</span>
                <image :src="avatarUrl"></image>
            </li>
            <li v-for="(item, index) in items" :key="item.id" :class="item.name">
                <span>{{ item.desc }}</span>
                <input type="text" 
                :value="getValue(index)"
                :class="{active: activeIndex == index? true: false}" 
                @click="changeStyle(index)" @blur="restoreStyle(index)" maxlength="25">
            </li>
        </ul>
        <input type="button" value="保存设置" class="save">
    </view>
</template>

<script>
export default {
    data() {
        return {
            avatarUrl: 'https://thirdwx.qlogo.cn/mmopen/vi_32/oUicWDFmZmf8qgfY0NLmIwedj9uDt28tUpIsadMjbQwC2IhQBgzphWY83CWiaaxteQ4XR07kvicvrUibkFdaQqBzLg/132',
            nickname: '小陈小陈早点睡觉',
            gender: '女',
            school: '华中科技大学',
            motto: '书山有路勤为径，学海无涯苦作舟。书山有路勤为径，学海无涯苦作舟.',
            goal: 150,
            activeIndex: -1,
            items: [
                {id: 1, name: 'nickname', val: '', desc: '昵称'},
                {id: 2, name: 'gender', val: '', desc: '性别'},
                {id: 3, name: 'school', val: '', desc: '学校'},
                {id: 4, name: 'motto', val: '', desc: '座右铭'},
                {id: 5, name: 'goal', val: '', desc: '刷题目标'},
            ]
        }
    },
    methods: {
        changeStyle(index) {
            this.activeIndex = index;
        },
        restoreStyle(index) {
            this.activeIndex = -1;
        },
        getValue(index) {
            switch(index) {
                case 0: return this.nickname; 
                case 1: return this.gender; 
                case 2: return this.school; 
                case 3: return this.motto; 
                case 4: return this.goal; 
            }
        }
    }
}
</script>

<style lang="scss">
    .content {
        background: #E0E0E0;
        position: absolute;
        top: 0;
        bottom: 0;
        font-size: 30rpx;
        font-family: Microsoft Yahei;
        .container {
            overflow: hidden;
            width: 100%;
            margin-top: 20rpx; 
            padding: 0;
            li {
                background: #DCCBCB; 
                width: 100%;
                float: left;
                height: 90rpx; 
                list-style: none;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: left;
                padding: 0 30rpx;
                span {
                    width: 20%;
                }
                input {
                    width: 70%;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    text-indent: 16rpx;
                    border: 2rpx solid transparent;
                }
                input.active {
                    background: white;
                    border: 2rpx solid #CE8B8B;
                    border-radius: 22rpx;
                }
            }
            li:nth-of-type(1) {
                border-bottom: 2rpx solid white;
            }
            // li:nth-of-type(2) {
                // border-bottom: 2rpx solid white;
            // }
            li:nth-of-type(4) {
                margin-top: 20rpx;
                border-bottom: 2rpx solid white;
            }
            .avatar {
                height: 130rpx;
                image {
                    width: 100rpx; 
                    height: 100rpx; 
                    border-radius: 20%;
                    position: relative;
                    left: 20rpx;
                }
            }
            li.goal input{
                width: 96rpx;
            }
            li.goal:after {
                content: ' 天'
            }
        }
        .save {
            width: 100%;
            background: #CE8B8B;
            margin-top: 50rpx; 
            height: 70rpx;
            text-align: center;
            color: white;
        }
    }
</style>