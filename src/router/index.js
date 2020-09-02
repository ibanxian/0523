import Vue from 'vue'
import Router from 'vue-router'
import store from "../store" // 引入仓库

Vue.use(Router)

// 引进路由文件
const login = () => import("../pages/login/login")
const index = () => import("../pages/index/index")

const home = () => import("../pages/home/home")
const menu = () => import("../pages/menu/menu")
const role = () => import("../pages/role/role")
const manage = () => import("../pages/manage/manage")
const classify = () => import("../pages/classify/classify")
const spec = () => import("../pages/spec/spec")
const goods = () => import("../pages/goods/goods")
const banner = () => import("../pages/banner/banner")
const member = () => import("../pages/member/member")
const seckill = () => import("../pages/seckill/seckill")

//路由独享守卫判断
function beforeEnter(url, next) {
  store.state.user.Info.menus_url.some(item => item == url) ? next() : next("/")
}

//首页下面的二级路由规则
export const indexRoutes = [
  {
    path: "menu",
    component: menu,
    name: "菜单管理",
    beforeEnter(to, from, next) {
      beforeEnter("/menu", next)
    }
  },
  {
    path: "role",
    component: role,
    name: "角色管理",
    beforeEnter(to, from, next) {
      beforeEnter("/menu", next)
    }
  },
  {
    path: "manage",
    component: manage,
    name: "管理员管理",
    beforeEnter(to, from, next) {
      beforeEnter("/menu", next)
    }
  },
  {
    path: "classify",
    component: classify,
    name: "商品分类",
    beforeEnter(to, from, next) {
      beforeEnter("/menu", next)
    }
  },
  {
    path: "spec",
    component: spec,
    name: "商品规格",
    beforeEnter(to, from, next) {
      beforeEnter("/menu", next)
    }
  },
  {
    path: "goods",
    component: goods,
    name: "商品管理",
    beforeEnter(to, from, next) {
      beforeEnter("/menu", next)
    }
  },
  {
    path: "banner",
    component: banner,
    name: "轮播图管理",
    beforeEnter(to, from, next) {
      beforeEnter("/menu", next)
    }
  },
  {
    path: "member",
    component: member,
    name: "会员管理",
    beforeEnter(to, from, next) {
      beforeEnter("/menu", next)
    }
  },
  {
    path: "seckill",
    component: seckill,
    name: "秒杀活动",
    beforeEnter(to, from, next) {
      beforeEnter("/menu", next)
    }
  },
]

const router = new Router({
  // 一级路由规则
  routes: [
    {
      path: "/login",
      component: login
    },
    {
      path: "/",
      component: index,
      children: [
        {
          path: "",
          component: home
        },
        ...indexRoutes
      ]
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
})

// 全局守卫
router.beforeEach((to, from, next) => {
  //1.如果去的是登陆 "/login",直接进 
  if (to.path === "/login") {
    next();
    return;
  }
  //去的不是登录,判断是否登录，如果登录过了，就next
  if (store.state.user.Info.id) { //存在，代表登录过了
    next();
    return;
  }
  //去的不是登录，也没有登录过
  next("/login")
})
export default router;