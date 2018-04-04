import api from '~/api'
import * as LOCATION from './types'

export default {
  // Province
  [LOCATION.FETCH_PROVINCE] ({commit}, data) {
    return new Promise((resolve, reject) => {
      api.locationProvince.list(data).then((response) => {
        commit(LOCATION.SET_STATE, {accessor: 'entriesProvince', value: response.data.data})
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [LOCATION.FETCH_DETAIL_PROVINCE] ({ commit }, id) {
    return new Promise((resolve, reject) => {
      api.locationProvince.detail(id).then((response) => {
        commit(LOCATION.SET_STATE, { accessor: 'entriesDetailProvince', value: response.data.data[0] })
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [LOCATION.FETCH_DETAIL_DATA_PROVINCE] ({ commit }, id) {
    return new Promise((resolve, reject) => {
      api.locationProvince.detail(id).then((response) => {
        commit(LOCATION.SET_STATE, { accessor: 'entryProvince.name', value: response.data.data[0].name })
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [LOCATION.CREATE_DATA_PROVINCE] ({commit}, data) {
    return new Promise((resolve, reject) => {
      api.locationProvince.create(data).then((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [LOCATION.UPDATE_DATA_PROVINCE] ({ commit }, data) {
    return new Promise((resolve, reject) => {
      api.locationProvince.update(data).then((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [LOCATION.DELETE_DATA_PROVINCE] ({ commit }, id) {
    return new Promise((resolve, reject) => {
      api.locationProvince.delete(id).then((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  // Region

  [LOCATION.FETCH_REGION] ({ commit }, data) {
    return new Promise((resolve, reject) => {
      api.locationRegion.list(data).then((response) => {
        commit(LOCATION.SET_STATE, { accessor: 'entriesRegion', value: response.data.data })
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [LOCATION.FETCH_DETAIL_REGION] ({ commit }, id) {
    return new Promise((resolve, reject) => {
      api.locationRegion.detail(id).then((response) => {
        commit(LOCATION.SET_STATE, { accessor: 'entriesDetailRegion', value: response.data.data[0] })
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [LOCATION.FETCH_DETAIL_DATA_REGION] ({ commit }, id) {
    return new Promise((resolve, reject) => {
      api.locationRegion.detail(id).then((response) => {
        commit(LOCATION.SET_STATE, { accessor: 'entryRegion.name', value: response.data.data[0].name })
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [LOCATION.CREATE_DATA_REGION] ({ commit }, data) {
    return new Promise((resolve, reject) => {
      api.locationRegion.create(data).then((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [LOCATION.UPDATE_DATA_REGION] ({ commit }, data) {
    return new Promise((resolve, reject) => {
      api.locationRegion.update(data).then((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [LOCATION.DELETE_DATA_REGION] ({ commit }, id) {
    return new Promise((resolve, reject) => {
      api.locationRegion.delete(id).then((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  // Village

  [LOCATION.FETCH_VILLAGE] ({ commit }, data) {
    return new Promise((resolve, reject) => {
      api.locationVillage.list(data).then((response) => {
        commit(LOCATION.SET_STATE, { accessor: 'entriesVillage', value: response.data.data })
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [LOCATION.FETCH_DETAIL_VILLAGE] ({ commit }, id) {
    return new Promise((resolve, reject) => {
      api.locationVillage.detail(id).then((response) => {
        commit(LOCATION.SET_STATE, { accessor: 'entriesDetailVillage', value: response.data.data[0] })
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [LOCATION.FETCH_DETAIL_DATA_VILLAGE] ({ commit }, id) {
    return new Promise((resolve, reject) => {
      api.locationVillage.detail(id).then((response) => {
        commit(LOCATION.SET_STATE, { accessor: 'entryVillage.name', value: response.data.data[0].name })
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [LOCATION.CREATE_DATA_VILLAGE] ({ commit }, data) {
    return new Promise((resolve, reject) => {
      api.locationVillage.create(data).then((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [LOCATION.UPDATE_DATA_VILLAGE] ({ commit }, data) {
    return new Promise((resolve, reject) => {
      api.locationVillage.update(data).then((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [LOCATION.DELETE_DATA_VILLAGE] ({ commit }, id) {
    return new Promise((resolve, reject) => {
      api.locationVillage.delete(id).then((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  }
}
