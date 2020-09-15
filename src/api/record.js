import request from './common/request';

const BASE_URL = 'https://www.jessi.club:8000/record';

// 获取各科目的用户信息
export function getTotalProgress (data) {
    return request(`${BASE_URL}/totalProgress`, {
        method: 'POST',
        data
    })
}

// 获取单独科目的章节信息
export function getChapterProgress (data) {
    return request(`${BASE_URL}/chapterProgress`, {
        method: 'POST',
        data
    })
}

// 将某题划分为错题
export function setMarkFaulty (data) {
    return request(`${BASE_URL}/markFaulty`, {
        method: 'POST',
        data
    })
}

// 将某题划分为做对的记录
export function setMarkDone (data) {
    return request(`${BASE_URL}/markDone`, {
        method: 'POST',
        data
    })
}

// 收藏题目
export function collect (data) {
    return request(`${BASE_URL}/collect`, {
        method: 'POST',
        data
    })
}

// 取消收藏
export function cancelCollection (data) {
    return request(`${BASE_URL}/cancelCollection`, {
        method: 'POST',
        data
    })
}

// 某道题是否收藏
export function checkIsCollected (data) { 
    return request(`${BASE_URL}/isCollected`, {
        method: 'POST',
        data
    })
 }

// 提交模拟题的做题结果
export function saveSimulationResult (data) {
    return request(`${BASE_URL}/saveSimulationResult`, {
        method: 'POST',
        data
    })
}