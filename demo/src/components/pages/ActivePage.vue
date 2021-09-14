<template>
    <TasksList title="Active tasks" :tasks="activeTasks" />
</template>

<script>
import { mapGetters } from 'vuex'
import TasksList from '@/components/TasksList'

export default {
    name: 'ActivePage',
    computed: {
        ...mapGetters([
            'activeTasks'
        ])
    },
    components: {
        TasksList
    }
}
</script>
