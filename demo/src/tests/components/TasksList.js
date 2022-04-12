import 'regenerator-runtime/runtime'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import TasksList from '@/components/TasksList'

const tasks = [{
    id: 1,
    name: 'Task #1',
    status: 'active'
}, {
    id: 2,
    name: 'Task #2',
    status: 'completed'
}]

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)
const router = new VueRouter()

describe('TasksList', () => {
    let store
    let actions

    beforeEach(() => {
        actions = {
            updateTask: jest.fn()
        }
        store = new Vuex.Store({
            actions
        })
    })

    test('is instance of Vue', () => {
        const wrapper = shallowMount(TasksList)
        expect(wrapper.vm).toBeTruthy()
    })
    test('render title', () => {
        const wrapper = shallowMount(TasksList, {
            propsData: {
                title: 'Tasks list'
            }
        })
        const title = wrapper.find('.panel-heading')
        expect(title.text()).toEqual('Tasks list')
    })
    test('no tasks', () => {
        const wrapper = shallowMount(TasksList)
        const container = wrapper.find('.panel-block')
        expect(container.text()).toEqual('No tasks')
    })
    test('render tasks', () => {
        const wrapper = shallowMount(TasksList, {
            localVue,
            router,
            propsData: {
                tasks
            }
        })
        for (let i = 0; i < tasks.length; i++) {
            expect(wrapper.findAll('.panel-block').at(i).text()).toContain(tasks[i].name)
        }
    })
    test('active task: can edit and complete', () => {
        const wrapper = shallowMount(TasksList, {
            localVue,
            router,
            propsData: {
                tasks
            }
        })
        const buttons = wrapper.findAll('.panel-block').at(0).findAll('button')
        expect(buttons.at(0).text()).toEqual('Edit')
        expect(buttons.at(1).text()).toEqual('Complete')
    })
    test('completed task: can delete', () => {
        const wrapper = shallowMount(TasksList, {
            localVue,
            router,
            propsData: {
                tasks
            }
        })
        const buttons = wrapper.findAll('.panel-block').at(1).findAll('button')
        expect(buttons.at(0).text()).toEqual('Delete')
    })
    test('active task: click edit', async () => {
        const wrapper = shallowMount(TasksList, {
            localVue,
            router,
            propsData: {
                tasks
            }
        })
        const buttons = wrapper.findAll('.panel-block').at(0).findAll('button')
        await buttons.at(0).trigger('click')
        expect(wrapper.find('form').exists()).toBe(true)
        expect(wrapper.vm.editTask.name).toEqual(tasks[0].name)
    })
    test('save task with non empty input', async () => {
        const wrapper = shallowMount(TasksList, {
            localVue,
            router,
            store,
            propsData: {
                tasks
            }
        })
        const buttons = wrapper.findAll('.panel-block').at(0).findAll('button')
        await buttons.at(0).trigger('click')
        await wrapper.find('form').trigger('submit')
        expect(actions.updateTask).toHaveBeenCalled()
    })
    test('save task with empty input', async () => {
        const wrapper = shallowMount(TasksList, {
            localVue,
            router,
            store,
            propsData: {
                tasks
            }
        })
        const buttons = wrapper.findAll('.panel-block').at(0).findAll('button')
        await buttons.at(0).trigger('click')
        wrapper.vm.editTask.name = ''
        await wrapper.find('form').trigger('submit')
        expect(actions.updateTask).not.toHaveBeenCalled()
    })
})
