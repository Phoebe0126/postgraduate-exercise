import request from './common/request';

const BASE_URL = 'http://47.106.170.118';

// 获取用户的openId
export function getUserOpenId (params) {
    return request('https://api.weixin.qq.com/sns/jscode2session', {
        method: 'GET',
        params: params
    });
}

// 获取用户头像和昵称
export function getUserShortInfo (params) {
    return request(`${BASE_URL}/user/getUser`, {
        method: 'POST',
        data: params
    })
}

// 存入用户的首页个人信息
export function saveUserShortInfo (params) {
    return request(`${BASE_URL}/user/saveUser`, {
        method: 'POST',
        data: params
    })
}