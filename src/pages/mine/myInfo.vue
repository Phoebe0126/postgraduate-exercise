<template>
    <view class="content">
        <!-- 头像、昵称、性别、学校、座右铭、刷题目标 -->
        <ul class="container">
            <li class="avatar">
                <span>头像</span>
                <view class="avatar-container">
                    <!-- <uni-icons v-if="!avatarUrl" type="person" size="40" color="#E2C9C9"></uni-icons> -->
                    <image v-if="avatarUrl" :src="avatarUrl"></image>
                </view>   
            </li>
            <li v-for="(item, index) in items" :key="item.id" :class="item.name">
                <span>{{ item.desc }}</span>
                <!-- 性别 -->
                <radio-group @change="genderChange" class="genderRadio" v-model="item.val" >
                    <!-- 男 -->
                    <radio v-if="item.name == 'gender'" value=1 :checked="item.val == 1" color="#CE8B8B"></radio>
                    <span v-if="item.name == 'gender'">男</span>
                    <!-- 女 -->
                    <radio v-if="item.name == 'gender'" value=2 :checked="item.val == 2" color="#CE8B8B"></radio>
                    <span v-if="item.name == 'gender'">女</span>
                </radio-group>
                <!-- 其他输入框 -->
                <input v-if="item.name != 'gender'" type="text" v-model="item.val"
                :class="{active: activeIndex == index? true: false}" 
                @click="changeStyle(index)" @blur="restoreStyle(index)">
            </li>
        </ul>
        <input type="button" value="保存设置" class="save" @click="saveUserInfo">
    </view>
</template>

<script>
import {USER_INFO_ITEMS} from '../../consts/const.js'
import {getUserAllInfo, saveUserAllInfo} from '../../api/user'

export default {
    data() {
        return {
            avatarUrl: '',
            activeIndex: -1,
            items: USER_INFO_ITEMS
        }
    },
    onLoad() {
        this.getUserInfo();
    },
    onUnload() {
        let pages = getCurrentPages();
        let parentPage = pages[pages.length - 2];
        parentPage.onLoad();
    },
    methods: {
        changeStyle(index) {
            this.activeIndex = index;
        },
        restoreStyle(index) {
            this.activeIndex = -1;
        },
        genderChange(e) {
            this.items[1].val = e.detail.value;
        },
        getUserInfo() {
            getUserAllInfo({
                openID: getApp().globalData.openID
            }).then(res => {
                if(res.code == 0) {
                    this.avatarUrl = res.data.avatar;
                    this.items[0].val = res.data.nickname;
                    this.items[1].val = res.data.gender;
                    this.items[2].val = res.data.school == null ?'未设置': res.data.school;
                    this.items[3].val = res.data.motto == null ?'未设置': res.data.motto;
                    this.items[4].val = res.data.goal == null ? '未设置': res.data.goal;
                }
            }).catch(err => console.log(err))
        },
        saveUserInfo() {
            saveUserAllInfo({
                openID: getApp().globalData.openID,
                avatar: this.avatarUrl,
                nickname: this.items[0].val,
                gender: this.items[1].val,
                school: this.items[2].val,
                motto: this.items[3].val,
                goal: this.items[4].val
            }).then(res => {
                if(res.code == 0) {
                    console.log(res.msg)
                }
            }).catch(err => console.log(err))
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
                    padding: 0 10rpx;
                    border: 2rpx solid transparent;
                }
                input.active {
                    background: white;
                    border: 2rpx solid #CE8B8B;
                    border-radius: 22rpx;
                }
                .genderRadio {
                    radio:nth-of-type(2) {
                        margin-left: 80rpx;
                    }
                }
            }
            li:nth-of-type(1) {
                border-bottom: 2rpx solid white;
            }
            li:nth-of-type(2), li:nth-of-type(5) {
                border-bottom: 1rpx solid white;
            }
            li:nth-of-type(4) {
                margin-top: 20rpx;
                border-bottom: 2rpx solid white;
            }
            .avatar {
                height: 130rpx;
                &-container {
                    background: white;  
                    width: 100rpx; 
                    height: 100rpx; 
                    border-radius: 20%;
                    overflow: hidden;
                    position: relative;
                    left: 10rpx;
                    image {
                        // width: 100rpx; 
                        // height: 100rpx; 
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            li.goal input{
                width: 80rpx;
            }
            li.goal:after {
                content: '天'
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