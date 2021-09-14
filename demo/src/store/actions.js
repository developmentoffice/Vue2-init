import cst from '@/config/const'
import * as type from '@/store/mutations-type'

const saveToStorage = (tasks) => {
    if (localStorage) {
        localStorage.setItem(cst.store, JSON.stringify(tasks))
    }
}

export default {
    async getTasks({ commit }) {
        if (localStorage) {
            const tasks = localStorage.getItem(cst.store)
            if (tasks) commit(type.SET_TASKS, JSON.parse(tasks))
        }
    },
    async addTask({ commit, state }, task) {
        commit(type.ADD_TASK, task)
        saveToStorage(state.tasks)
    },
    async updateTask({ commit, state }, task) {
        const tasks = state.tasks.map(el => {
            if (el.id === task.id) el.name = task.name
            return el
        })
        commit(type.SET_TASKS, tasks)
        saveToStorage(tasks)
    },
    async deleteTask({ commit, state }, id) {
        const tasks = state.tasks.filter(el => el.id !== id)
        commit(type.SET_TASKS, tasks)
        saveToStorage(tasks)
    },
    async completeTask({ commit, state }, id) {
        const tasks = state.tasks.map(el => {
            if (el.id === id) el.status = 'completed'
            return el
        })
        commit(type.SET_TASKS, tasks)
        saveToStorage(tasks)
    }
}
