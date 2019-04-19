import Vue from 'vue'
import Vuex from 'vuex'
import appService from '@/app.service.js'

Vue.use(Vuex)

const store =  new Vuex.Store({
  state: {
    isAuthenticated: false,
    userId: null,
  },
  getters: {
    isAuthenticated: (state) => {
      return state.isAuthenticated
    },
    userId: (state) => {
      return state.userId
    }
  },
  mutations: {
    logout (state) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
      }
      state.isAuthenticated = false
      state.userId = null
    },
    login (state, token) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', token.token)
        localStorage.setItem('userId', token.user_id)
      }
      state.isAuthenticated = true
      state.userId = token.user_id
    }
  },
  actions: {
    logout (context) {
      return new Promise((resolve) => {
        context.commit('logout')
        resolve()
      })
    },
    login (context, credentials) {
      return new Promise((resolve, reject) => {
        appService.login(credentials)
          .then(data => {
            context.commit('login', data)
            resolve()
          })
          .catch(error => {
          reject(error.data)
        })
      })
    }
  }
})

if (typeof window !== 'undefined') {
  let token = localStorage.getItem('token')  
  if (token) {
    store.state.isAuthenticated = true
    store.state.userId = localStorage.getItem('userId')
  }
}

export default store
