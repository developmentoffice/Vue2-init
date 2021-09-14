<template>
    <div class="app">
        <NavBar />
        <section class="section">
            <h1 class="title">Another one ToDo list application</h1>
            <h2 class="subtitle">
                Demo for <strong>vue2-init</strong> boilerplate
            </h2>
            <div class="container">
                <AddTodo />
                <router-view :key="$route.path" />
            </div>
        </section>
        <footer class="footer">
            <div class="content has-text-centered">
                <p>
                    <strong>ToDo demo application</strong> by Alex Novikov.
                </p>
            </div>
        </footer>
    </div>
</template>

<script>
import * as type from '@/store/mutations-type'
import NavBar from '@/components/NavBar'
import AddTodo from '@/components/AddTodo'

export default {
    name: 'App',
    components: {
        AddTodo,
        NavBar
    },
    async created() {
        await this.$store.dispatch('getTasks')
    }
}
</script>
