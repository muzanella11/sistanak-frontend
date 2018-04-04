import resource from '~/api/resource'
import endpointPattren from '~/api/endpointPattren'

export default {
  list (qs) {
    let queryString = !qs ? {} : qs
    let link = endpointPattren.list('locationProvince', queryString)
    return resource.get(link)
  },

  detail (id) {
    return resource.get(endpointPattren.read('locationProvince', id))
  },

  create (data) {
    return resource.post(endpointPattren.create('locationProvince'), data)
  },

  update (payload) {
    return resource.put(endpointPattren.update('locationProvince', payload.id), payload.data)
  },

  delete (id) {
    return resource.delete(endpointPattren.delete('locationProvince', id))
  }
}
