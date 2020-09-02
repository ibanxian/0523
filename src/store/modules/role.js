import { reqRoleList } from "../../util/request"

// 初始数据
const state = {
    //角色列表
    RoleList: []
}

// 修改数据方法
const mutations = {
    // 修改角色列表数据
    changeRoleList(state, arr) {
        state.RoleList = arr
    }
}

// 接受组件方法
const actions = {
    RoleListAction(context) {
        reqRoleList({ istree: true }).then(res => {
            let arr = res.data.list ? res.data.list : []
            context.commit("changeRoleList", arr)
        })
    }
}

// 导出数据
const getters = {
    RoleList(state) {
        return state.RoleList
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