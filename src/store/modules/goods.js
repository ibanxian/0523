import { reqGoodsList, reqGoodsTotal } from "../../util/request"

// 初始数据
const state = {
    GoodsList: [], // 商品列表
    GoodsTotal: 0, // 商品总数
    GoodsSize: 2, // 一页条数
    GoodsPage: 1 // 当前页 
}

// 修改数据方法
const mutations = {
    // 修改商品列表数据
    changeGoodsList(state, arr) {
        state.GoodsList = arr
    },
    // 修改总数列表数据
    changeGoodsTotal(state, num) {
        state.GoodsTotal = num
    },
    // 修改当前页列表数据
    changeGoodsPage(state, num) {
        state.GoodsPage = num
    }
}

// 接受组件方法
const actions = {
    // 列表更新
    GoodsListActions(context, bool) {
        //传递一个bool,如果是true,那么就请求全部的规格，如果是false,就请求分页
        let params = bool ? {} : { size: context.state.GoodsSize, page: context.state.GoodsPage }
        reqGoodsList(params).then(res => {
            let arr = res.data.list ? res.data.list : []
            context.commit("changeGoodsList", arr)
        })
    },
    // 商品总数更新
    GoodsTotalActions(context) {
        reqGoodsTotal().then(res => {
            context.commit("changeGoodsTotal", res.data.list[0].total)
        })
    },
    // 当前页更新，等待List.vue里页面触发回调函数传回页码
    GoodsPageActions(context, page) {
        context.commit("changeGoodsPage", page)
        context.dispatch("GoodsListActions") // 页码更新后，随机更新列表数据
    }
}

// 导出数据
const getters = {
    GoodsList(state) {
        return state.GoodsList
    },
    // 商品总数
    GoodsTotal(state) {
        return state.GoodsTotal
    },
    // 一页条数
    GoodsSize(state) {
        return state.GoodsSize
    },
    // 当前页
    GoodsPage(state) {
        return state.GoodsPage
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