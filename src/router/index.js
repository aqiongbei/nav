import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        component: Main,
        children: [
            {
                path: '/',
                name: '我的',
                component: () => import( /* webpackChunkName: "Home" */ '../views/Home.vue')
            }, {
                path: '/playground',
                name: '广场',
                component: () => import( /* webpackChunkName: "Playground" */ '../views/Playground.vue')
            }, {
                path: '/home',
                name: '我的',
                component: () => import( /* webpackChunkName: "Home" */ '../views/Home.vue')
            }, {
                path: '/settings',
                name: '设置',
                component: () => import( /* webpackChunkName: "Settings" */ '../views/Settings.vue')
            }
        ]
    }, {
        path: '/about',
        name: '关于',
        component: () => import( /* webpackChunkName: "404" */ '../views/about.vue')
    }, {
        path: '*',
        name: '404',
        component: () => import( /* webpackChunkName: "404" */ '../views/404.vue')
    }
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    document.title = `${to.name}-自嗨导航`;
    next();
})
export default router