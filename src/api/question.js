import request from './common/request';

const BASE_URL = 'http://49.234.89.20:3000/ques';

// 获取随机题目
export function getRandomQuestions () {
    return request(`${BASE_URL}/getRandom`, {
        method: 'GET'
    })
}
// 获取错题重练的题目
export function getWrongQuestions (data) {
    return request(`${BASE_URL}/getWrong`,{
        method: 'POST',
        data
    })
}

// 获取章节题目
export function getChapterQuestions (params) {
    return request(`${BASE_URL}/getChapter`, {
        method: 'GET',
        params
    })
}

// 获取一套模拟题
export function getSimulation () {
    return request(`${BASE_URL}/getSimulation`, {
        method: 'GET'
    })
}

//获取收藏的题目
export function getCollected(data) {
    return request(`${BASE_URL}/getCollected`, {
        method: 'POST',
        data
    })
}

//获取某科目下的所有章节名 
export function getChapterNames(params) {
    return request(`${BASE_URL}/getChapterNames`, {
        method: 'GET', 
        params
    })
}