import * as type from '@/store/mutations-type'

export default {
    [type.SET_TASKS](state, tasks) {
        state.tasks = tasks
    },
    [type.ADD_TASK](state, task) {
        state.tasks.push(task)
    }
}
