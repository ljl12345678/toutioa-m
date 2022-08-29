import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
    // 配置自己的路由
const routes = [{
        path: '/login',
        name: 'login',
        component: () =>
            import ('@/views/login')
    },
    {
        path: '/',
        // name: 'layout',
        component: () =>
            import ('@/views/layout'),
        children: [{
                path: '/',
                name: 'home',
                component: () =>
                    import ('@/views/home')
            },
            {
                path: '/qu',
                name: 'qu',
                component: () =>
                    import ('@/views/qu')
            },
            {
                path: '/viedo',
                name: 'viedo',
                component: () =>
                    import ('@/views/viedo')
            },
            {
                path: '/my',
                name: 'my',
                component: () =>
                    import ('@/views/wode')
            },
        ]

    },
    {
        path: '/search',
        name: 'search',
        component: () =>
            import ('@/views/search')
    },
    {
        path: '/article/:articleid',
        name: 'article',
        component: () =>
            import ('@/views/article'),
        props: true //开启路由传参，吧路由中的参数映射到组件的props中
    },
    {
        path: '/user/profile',
        name: 'user-profile',
        component: () =>
            import ('@/views/user-profile'),

    }
]

const router = new VueRouter({
    routes
})

export default router