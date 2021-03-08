import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: localStorage.getItem('userData') ? true : false,
    pageName: 'Chats',
    userData: localStorage.getItem('authData') ? JSON.parse(localStorage.getItem('authData')) : null
  },
  mutations: {
    setLogin:(state, status) => {
      state.isLogin = status
    },
    setPageName: (state, name) => {
      state.pageName = name
    },
    setUserData: (state, payload) =>  {
      state.userData = payload
    }
  },
  actions: {
    setLogin:(context, status) => {
      context.commit('setLogin', status);
    },
    setPageName: (context, name) => {
      context.commit('setPageName', name)
    },
    setUserData: (context, payload) => {
      context.commit('setUserData', payload)
    }
  },
  modules: {
  }
})
