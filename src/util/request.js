import axios from "axios"
import qs from "qs"
import store from "../store" // 引入仓库
import { warningAlert } from "./alert"
// 默认地址
let baseUrl = "/api";

//请求拦截
axios.interceptors.request.use(config => {
    // 如果是登录页面，直接反馈config
    if (config.url == baseUrl + "/api/userlogin") {
        return config;
    }
    // 登录后把用户token写在请求头上
    config.headers.authorization = store.state.user.Info.token;
    return config;
})
// 响应拦截
axios.interceptors.response.use(res => {
    console.group("====本次请求的地址是：" + res.config.url + "====");
    console.log(res);
    console.groupEnd();
    // 如果登入过期，遇到以下情况
    if (res.data.msg === "登录已过期或访问权限受限") {
        warningAlert("登录已过期或访问权限受限")
        // 清空info
        store.dispatch("uer/InfoActions", {})
        // 跳转到登录 
        router.push("/login")
    }
    return res;
})

// ************** 栏目管理开始 ************** //
// 栏目管理-添加菜单
export const reqMenuAdd = (form) => {
    return axios({
        url: baseUrl + "/api/menuadd",
        method: "post",
        data: qs.stringify(form)
    })
}
// 栏目管理-菜单列表
export const reqMenuList = (params) => {
    return axios({
        url: baseUrl + "/api/menulist",
        method: "get",
        params: params
    })
}
// 栏目管理-菜单详情
export const reqMenuDetail = (params) => {
    return axios({
        url: baseUrl + "/api/menuinfo",
        method: "get",
        params: params
    })
}
// 栏目管理-菜单修改
export const reqMenuUpdate = (form) => {
    return axios({
        url: baseUrl + "/api/menuedit",
        method: "post",
        data: qs.stringify(form)
    })
}
// 栏目管理-菜单删除
export const reqMenuDel = (params) => {
    return axios({
        url: baseUrl + "/api/menudelete",
        method: "post",
        data: qs.stringify(params)
    })
}
// ************** 栏目管理结束 ************** //

// ************** 角色管理开始 ************** //
// 角色管理-添加角色
export const reqRoleAdd = (form) => {
    return axios({
        url: baseUrl + "/api/roleadd",
        method: "post",
        data: qs.stringify(form)
    })
}
// 角色管理-角色列表
export const reqRoleList = () => {
    return axios({
        url: baseUrl + "/api/rolelist",
        method: "get",
    })
}
// 角色管理-角色详情
export const reqRoleDetail = (params) => {
    return axios({
        url: baseUrl + "/api/roleinfo",
        method: "get",
        params: params
    })
}
// 角色管理-角色修改
export const reqRoleUpdate = (form) => {
    return axios({
        url: baseUrl + "/api/roleedit",
        method: "post",
        data: qs.stringify(form)
    })
}
// 角色管理-角色删除
export const reqRoleDel = (params) => {
    return axios({
        url: baseUrl + "/api/roledelete",
        method: "post",
        data: qs.stringify(params)
    })
}
// ************** 角色管理结束 ************** //

// ************** 管理员管理开始 ************** //
// 管理员管理-添加管理员
export const reqUserAdd = (form) => {
    return axios({
        url: baseUrl + "/api/useradd",
        method: "post",
        data: qs.stringify(form)
    })
}
// 管理员管理-管理员列表
export const reqUserList = (params) => {
    return axios({
        url: baseUrl + "/api/userlist",
        method: "get",
        params: params
    })
}
// 管理员管理-管理员详情
export const reqUserDetail = (params) => {
    return axios({
        url: baseUrl + "/api/userinfo",
        method: "get",
        params: params
    })
}
// 管理员管理-管理员修改
export const reqUserUpdate = (form) => {
    return axios({
        url: baseUrl + "/api/useredit",
        method: "post",
        data: qs.stringify(form)
    })
}
// 管理员管理-管理员删除
export const reqUserDel = (params) => {
    return axios({
        url: baseUrl + "/api/userdelete",
        method: "post",
        data: qs.stringify(params)
    })
}
// 管理员管理-管理员总数
export const reqUserCount = () => {
    return axios({
        url: baseUrl + "/api/usercount",
        method: "get"
    })
}
// 管理员管理-管理员登入
export const reqUserLogin = (params) => {
    return axios({
        url: baseUrl + "/api/userlogin",
        method: "post",
        data: params
    })
}
// ************** 管理员管理结束 ************** //

// ************** 会员管理开始 ************** //
// 会员管理 - 会员列表
export const reqMemberList = (params) => {
    return axios({
        url: baseUrl + "/api/memberlist",
        method: "get",
        params: params
    })
}
// 会员管理 - 会员详情
export const reqMemberDetail = (params) => {
    return axios({
        url: baseUrl + "/api/memberinfo",
        method: "get",
        params: params
    })
}
// 会员管理 - 会员修改
export const reqMemberUpdate = (form) => {
    return axios({
        url: baseUrl + "/api/memberedit",
        method: "post",
        data: qs.stringify(form)
    })
}
// 会员管理 - 会员总数
export const reqMemberTotal = () => {
    return axios({
        url: baseUrl + "/api//membercount",
        method: "get"
    })
}
// ************** 会员管理结束 ************** //

// ************** 分类管理开始 ************** //
// 分类管理-添加分类
export const reqCateAdd = (form) => {
    // 有文件上传 {z:1,a:2,v:4,d:file}
    let data = new FormData()
    for (let i in form) {
        data.append(i, form[i])
    }
    return axios({
        url: baseUrl + "/api/cateadd",
        method: "post",
        data: data
    })
}
// 分类管理-分类列表
export const reqCateList = (params) => {
    return axios({
        url: baseUrl + "/api/catelist",
        method: "get",
        params: params
    })
}
// 分类管理-分类详情
export const reqCateDetail = (params) => {
    return axios({
        url: baseUrl + "/api/cateinfo",
        method: "get",
        params: params
    })
}
// 分类管理-分类修改
export const reqCateUpdate = (form) => {
    let data = new FormData()
    for (let i in form) {
        data.append(i, form[i])
    }
    return axios({
        url: baseUrl + "/api/cateedit",
        method: "post",
        data: data
    })
}
// 分类管理-分类删除
export const reqCateDel = (params) => {
    return axios({
        url: baseUrl + "/api/catedelete",
        method: "post",
        data: qs.stringify(params)
    })
}
// ************** 分类管理结束 ************** //

// ************** 规格属性管理开始 ************** //
// 规格属性管理-添加规格属性
export const reqSpecAdd = (form) => {
    return axios({
        url: baseUrl + "/api/specsadd",
        method: "post",
        data: qs.stringify(form)
    })
}
// 规格属性管理-规格属性列表
export const reqSpecList = (params) => {
    return axios({
        url: baseUrl + "/api/specslist",
        method: "get",
        params: params
    })
}
// 规格属性管理-规格属性详情
export const reqSpecDetail = (params) => {
    return axios({
        url: baseUrl + "/api/specsinfo",
        method: "get",
        params: params
    })
}
// 规格属性管理-规格属性修改
export const reqSpecUpdate = (form) => {
    return axios({
        url: baseUrl + "/api/specsedit",
        method: "post",
        data: qs.stringify(form)
    })
}
// 规格属性管理-规格属性删除
export const reqSpecDel = (params) => {
    return axios({
        url: baseUrl + "/api/catedelete",
        method: "post",
        data: qs.stringify(params)
    })
}
// 规格属性管理 - 规格属性总数
export const reqSpecTotal = () => {
    return axios({
        url: baseUrl + "/api/specscount",
        method: "get"
    })
}
// ************** 规格属性管理结束 ************** //

// ************** 轮播图管理开始 ************** //
// 轮播图管理-添加轮播图
export const reqBannerAdd = (form) => {
    // 有文件上传 {z:1,a:2,v:4,d:file}
    let data = new FormData()
    for (let i in form) {
        data.append(i, form[i])
    }
    return axios({
        url: baseUrl + "/api/banneradd",
        method: "post",
        data: data
    })
}
// 轮播图管理-轮播图列表
export const reqBannerList = (params) => {
    return axios({
        url: baseUrl + "/api/bannerlist",
        method: "get",
        params: params
    })
}
// 轮播图管理-轮播图详情
export const reqBannerDetail = (params) => {
    return axios({
        url: baseUrl + "/api/bannerinfo",
        method: "get",
        params: params
    })
}
// 轮播图管理-轮播图修改
export const reqBannerUpdate = (form) => {
    let data = new FormData()
    for (let i in form) {
        data.append(i, form[i])
    }
    return axios({
        url: baseUrl + "/api/banneredit",
        method: "post",
        data: data
    })
}
// 轮播图管理-轮播图删除
export const reqBannerDel = (params) => {
    return axios({
        url: baseUrl + "/api/bannerdelete",
        method: "post",
        data: qs.stringify(params)
    })
}
// ************** 轮播图管理结束 ************** //

// ************** 商品管理开始 ************** //
// 商品管理-添加商品
export const reqGoodsAdd = (form) => {
    let data = new FormData()
    for (let i in form) {
        data.append(i, form[i])
    }
    return axios({
        url: baseUrl + "/api/goodsadd",
        method: "post",
        data: data
    })
}
// 商品管理-商品列表
export const reqGoodsList = (params) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        method: "get",
        params: params
    })
}
// 商品管理-商品详情
export const reqGoodsDetail = (params) => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "get",
        params: params
    })
}
// 商品管理-商品修改
export const reqGoodsUpdate = (form) => {
    let data = new FormData()
    for (let i in form) {
        data.append(i, form[i])
    }
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data: data
    })
}
// 商品管理-商品删除
export const reqGoodsDel = (params) => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data: qs.stringify(params)
    })
}
// 商品管理 - 商品总数
export const reqGoodsTotal = () => {
    return axios({
        url: baseUrl + "/api/goodscount",
        method: "get"
    })
}
// ************** 商品管理结束 ************** //