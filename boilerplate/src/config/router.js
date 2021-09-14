import Vue from 'vue'
import VueRouter from 'vue-router'

import NotFoundPage from '@/components/pages/NotFoundPage'

Vue.use(VueRouter)

const routes = [
    {
        path: '*',
        component: NotFoundPage
    }
]

const router = new VueRouter({
    mode: 'hash',
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    } else  {
        document.title = 'Vue2'
    }
    next()
})

export default router
