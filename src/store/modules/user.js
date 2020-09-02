const state = {
    // 如果本地存储有用户信息，就赋值给Info
    Info: sessionStorage.getItem('Info') ? JSON.parse(sessionStorage.getItem('Info')) : {}
}

const mutations = {
    // 修改用户信息
    changeInfo(state, info) {
        state.Info = info;
        if (info.username) {
            //数据同步到本地存储中
            sessionStorage.setItem("Info", JSON.stringify(info))
        } else {
            sessionStorage.removeItem("Info")
        }

    }
}

const actions = {
    // 登录页面触发的修改用户信息
    InfoActions({ commit }, info) {
        commit("changeInfo", info)
    },
    // InfoActions(context, info) {
    //     context.commit("changeInfo", info)
    // }
}

const getters = {
    //导出
    Info(state) {
        return state.Info
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}