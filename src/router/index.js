import Vue from 'vue'
import Router from 'vue-router'

import HOME_ROUTERS from '../views/home/router'
import COMMODITY_ROUTERS from '../views/commodity/router'
import store from '../store/';

import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import { Message } from 'element-ui'
Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
const Login = () =>
    import ('@/views/login/login')
const whiteList = ['/login', "/file"] // 不重定向白名单
    /**
     * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
     * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
     *                                if not set alwaysShow, only more than one route under the children
     *                                it will becomes nested mode, otherwise not show the root menu
     * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
     * name:'router-name'             the name is used by <keep-alive> (must set!!!)
     * meta : {
        title: 'title'               the name show in submenu and breadcrumb (recommend set)
        icon: 'svg-name'             the icon show in the sidebar,
      }
     **/


const routes = new Router({

    routes: [{
            path: '/home',
            component: Layout,
            redirect: '/home/index',
            meta: { title: '首页', icon: 'el-icon-s-home', hidden: false },
            children: [...HOME_ROUTERS]
        },
        {

            path: '/commodity',
            component: Layout,
            redirect: '/commodity/list',
            meta: { title: '商品', icon: 'el-icon-s-home', hidden: false },
            children: [
                ...COMMODITY_ROUTERS
            ],
        },
        {

            path: '/',
            component: Layout,

            meta: { title: '订单', icon: 'el-icon-s-home', hidden: false },
            children: [

            ],



        },
        {

            path: '/',
            component: Layout,

            meta: { title: '用户', icon: 'el-icon-s-home', hidden: false },
            children: [

            ],
        },
        {
            path: '/',
            component: Layout,
            meta: { title: '运营', icon: 'el-icon-s-home', hidden: false },
            children: [],
        },
        {
            path: '/',
            component: Layout,

            meta: { title: '设置', icon: 'el-icon-s-home', hidden: false },
            children: [

            ],
        },
        {
            path: '/login',
            component: Login,
            meta: { hidden: true },

        },
        { path: '*', redirect: '/404', meta: { hidden: true }, },
        { path: '/', redirect: '/home', meta: { hidden: true }, },
    ]

})

routes.beforeEach((to, from, next) => {

    NProgress.start()

    if (sessionStorage.getItem("token")) {
        if (to.path === '/login') {
            next({ path: '/' })
            NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
        } else {
            next()


        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login')
            NProgress.done()
        }
    }
})

routes.afterEach(() => {
    NProgress.done() // 结束Progress
})
export default routes;