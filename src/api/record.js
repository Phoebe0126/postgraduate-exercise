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