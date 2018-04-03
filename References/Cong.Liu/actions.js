import { SAVE_MATRIX } from './mutation-types'

export default {
    SAVE_MATRIX({ commit }, matrix) {
      commit(SAVE_MATRIX, matrix)
    }
}
