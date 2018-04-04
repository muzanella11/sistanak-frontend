import resource from '~/api/resource'
import endpointPattren from '~/api/endpointPattren'

export default {
  list (qs) {
    let queryString = !qs ? {} : qs
    let link = endpointPattren.list('locationRegion', queryString)
    return resource.get(link)
  },

  detail (id) {
    return resource.get(endpointPattren.read('locationRegion', id))
  },

  create (data) {
    return resource.post(endpointPattren.create('locationRegion'), data)
  },

  update (payload) {
    return resource.put(endpointPattren.update('locationRegion', payload.id), payload.data)
  },

  delete (id) {
    return resource.delete(endpointPattren.delete('locationRegion', id))
  }
}
