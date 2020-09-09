import request from './common/request';

const BASE_URL = 'http://49.234.89.20:3000/note';

// 为某题添加或更新笔记
export function addNote (data) {
    return request(`${BASE_URL}/addNote`, {
        method: 'POST',
        data
    })
}
