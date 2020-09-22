import Vue from 'vue'
import Vuex from 'vuex'
import * as api from '../api/api'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        tasks: []
    },
    getters: {
        $tasks: state => state.tasks
    },
    mutations: {
        setState: (state, payload) => {
            Object.keys(payload).forEach(key => {
                state[key] = payload[key]
            })
        }
    },
    actions: {
        async fetchTasks({ commit }) {
            let data = await api.get()
            if (data.error) {
                console.log(data);
                return
            }
            commit('setState', { tasks: data })
        }
    },
    modules: {
    },
    plugins: [createPersistedState()],
})
