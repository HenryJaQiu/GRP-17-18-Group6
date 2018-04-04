import Vue from 'vue'
import Vuex from 'vuex'
// import mutations from './mutations'
// import actions from './actions'

Vue.use(Vuex)

const state = {
  matrix: 0
}

const mutations = {
  setMatrix (state, matrix) {
    state.matrix = matrix
  }
}

const getters = {
  getMatrix: state => {
    return state.matrix
  }
}

const actions = {
  setMatrix (context, data) {
    context.commit('setMatrix', data)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
