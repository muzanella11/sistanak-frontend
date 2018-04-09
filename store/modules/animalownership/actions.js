import api from '~/api'
import * as ANIMAL from './types'

export default {
  [ANIMAL.FETCH_RESOURCE] ({commit}, data) {
    return new Promise((resolve, reject) => {
      api.animalOwnership.list(data).then((response) => {
        commit(ANIMAL.SET_STATE, {accessor: 'entries', value: response.data.data})
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [ANIMAL.FETCH_DETAIL] ({ commit }, id) {
    return new Promise((resolve, reject) => {
      api.animalOwnership.detail(id).then((response) => {
        commit(ANIMAL.SET_STATE, { accessor: 'entriesDetail', value: response.data.data[0] })
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [ANIMAL.FETCH_DETAIL_DATA] ({ commit }, id) {
    return new Promise((resolve, reject) => {
      api.animalOwnership.detail(id).then((response) => {
        commit(ANIMAL.SET_STATE, { accessor: 'entry.fullname', value: response.data.data[0].fullname })
        commit(ANIMAL.SET_STATE, { accessor: 'entry.identity_number', value: response.data.data[0].identity_number })
        commit(ANIMAL.SET_STATE, { accessor: 'entry.identity_type', value: response.data.data[0].identity_type })
        commit(ANIMAL.SET_STATE, { accessor: 'entry.phone', value: response.data.data[0].phone })
        commit(ANIMAL.SET_STATE, { accessor: 'entry.province_id', value: response.data.data[0].province_id })
        commit(ANIMAL.SET_STATE, { accessor: 'entry.region_id', value: response.data.data[0].region_id })
        commit(ANIMAL.SET_STATE, { accessor: 'entry.village_id', value: response.data.data[0].village_id })
        commit(ANIMAL.SET_STATE, { accessor: 'entry.address', value: response.data.data[0].address })
        commit(ANIMAL.SET_STATE, { accessor: 'entry.birth_date', value: response.data.data[0].birth_date })
        commit(ANIMAL.SET_STATE, { accessor: 'entry.animal_list', value: response.data.data[0].animal_list })
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [ANIMAL.CREATE_DATA] ({commit}, data) {
    return new Promise((resolve, reject) => {
      api.animalOwnership.create(data).then((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [ANIMAL.UPDATE_DATA] ({ commit }, data) {
    return new Promise((resolve, reject) => {
      api.animalOwnership.update(data).then((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [ANIMAL.DELETE_DATA] ({ commit }, id) {
    return new Promise((resolve, reject) => {
      api.animalOwnership.delete(id).then((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [ANIMAL.DELETE_DETAIL_DATA] ({ commit }, id) {
    return new Promise((resolve, reject) => {
      api.animalOwnership.deleteDetail(id).then((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [ANIMAL.DOWNLOAD_REPORT] ({ commit }, data) {
    return new Promise((resolve, reject) => {
      api.animalOwnership.report().then((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  }
}
