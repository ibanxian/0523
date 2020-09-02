import { reqBannerList } from "../../util/request"

// 初始数据
const state = {
    //轮播图列表
    BannerList: []
}

// 修改数据方法
const mutations = {
    // 修改轮播图列表数据
    changeBannerList(state, arr) {
        state.BannerList = arr
    }
}

// 接受组件方法
const actions = {
    BannerListActions(context) {
        reqBannerList().then(res => {
            let arr = res.data.list ? res.data.list : []
            context.commit("changeBannerList", arr)
        })
    }
}

// 导出数据
const getters = {
    BannerList(state) {
        return state.BannerList
    }
}

// 导出分仓库
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}