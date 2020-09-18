<template>
    <view class="content">
        <!-- 头像、昵称、性别、学校、座右铭、刷题目标 -->
        <ul class="container">
            <li class="avatar">
                <span>头像</span>   
                <view class="avatar-container" @click="chooseAvatar">
                    <uni-icons v-if="avatarUrl == null || avatarUrl == ''" type="person" size="40" color="#E2C9C9"></uni-icons>
                    <image v-else :src="avatarUrl"></image>
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
                <!-- 目标天数 -->
                <input v-if="item.name == 'goal'" type="number" v-model="item.val" maxlength="5"  placeholder="0"
                :class="{active: activeIndex == index? true: false}" 
                @click="changeStyle(index)" @blur="restoreStyle(index)">
                <!-- 其他输入框 -->
                <input v-if="item.name != 'gender' && item.name != 'goal'" type="text" v-model="item.val"
                :class="{active: activeIndex == index? true: false}" placeholder="未设置"
                @click="changeStyle(index)" @blur="restoreStyle(index)">
            </li>
        </ul>
        <button class="save" @click="saveUserInfo">保存设置</button>
    </view>
</template>

<script>
import uniIcons from '@/components/uni-notice-bar/uni-icons/uni-icons.vue';
import { USER_INFO_ITEMS } from '../../consts/const.js'
import { pathToBase64, base64ToPath } from 'image-tools';
import { getUserAllInfo, saveUserAllInfo } from '../../api/user'

export default { 
    data() {
        return {
            avatarUrl: '',
            activeIndex: -1,
            items: USER_INFO_ITEMS
        }
    },
    components: {
        uniIcons
    },
    onLoad() {
        this.getUserInfo();
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
                    this.items[2].val = (res.data.school == null || res.data.school == '') ?'': res.data.school;
                    this.items[3].val = (res.data.motto == null || res.data.motto == '') ?'': res.data.motto;
                    this.items[4].val = res.data.goal == null ? 0: res.data.goal;
                }
            }).catch(err => {
                uni.showToast({
                    title: err.errMsg,
                    icone: 'none'
                });
            })
        },
        saveUserInfo() {
            //昵称为空
            if(this.items[0].val == '' ) {
                uni.showToast({
                    title: '昵称不能为空',
                    icon: 'none'
                });
                return;
            }
            //目标天数非数字
            if(!/^[0-9]*$/.test(this.items[4].val)) {
                uni.showToast({
                    title: '刷题目标应为数字',
                    icon: 'none'
                });
                return;
            }
            this.items[4].val = this.items[4].val.length == 0? 0: parseInt(this.items[4].val);
            saveUserAllInfo({
                openID: getApp().globalData.openID,
                avatar: this.avatarUrl,
                nickname: this.items[0].val,
                gender: this.items[1].val,
                school: this.items[2].val == ''? null: this.items[2].val,
                motto: this.items[3].val == ''? null: this.items[3].val,
                goal: this.items[4].val
            }).then(res => {
                uni.showToast({
                    title: res.msg,
                    icon: 'none'
                })
            }).catch(err => {
                uni.showToast({
                    title: err.errMsg,
                    icone: 'none'
                })
            })
        },
        chooseAvatar() {
            let that = this;
            uni.chooseImage({
                count: 1,
                sourceType: ['album'],
                success: (res) => {
                    pathToBase64(res.tempFilePaths[0])
                        .then(base64 => {
                            that.avatarUrl = base64;
                        })
                }
            })
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
                // input.active {
                //     background: white;
                //     border: 2rpx solid #CE8B8B;
                //     border-radius: 22rpx;
                // }
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
                    uni-icons {
                        width: 80rpx; 
                        height: 80rpx;
                        position: absolute;
                        left: 10rpx; 
                        top: 5rpx;
                    }
                    image {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            li.goal input{
                width: 90rpx;
            }
            li.goal:after {
                content: '天'
            }
        }
        button::after {
            border: none;
        }
        .save {
            width: 100%;
            background: #CE8B8B;
            margin-top: 50rpx; 
            height: 70rpx;
            text-align: center;
            color: white;
            line-height: 70rpx;
            border-radius: 0;
        }
    }
</style>