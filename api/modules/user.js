import resource from '~/api/resource'
import endpointPattren from '~/api/endpointPattren'

export default {
  list (qs) {
    let queryString = !qs ? {} : qs
    let link = endpointPattren.list('user', queryString)
    return resource.get(link)
  },

  detail (id) {
    return resource.get(endpointPattren.read('user', id))
  },

  create (data) {
    return resource.post(endpointPattren.create('user'), data)
  },

  update (payload) {
    return resource.put(endpointPattren.update('user', payload.id), payload.data)
  },

  delete (id) {
    return resource.delete(endpointPattren.delete('user', id))
  },

  report (id) {
    return resource.get(endpointPattren.report('user'))
  },

  setPenugasan (data) {
    return resource.post(endpointPattren.custom('user', '/penugasan'), data)
  }
}
