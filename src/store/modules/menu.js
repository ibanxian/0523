import { reqMenuList } from "../../util/request"

// 初始数据
const state = {
    //菜单列表
    MenuList: []
}

// 修改数据方法
const mutations = {
    // 修改菜单列表数据
    changeMenuList(state, arr) {
        state.MenuList = arr
    }
}

// 接受组件方法
const actions = {
    MenuListAction(context) {
        reqMenuList({ istree: true }).then(res => {
            let arr = res.data.list ? res.data.list : []
            context.commit("changeMenuList", arr)
        })
    }
}

// 导出数据
const getters = {
    MenuList(state) {
        return state.MenuList
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