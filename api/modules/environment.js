import resource from '~/api/resource'
import endpointPattren from '~/api/endpointPattren'

export default {
  list (qs) {
    let queryString = !qs ? {} : qs
    let link = endpointPattren.list('environment', queryString)
    return resource.get(link)
  },

  detail (id) {
    return resource.get(endpointPattren.read('environment', id))
  },

  create (data) {
    return resource.post(endpointPattren.create('environment'), data)
  },

  update (payload) {
    return resource.put(endpointPattren.update('environment', payload.id), payload.data)
  },

  delete (id) {
    return resource.delete(endpointPattren.delete('environment', id))
  }
}
