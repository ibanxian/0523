import { reqSeckList } from "../../util/request"

// 初始数据
const state = {
    //菜单列表
    SeckList: []
}

// 修改数据方法
const mutations = {
    // 修改菜单列表数据
    changeSeckList(state, arr) {
        state.SeckList = arr
    }
}

// 接受组件方法
const actions = {
    SeckListActions(context) {
        reqSeckList().then(res => {
            let arr = res.data.list ? res.data.list : []
            context.commit("changeSeckList", arr)
        })
    }
}

// 导出数据
const getters = {
    SeckList(state) {
        return state.SeckList
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