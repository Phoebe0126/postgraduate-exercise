import request from './common/request';

const BASE_URL = 'http://49.234.89.20:3000/ques';

// 获取随机题目
export function getRandomQuestions () {
    return request(`${BASE_URL}/getRandom`, {
        method: 'GET'
    })
}
