// // By Cong Liu and Hejia Qiu
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// default
const state = {
  matrixXhat: null,
  matrixTrue: null,
  ifImported: false,
  ifRun: false
}

const mutations = {
  setMatrixXhat (state, matrixXhat) {
    state.matrixXhat = matrixXhat
  },
  setMatrixTrue (state, matrixTrue) {
    state.matrixTrue = matrixTrue
  },
  setIfImported (state, ifImported) {
    state.ifImported = ifImported
  },
  setIfRun (state, ifRun) {
    state.ifRun = ifRun
  }
}

const getters = {
  getMatrixXhat: state => {
    return state.matrixXhat
  },
  getMatrixTrue: state => {
    return state.matrixTrue
  },
  getIfImported: state => {
    return state.ifImported
  },
  getIfRun: state => {
    return state.ifRun
  }
}

const actions = {
  setMatrixXhat (context, data) {
    context.commit('setMatrixXhat', data)
  },
  setMatrixTrue (context, data) {
    context.commit('setMatrixTrue', data)
  },
  setIfImported (context, data) {
    context.commit('setIfImported', data)
  },
  setIfRun (context, data) {
    context.commit('setIfRun', data)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
