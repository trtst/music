// pages/index/index.js
const util = require('../../utils/util.js');

Page({
    data: {
        banners: [],
        recommend: [{
                id: 1,
                name: '私人FM',
                icon: '../../assets/img/cm4_disc_topbtn_fm@2x.png',
                url: '',
            }, {
                id: 2,
                name: '每日推荐',
                icon: '../../assets/img/cm4_disc_topbtn_daily@2x.png',
                url: '',
            }, {
                id: 3,
                name: '歌单',
                icon: '../../assets/img/cm4_disc_topbtn_list@2x.png',
                url: '',
            }, {
                id: 4,
                name: '排行榜',
                icon: '../../assets/img/cm4_disc_topbtn_rank@2x.png',
                url: '',
            },
        ],
        today: (new Date()).getDate(), // 每日推荐
        songList: [], //  推荐歌单  最新音乐  主播电台
        slideParams: {
            indicatorDots: true,
            autoplay: true,
            interval: 5000,
            duration: 1000
        }
    },
    onLoad: function (options) {
        const self = this;

        self.getBanners();
        self.getSongsList();
    },
    getBanners () {
        const self = this;

        util.http({
            path: util.urls.banners,
        }).then(res => {
            if (res.data.code === 200) {
                self.setData({
                    banners: res.data.banners
                })
            }
        });
    },
    getSongsList () {
        const self = this;

        // 获取【推荐歌单】
        const remdSong = util.http({
            path: util.urls.personalized,
            data: {
                limit: 6
            }
        });

        // 获取【最新音乐】
        const newSong = util.http({
            path: util.urls.newsong,
            data: {
                limit: 6
            }
        });

        // 获取【主播电台】
        const djprogram = util.http({
            path: util.urls.djprogram,
            data: {
                limit: 6
            }
        });

        Promise.all([remdSong, newSong, djprogram])
            .then(result => {
                const d = [];

                result.map((item) => {
                    d.push(item.data.result);
                });
                self.setData({
                    songList: d
                });
            })
            .catch(e => console.log(e));
    }
})