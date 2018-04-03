import axios from 'axios'
import handler from './handler'
import * as AUTH from '~/store/modules/auth/types'

function createResource () {
  var instance = axios.create({
    baseURL: process.env.apiUrl,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })

  instance.interceptors.request.use(config => {
    var store = window.$nuxt.$store
    if (store.getters[AUTH.IS_AUTHENTICATED]) {
      let token = store.state.auth.token
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  }, error => {
    return Promise.reject(error)
  })

  instance.interceptors.response.use(response => {
    return Promise.resolve(response)
  }, error => {
    Promise.reject(error)
    return handler(error)
  })

  return instance
}

export default createResource()

var web = createResource()
web.interceptors.request.use(config => {
  config.baseURL = process.env.apiUrl
  return config
})

export {web}
