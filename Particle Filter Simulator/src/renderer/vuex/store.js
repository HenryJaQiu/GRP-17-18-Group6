import Vue from 'vue'
import Vuex from 'vuex'
// import mutations from './mutations'
// import actions from './actions'

Vue.use(Vuex)

const state = {
  matrixXhat: null,
  matrixTrue: null
}

const mutations = {
  setMatrixXhat (state, matrixXhat) {
    state.matrixXhat = matrixXhat
  },
  setMatrixTrue (state, matrixTrue) {
    state.matrixTrue = matrixTrue
  }
}

const getters = {
  getMatrixXhat: state => {
    return state.matrixXhat
  },
  getMatrixTrue: state => {
    return state.matrixTrue
  }
}

const actions = {
  setMatrixXhat (context, data) {
    context.commit('setMatrixXhat', data)
  },
  setMatrixTrue (context, data) {
    context.commit('setMatrixTrue', data)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
