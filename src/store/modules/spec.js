import { reqSpecList, reqSpecTotal } from "../../util/request"

// 初始数据
const state = {
    SpecList: [], // 规格列表
    SpecTotal: 0, // 会员总数
    SpecSize: 2, // 一页条数
    SpecPage: 1 // 当前页 
}

// 修改数据方法
const mutations = {
    // 修改分类列表数据
    changeSpecList(state, arr) {
        state.SpecList = arr
    },
    // 修改总数列表数据
    changeSpecTotal(state, num) {
        state.SpecTotal = num
    },
    // 修改当前页列表数据
    changeSpecPage(state, num) {
        state.SpecPage = num
    }
}

// 接受组件方法
const actions = {
    // 列表更新
    SpecListActions(context, bool) {
        //传递一个bool,如果是true,那么就请求全部的规格，如果是false,就请求分页
        let params = bool ? {} : { size: context.state.SpecSize, page: context.state.SpecPage }
        reqSpecList(params).then(res => {
            let arr = res.data.list;
            // 把字符串数组还原一下
            arr.forEach(item => {
                item.attrs = JSON.parse(item.attrs)
            })
            context.commit("changeSpecList", arr)
        })
    },
    // 会员总数更新
    SpecTotalActions(context) {
        reqSpecTotal().then(res => {
            context.commit("changeSpecTotal", res.data.list[0].total)
        })
    },
    // 当前页更新，等待List.vue里页面触发回调函数传回页码
    SpecPageActions(context, page) {
        context.commit("changeSpecPage", page)
        context.dispatch("SpecListActions") // 页码更新后，随机更新列表数据
    }
}

// 导出数据
const getters = {
    SpecList(state) {
        return state.SpecList
    },
    // 会员总数
    SpecTotal(state) {
        return state.SpecTotal
    },
    // 一页条数
    SpecSize(state) {
        return state.SpecSize
    },
    // 当前页
    SpecPage(state) {
        return state.SpecPage
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