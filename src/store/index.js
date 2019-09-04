import createPersistedState from 'vuex-persistedstate'
import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        loading: false,
        selectGood: {},
    },
    mutations: {
        set_selectGood(state, v) {

            state.selectGood = v
        },
    },
    actions: {
        asveselectGood({ commit, state }, name) {

            commit('set_selectGood', name) //用于提交mutations方法，传递城市名称
        }
    },
    getters: {

        selectGood: state => state.selectGood,
    },
    modules: {},
    plugins: [createPersistedState({
        // vuex持久化插件
        storage: window.sessionStorage
    })]
})