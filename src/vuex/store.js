import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        isLoggedIn: false,
        isAdminLoggedIn: false,
        username: "",
    },
    mutations: {
        setIsAdminLoggedIn (state, val) {
            state.isAdminLoggedIn = val
        },
        setIsLoggedIn (state, val) {
            state.isLoggedIn = val
        },
        setUsername (state, username) {
            state.username = username
        },
        setUserId (state, userId) {
            state.userId = userId
        }
    }
})

export default store
