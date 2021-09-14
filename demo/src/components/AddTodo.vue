<template>
    <div class="panel">
        <p class="panel-heading">
            Add task
        </p>
        <div class="panel-block">
            <form class="control" @submit.prevent="addTask">
                <input class="input" type="text" placeholder="Task name" v-model="task">
            </form>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'AddTodo',
    data() {
        return {
            task: ''
        }
    },
    computed: {
        ...mapGetters([
            'maxId'
        ])
    },
    methods: {
        async addTask() {
            if (this.task.length === 0) return
            const id = this.maxId + 1
            const task = {
                id,
                name: this.task,
                status: 'active'
            }
            await this.$store.dispatch('addTask', task)
            this.task = ''
        }
    }
}
</script>
