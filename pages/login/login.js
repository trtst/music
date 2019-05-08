// pages/login/login.js
const util = require('../../utils/util.js');

Page({
    data: {
        user: '',
        passwd: '',
    },
    //用户名和密码输入框事件
    usernameInput: function (e) {
        this.setData({
            user: e.detail.value
        })
    },
    passwordInput: function (e) {
        this.setData({
            passwd: e.detail.value
        })
    },
    loginHandler () {
        const self = this;
        const { user, passwd } = self.data;

        util.http({
            path: util.urls.login,
            data: {
                phone: '17600198974',
                password: 'iMusic2215670~'
            }
        }).then(res => {
            console.log(res)
        })
    }
})