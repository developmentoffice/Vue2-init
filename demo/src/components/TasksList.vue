<template>
    <div class="panel">
        <p class="panel-heading">{{ title }}</p>
        <p class="panel-block" v-if="tasks.length === 0">No tasks</p>
        <div
            class="panel-block"
            :class="{
                'has-background-success-light': (task.status === 'completed' && $route.name === 'all'),
                'is-flex is-justify-content-space-between': (editTask.id !== task.id),
                'is-block': editTask.id
            }"
            v-for="task in tasks"
            :key="task.id"
        >
            <form class="field has-addons" v-if="editTask.id === task.id" @submit.prevent="save">
                <div class="control is-expanded">
                    <input class="input" type="text" ref="field" v-model="editTask.name">
                </div>
                <div class="control">
                    <button class="button is-info">Save</button>
                </div>
            </form>
            <template v-else>
                {{ task.name }}
            </template>
            <div v-if="editTask.id !== task.id">
                <template v-if="task.status === 'active'">
                    <button class="button" @click="startEdit(task)">Edit</button>
                    <button
                        class="button is-success"
                        @click="$store.dispatch('completeTask', task.id)"
                    >Complete</button>
                </template>
                <button
                    class="button is-danger"
                    type="button"
                    @click="taskToDel = task.id"
                    v-if="task.status === 'completed'"
                >Delete</button>
            </div>
        </div>
        <div class="modal is-active" v-if="taskToDel > 0">
            <div class="modal-background" @click="taskToDel = 0"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Delete task?</p>
                    <button class="delete" @click="taskToDel = 0"></button>
                </header>
                <footer class="modal-card-foot">
                    <button class="button is-danger" @click="delTask(taskToDel)">yes</button>
                    <button class="button" @click="taskToDel = 0">no</button>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TasksList',
    props: {
        title: {
            type: String
        },
        tasks: {
            type: Array,
            default: function() {
                return []
            }
        }
    },
    data() {
        return {
            editTask: {},
            taskToDel: 0
        }
    },
    methods: {
        startEdit(task) {
            this.editTask = task
            this.$nextTick(() => {
                this.$refs.field[0].focus()
            })
        },
        async save() {
            if (this.editTask.name.length === 0) return
            await this.$store.dispatch('updateTask', this.editTask)
            this.editTask = {}
        },
        delTask(id) {
            this.$store.dispatch('deleteTask', id)
            this.taskToDel = 0
        }
    }
}
</script>
