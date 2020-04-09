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
                component: () => import( /* webpackChunkName: "about" */ '../views/Home.vue')
            }, {
                path: '/playground',
                name: '广场',
                component: () => import( /* webpackChunkName: "about" */ '../views/Playground.vue')
            }, {
                path: '/home',
                name: '我的',
                component: () => import( /* webpackChunkName: "about" */ '../views/Home.vue')
            }, {
                path: '/settings',
                name: '设置',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import( /* webpackChunkName: "about" */ '../views/Settings.vue')
            }
        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router