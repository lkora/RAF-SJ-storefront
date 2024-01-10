import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: '',
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.token = token;
    },
    removeToken(state) {
      state.token = '';
      localStorage.token = '';
    },
  },
  actions: {
    register({ commit }, obj) {
      fetch('http://127.0.0.1:9001/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then(res => res.json())
        .then(data => commit('setToken', data.token));
    },
    login({ commit }, obj) {
      fetch('http://127.0.0.1:9001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then(res => res.json())
        .then(data => {
          if (data.msg) {
            alert(data.msg);
          } else {
            commit('setToken', data.token)
          }
        });
    }
  }
})

export default store