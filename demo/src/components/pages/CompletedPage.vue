<template>
    <TasksList title="Completed tasks" :tasks="completedTasks" />
</template>

<script>
import { mapGetters } from 'vuex'
import TasksList from '@/components/TasksList'

export default {
    name: 'completedPage',
    computed: {
        ...mapGetters([
            'completedTasks'
        ])
    },
    components: {
        TasksList
    }
}
</script>
