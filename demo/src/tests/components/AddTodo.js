import 'regenerator-runtime/runtime'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import AddTodo from '@/components/AddTodo'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('AddTodo', () => {
    let actions
    let store

    beforeEach(() => {
        actions = {
            addTask: jest.fn()
        }
        store = new Vuex.Store({
            actions,
            getters: {
                maxId: () => 0
            }
        })
    })

    test('is instance of Vue', () => {
        const wrapper = shallowMount(AddTodo)
        expect(wrapper.vm).toBeTruthy()
    })
    test('add task with empty input', async () => {
        const wrapper = shallowMount(AddTodo, {
            localVue,
            store
        })
        await wrapper.find('form').trigger('submit')
        expect(actions.addTask).not.toHaveBeenCalled()
    })
    test('add task with non empty input', async () => {
        const wrapper = shallowMount(AddTodo, {
            localVue,
            store,
            data() {
                return {
                    task: 'New task'
                }
            }
        })
        await wrapper.find('form').trigger('submit')
        expect(actions.addTask).toHaveBeenCalled()
    })
})
