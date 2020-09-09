import request from './common/request';

const BASE_URL = 'http://49.234.89.20:3000/ques';

// 获取随机题目
export function getRandomQuestions () {
    return request(`${BASE_URL}/getRandom`, {
        method: 'GET'
    })
}
// 获取错题重练的题目
export function getWrongQuestions (params) {
    return request(`${BASE_URL}/getWrong`,{
        method: 'POST',
        data: params
    })
}

// 获取章节题目
export function getChapterQuestions (params) {
    return request(`${BASE_URL}/getChapter`, {
        method: 'GET',
        params: params
    })
}
