import request from './common/request';

const BASE_URL = 'http://47.106.170.118/record';

// 获取各科目的用户信息
export function getTotalProgress (params) {
    return request(`${BASE_URL}/totalProgress`, {
        method: 'POST',
        data: params
    })
}

// 获取单独科目的章节信息
export function getChapterProgress (params) {
    return request(`${BASE_URL}/chapterProgress`, {
        method: 'POST',
        data: params
    })
}

// 将某题划分为错题
export function setMarkFaulty (params) {
    return request(`${BASE_URL}/markFaulty`, {
        method: 'POST',
        data: params
    })
}

// 将某题划分为做对的记录
export function setMarkDone (params) {
    return request(`${BASE_URL}/markDone`, {
        method: 'POST',
        data: params
    })
}
