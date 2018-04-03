import api from '~/api'
import * as ANIMAL_GENDER from './types'

export default {
  [ANIMAL_GENDER.FETCH_RESOURCE] ({commit}, data) {
    return new Promise((resolve, reject) => {
      api.animalGender.list(data).then((response) => {
        commit(ANIMAL_GENDER.SET_STATE, {accessor: 'entries', value: response.data.data})
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [ANIMAL_GENDER.FETCH_DETAIL] ({ commit }, id) {
    return new Promise((resolve, reject) => {
      api.animalGender.detail(id).then((response) => {
        commit(ANIMAL_GENDER.SET_STATE, { accessor: 'entriesDetail', value: response.data.data[0] })
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [ANIMAL_GENDER.FETCH_DETAIL_DATA] ({ commit }, id) {
    return new Promise((resolve, reject) => {
      api.animalGender.detail(id).then((response) => {
        commit(ANIMAL_GENDER.SET_STATE, { accessor: 'entry.name', value: response.data.data[0].name })
        commit(ANIMAL_GENDER.SET_STATE, { accessor: 'entry.description', value: response.data.data[0].description })
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [ANIMAL_GENDER.CREATE_DATA] ({commit}, data) {
    return new Promise((resolve, reject) => {
      api.animalGender.create(data).then((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [ANIMAL_GENDER.UPDATE_DATA] ({ commit }, data) {
    return new Promise((resolve, reject) => {
      api.animalGender.update(data).then((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [ANIMAL_GENDER.DELETE_DATA] ({ commit }, id) {
    return new Promise((resolve, reject) => {
      api.animalGender.delete(id).then((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  }
}
