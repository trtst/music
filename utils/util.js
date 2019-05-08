const domain = 'http://localhost:3000';
const urls = {
    'banners': '/banner',
    'login': '/login/cellphone',
    'personalized': '/personalized',
    'newsong': '/personalized/newsong',
    'djprogram': '/personalized/djprogram'
}
const http = (op = {}) => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: domain + op.path,
            ...op,
            method: op.method || 'GET',
            success: function(res) {
                resolve(res)
            },
            fail: function(res) {
                reject(res)
            }
        })
    });
}

const formatPlayCount = function (count) {
    var minNumber = 99999;
    var maxNumber = 99999999
    var formatCount = count;
    if (count && count > minNumber) { // 10万或10万以上
        formatCount = (count / 10000).toFixed(1) + '万';
        if (count > maxNumber) {
            formatCount = (count / 100000000).toFixed(1) + '亿';
        }
    }
    return formatCount;
}

module.exports = {
    http: http,
    urls: urls,
    formatPlayCount: formatPlayCount
}
