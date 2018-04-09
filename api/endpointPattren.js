import endpoint from './endpoint'
import queryString from 'query-string'

export default {
  list (moduleName, qs) {
    let url = endpoint[moduleName].index

    if (Object.keys(qs).length > 0) {
      url = url + '?' + queryString.stringify(qs)
    }

    return url
  },

  create (moduleName) {
    return endpoint[moduleName].index + '/create'
  },

  read (moduleName, id) {
    return endpoint[moduleName].index + '/' + id
  },

  update (moduleName, id) {
    return endpoint[moduleName].index + '/' + id + '/edit'
  },

  delete (moduleName, id) {
    return endpoint[moduleName].index + '/' + id + '/delete'
  },

  report (moduleName) {
    return endpoint[moduleName].index + '/report'
  },

  custom (moduleName, urlCustom) {
    return endpoint[moduleName].index + urlCustom
  }
}
