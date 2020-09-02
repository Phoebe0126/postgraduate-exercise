// // 封装异步请求
// uni.showLoading({
//     title: '加载中'
// });
export default (url, paramsObj) => {
    // 处理参数 params method data
    let { method, params, data } = paramsObj;
    if (method === 'GET') {
        if (!url.includes('?')) {
            url += '?';
        }

        url = Object.keys(params).reduce((pre, key) => {
           return `${pre}${key}=${params[key]}&`
        }, url);
        url = url.slice(0, url.length - 1);

        return new Promise((resolve, reject) => {
            wx.request({
                url,
                method,
                success(res) {
                    resolve(res.data)
                },
                fail(err) {
                    reject(err)
                },
                complete() {
                    uni.hideLoading();
                },
                // 跨域
                withCredentials: true
            })
        })
    }
    // POST请求添加data请求体
    return new Promise((resolve, reject) => {
        wx.request({
            url,
            method,
            data,
            success(res) {
                resolve(res.data)
            },
            fail(err) {
                reject(err)
            },
            complete() {
                uni.hideLoading();
            },
            // 跨域
            withCredentials: true
        })
    })
   
}