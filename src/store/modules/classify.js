import { reqCateList } from "../../util/request"

// 初始数据
const state = {
    //分类列表
    ClassList: []
}

// 修改数据方法
const mutations = {
    // 修改分类列表数据
    changeClassList(state, arr) {
        state.ClassList = arr
    }
}

// 接受组件方法
const actions = {
    ClassListAction(context) {
        reqCateList({ istree: true }).then(res => {
            let arr = res.data.list ? res.data.list : []
            context.commit("changeClassList", arr)
        })
    }
}

// 导出数据
const getters = {
    ClassList(state) {
        return state.ClassList
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