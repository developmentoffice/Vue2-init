import Vue from 'vue'
import VueRouter from 'vue-router'

import AllPage from '@/components/pages/AllPage'
import ActivePage from '@/components/pages/ActivePage'
import CompletedPage from '@/components/pages/CompletedPage'
import NotFoundPage from '@/components/pages/NotFoundPage'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'all',
        component: AllPage,
        meta: {
            title: 'All'
        }
    },
    {
        path: '/active',
        name: 'active',
        component: ActivePage,
        meta: {
            title: 'Active'
        }
    },
    {
        path: '/completed',
        name: 'completed',
        component: CompletedPage,
        meta: {
            title: 'Completed'
        }
    },
    {
        path: '*',
        component: NotFoundPage
    }
]

const router = new VueRouter({
    mode: 'hash',
    linkExactActiveClass: 'is-active',
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    } else  {
        document.title = 'ToDo List'
    }
    next()
})

export default router
