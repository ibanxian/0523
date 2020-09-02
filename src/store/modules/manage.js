import { reqUserList, reqUserCount } from "../../util/request"

// 初始数据
const state = {
    Userlist: [], // 管理员列表
    UserTotal: 0, // 管理员总数
    size: 2, // 一页的数量
    page: 1, // 当前页码
}

// 状态,修改初始数据
const mutations = {
    // 修改列表数据
    changeUserList(state, arr) {
        state.Userlist = arr
    },
    // 修改总数数据
    changeUserTotal(state, num) {
        state.UserTotal = num
    },
    // 修改当前页码
    chnageUserPage(state, page) {
        state.page = page
    }
}

// 接收组件方法
const actions = {
    // 获取列表的请求
    UserListActions(context) {
        reqUserList({ page: context.state.page, size: context.state.size }).then(res => {
            let arr = res.data.list ? res.data.list : []
            context.commit("changeUserList", arr)
        })
    },
    // 获取总数的请求
    UserTotalActions(context) {
        reqUserCount().then(res => {
            context.commit("changeUserTotal", res.data.list[0].total)
        })
    },
    // 获取当前页码请求
    UserPageActions(context, page) {
        context.commit("chnageUserPage", page)
        //重新请求列表数据
        context.dispatch("UserListActions")
    }
}

const getters = {
    // 导出管理员列表
    Userlist(state) {
        return state.Userlist
    },
    // 导出管理员总数
    UserTotal(state) {
        return state.UserTotal
    },
    // 导出一页数量
    size(state) {
        return state.size
    },
    // 导出当前页码
    page(state) {
        return state.page
    },
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}