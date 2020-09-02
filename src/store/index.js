import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

import actions from "./actions"
import { state, mutations, getters } from "./mutations"
// 引入分仓库文件
import menu from "./modules/menu"
import role from "./modules/role"
import manage from "./modules/manage"
import member from "./modules/member"
import classify from "./modules/classify"
import spec from "./modules/spec"
import banner from "./modules/banner"
import goods from "./modules/goods"
import user from "./modules/user";

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules: {
        menu,
        role,
        manage,
        member,
        classify,
        spec,
        banner,
        goods,
        user
    }
})