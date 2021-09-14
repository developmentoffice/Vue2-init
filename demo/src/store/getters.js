export default {
    maxId(state) {
        if (state.tasks.length === 0) return 0
        return Math.max(...state.tasks.map(el => el.id))
    },
    activeTasks(state) {
        return state.tasks.filter(el => el.status !== 'completed')
    },
    completedTasks(state) {
        return state.tasks.filter(el => el.status === 'completed')
    }
}
