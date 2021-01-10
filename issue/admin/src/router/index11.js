import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

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
        component: () =>
            import ('@/components/HomePage.vue'),
    },
    {
        path: '/homePage/updateInfo', // 修改个人信息
        name: 'UpdateInfo',
        component: () =>
            import ('@/components/UpdateInfo.vue'),
    },
    {
        path: '/homePage/newIssue', // 创建新Issue
        name: 'NewIssue',
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
        component: () =>
            import ('@/components/ModifyIssue.vue'),
    },
    {
        path: '/homePage/issueReport', // 统计报表
        name: 'IssueReport',
        component: () =>
            import ('@/components/IssueReport.vue'),
    },
    {
        path: '/homepage/UserPoReport', // 经理看Issue个人列表
        name: 'UserPoReport',
        component: () =>
            import ('@/components/UserPoReport.vue'),
    },
    {
        path: '/homePage/accountManagement', // 账号管理
        name: 'AccountManagement',
        component: () =>
            import ('@/components/AccountManagement.vue'),
    },
    {
        path: '/homepage/issueDetails', // Issue详情
        name: 'IssueDetails',
        component: () =>
            import ('@/components/IssueDetails.vue'),
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router