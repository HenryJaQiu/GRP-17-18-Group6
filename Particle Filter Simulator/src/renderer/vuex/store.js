import Vue from 'vue'
import Vuex from 'vuex'
// import mutations from './mutations'
// import actions from './actions'

Vue.use(Vuex)

const state = {
  matrixXhat: null,
  matrixTrue: null,
  ifImported: false
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
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
