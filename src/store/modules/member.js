import { reqMemberList, reqMemberTotal } from "../../util/request"

// 初始数据
const state = {
    MemberList: [], // 列表数据
    MemberTotal: 0, // 会员总数
    MemberSize: 2, // 一页条数
    MemberPage: 1 // 当前页 
}

// 修改数据
const mutations = {
    // 修改列表数据
    changeMember(state, arr) {
        state.MemberList = arr
    },
    // 修改会员总数
    changeMemberTotal(state, num) {
        state.MemberTotal = num
    },
    // 修改当前页
    changeMemberPage(state, page) {
        state.MemberPage = page
    }
}

// 接收组件方法
const actions = {
    // 列表更新
    MemberListActions(context) {
        reqMemberList({ size: context.state.MemberSize, page: context.state.MemberPage }).then(res => {
            let arr = res.data.list ? res.data.list : [] // 判断当前有没有列表数据
            context.commit("changeMember", arr)
        })
    },
    // 会员总数更新
    MemberTotalActions(context) {
        reqMemberTotal().then(res => {
            context.commit("changeMemberTotal", res.data.list[0].total)
        })
    },
    // 当前页更新，等待List.vue里页面触发回调函数传回页码
    MemberPageActions(context, page) {
        context.commit("changeMemberPage", page)
        context.dispatch("MemberListActions") // 页码更新后，随机更新列表数据
    }
}

// 导出数据
const getters = {
    // 列表数据
    MemberList(state) {
        return state.MemberList
    },
    // 会员总数
    MemberTotal(state) {
        return state.MemberTotal
    },
    // 一页条数
    MemberSize(state) {
        return state.MemberSize
    },
    // 当前页
    MemberPage(state) {
        return state.MemberPage
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}