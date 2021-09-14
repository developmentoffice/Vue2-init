<template>
    <TasksList title="All tasks" :tasks="tasks" />
</template>

<script>
import { mapState } from 'vuex'
import TasksList from '@/components/TasksList'

export default {
    name: 'AllPage',
    computed: {
        ...mapState([
            'tasks'
        ])
    },
    components: {
        TasksList
    }
}
</script>
