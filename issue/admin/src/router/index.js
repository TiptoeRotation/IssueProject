import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import store from '../store/store'
// import * as types from '../store/types'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/Login', // 重定向，即取代默认路径了
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue'),
    },
    {
        path: '/login', // 登录
        name: 'Login',
        component: () =>
            import ('@/components/Login.vue'),
    },
    {
        path: '/register', // 注册
        name: 'Register',
        component: () =>
            import ('@/components/Register.vue'),
    },

    {
        path: '/homePage', // 主页面
        name: 'HomePage',
        meta: {
            requireAuth: true, // // 添加该字段，表示进入这个路由是需要登录的
        },
        component: () =>
            import ('@/components/HomePage.vue'),
    },
    {
        path: '/homePage/updateInfo', // 修改个人信息
        name: 'UpdateInfo',
        meta: {
            requireAuth: true, // // 添加该字段，表示进入这个路由是需要登录的
        },
        component: () =>
            import ('@/components/UpdateInfo.vue'),
    },
    {
        path: '/homePage/newIssue', // 创建新Issue
        name: 'NewIssue',
        meta: {
            requireAuth: true, // // 添加该字段，表示进入这个路由是需要登录的
        },
        component: () =>
            import ('@/components/NewIssue.vue'),
    },
    // {
    //     path: '/homePage/managerForm', // 经理主页面
    //     name: 'ManagerForm',
    //     component: () =>
    //         import ('@/components/ManagerForm.vue'),
    // },
    {
        path: '/homePage/modifyIssue', // 修改Issue
        name: 'ModifyIssue',
        meta: {
            requireAuth: true, // // 添加该字段，表示进入这个路由是需要登录的
        },
        component: () =>
            import ('@/components/ModifyIssue.vue'),
    },
    {
        path: '/homePage/issueReport', // 统计报表
        name: 'IssueReport',
        meta: {
            requireAuth: true, // // 添加该字段，表示进入这个路由是需要登录的
        },
        component: () =>
            import ('@/components/IssueReport.vue'),
    },
    {
        path: '/homepage/UserPoReport', // 经理看Issue个人列表
        name: 'UserPoReport',
        meta: {
            requireAuth: true, // // 添加该字段，表示进入这个路由是需要登录的
        },
        component: () =>
            import ('@/components/UserPoReport.vue'),
    },
    {
        path: '/homePage/accountManagement', // 账号管理
        name: 'AccountManagement',
        meta: {
            requireAuth: true, // // 添加该字段，表示进入这个路由是需要登录的
        },
        component: () =>
            import ('@/components/AccountManagement.vue'),
    },
    {
        path: '/homepage/issueDetails', // Issue详情
        name: 'IssueDetails',
        meta: {
            requireAuth: true, // // 添加该字段，表示进入这个路由是需要登录的
        },
        component: () =>
            import ('@/components/IssueDetails.vue'),
    },

]


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// 页面刷新时，重新赋值loginName
// if (window.sessionStorage.getItem("loginName")) {
//     store.commit(types.LOGIN, sessionStorage.getItem("loginName"))
// }

// router.beforeEach((to, from, next) => {
//     if (to.matched.some(r => r.meta.requireAuth)) { // 判断该路由是否需要登录权限
//         if (sessionStorage.getItem("loginName")) { // 判断当前用户是否存在
//             next();

//         } else {
//             alert("请登录");
//             next({
//                 path: '/login',
//                 query: { redirect: to.fullPath }, // 将跳转的路由path作为参数，登录成功后跳转到该路由

//             })
//         }
//     } else {
//         next();
//     }
// })

export default router