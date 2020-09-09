import request from './common/request';

const BASE_URL = 'http://49.234.89.20:3000/note';

// 为某题添加或更新笔记
export function addNote (data) {
    return request(`${BASE_URL}/addNote`, {
        method: 'POST',
        data
    })
}

//获取用户某科目下的所有笔记
export function getSubjectNotes (data) {
    return request(`${BASE_URL}/getSubjectNotes`, {
        method: 'POST',
        data
    })
}
