import '@/main.css'
import Vue from 'vue'
import App from '@/App'
import router from '@/config/router'
import store from '@/store'

const app = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
