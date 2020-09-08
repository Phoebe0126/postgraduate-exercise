import request from './common/request';

const BASE_URL = 'http://47.106.170.118/ques';

// 获取随机题目
export function getRandomQuestions () {
    return request(`${BASE_URL}/getRandom`, {
        method: 'GET'
    })
}
