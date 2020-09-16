import request from './common/request';

const BASE_URL = 'https://www.jessi.club:8000/user';

// 获取用户的openId
export function getUserOpenId (params) {
    return request('https://api.weixin.qq.com/sns/jscode2session', {
        method: 'GET',
        params: params
    });
}

// 获取用户的openId
export function getOpenId (params) {
    return request(`${BASE_URL}/getOpenID`, {
        method: 'POST',
        data: params
    })
}

// 获取用户头像、昵称以及坚持天数
export function getUserShortInfo (params) {
    return request(`${BASE_URL}/getUser`, {
        method: 'POST',
        data: params
    })
}

//获取用户详细信息
export function getUserAllInfo (params) {
    return request(`${BASE_URL}/getUserInfo`, {
        method: 'POST',
        data: params
    })
}

// 存入用户的首页个人信息
export function saveUserShortInfo (params) {
    return request(`${BASE_URL}/saveUser`, {
        method: 'POST',
        data: params
    })
}

//保存用户详细信息
export function saveUserAllInfo (params) {
    return request(`${BASE_URL}/saveUserInfo`, {
        method: 'POST',
        data: params
    })
}

// 坚持天数最多的20名用户
export function getNumRank (data) {
    return request(`${BASE_URL}/getNumRank`, {
        method: 'POST',
        data
    })
}

// 刷题数量最多的20名用户
export function getDaysRank (data) {
    return request(`${BASE_URL}/getDaysRank`, {
        method: 'POST',
        data
    })
}