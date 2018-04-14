import { SAVE_MATRIX } from './mutation-types'

export default {
  [SAVE_MATRIX] (state, matrixs) {
    state.matrix = matrixs
  }
}
