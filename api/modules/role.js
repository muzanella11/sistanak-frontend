import resource from '~/api/resource'
import endpointPattren from '~/api/endpointPattren'

export default {
  list (qs) {
    let queryString = !qs ? {} : qs
    let link = endpointPattren.list('role', queryString)
    return resource.get(link)
  },

  detail (id) {
    return resource.get(endpointPattren.read('role', id))
  },

  create (data) {
    return resource.post(endpointPattren.create('role'), data)
  },

  update (payload) {
    return resource.put(endpointPattren.update('role', payload.id), payload.data)
  },

  delete (id) {
    return resource.delete(endpointPattren.delete('role', id))
  }
}
