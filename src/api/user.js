import request from './common/request';

// 获取用户的openId

export function getUserOpenId (params) {
    return request('https://api.weixin.qq.com/sns/jscode2session', {
        method: 'GET',
        params: params
    });
}