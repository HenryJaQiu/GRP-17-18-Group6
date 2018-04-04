import Vue from 'vue'
import Vuex from 'vuex'
// import mutations from './mutations'
// import actions from './actions'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    matrix: 0
  },

  mutations: {
    increment: state => state.matrix++
  }
})

export default {
  store
}
