import { GET_ENTRIES_PROVINCE, GET_ENTRIES_REGION, GET_ENTRIES_VILLAGE } from './types'

export default {
  [GET_ENTRIES_PROVINCE] (state) {
    return state.entriesProvince
  },

  [GET_ENTRIES_REGION] (state) {
    return state.entriesRegion
  },

  [GET_ENTRIES_VILLAGE] (state) {
    return state.entriesVillage
  }
}
