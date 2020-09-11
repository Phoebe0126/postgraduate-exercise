import request from './common/request';

const BASE_URL = 'http://49.234.89.20:3000/notice';

// 修改公告栏的内容
export function saveNotice (data) {
    return request(`${BASE_URL}/saveNotice`, {
        method: 'POST',
        data
    })
}

// 获取公告栏内容
export function getNotice () {
    return request(`${BASE_URL}/getNotice`, {
        method: 'GET'
    })
}