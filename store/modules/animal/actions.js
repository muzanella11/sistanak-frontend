import api from '~/api'
import * as ANIMAL from './types'

export default {
  [ANIMAL.FETCH_RESOURCE] ({commit}, data) {
    return new Promise((resolve, reject) => {
      api.animal.list(data).then((response) => {
        commit(ANIMAL.SET_STATE, {accessor: 'entries', value: response.data.data})
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [ANIMAL.FETCH_DETAIL] ({ commit }, id) {
    return new Promise((resolve, reject) => {
      api.animal.detail(id).then((response) => {
        commit(ANIMAL.SET_STATE, { accessor: 'entriesDetail', value: response.data.data[0] })
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [ANIMAL.FETCH_DETAIL_DATA] ({ commit }, id) {
    return new Promise((resolve, reject) => {
      api.animal.detail(id).then((response) => {
        commit(ANIMAL.SET_STATE, { accessor: 'entry.name', value: response.data.data[0].name })
        commit(ANIMAL.SET_STATE, { accessor: 'entry.description', value: response.data.data[0].description })
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [ANIMAL.CREATE_DATA] ({commit}, data) {
    return new Promise((resolve, reject) => {
      api.animal.create(data).then((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [ANIMAL.UPDATE_DATA] ({ commit }, data) {
    return new Promise((resolve, reject) => {
      api.animal.update(data).then((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [ANIMAL.DELETE_DATA] ({ commit }, id) {
    return new Promise((resolve, reject) => {
      api.animal.delete(id).then((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [ANIMAL.DOWNLOAD_REPORT] ({ commit }, data) {
    return new Promise((resolve, reject) => {
      api.animal.report().then((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  }
}
