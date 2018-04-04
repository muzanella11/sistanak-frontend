import resource from '~/api/resource'
import endpointPattren from '~/api/endpointPattren'

export default {
  list (qs) {
    let queryString = !qs ? {} : qs
    let link = endpointPattren.list('locationVillage', queryString)
    return resource.get(link)
  },

  detail (id) {
    return resource.get(endpointPattren.read('locationVillage', id))
  },

  create (data) {
    return resource.post(endpointPattren.create('locationVillage'), data)
  },

  update (payload) {
    return resource.put(endpointPattren.update('locationVillage', payload.id), payload.data)
  },

  delete (id) {
    return resource.delete(endpointPattren.delete('locationVillage', id))
  }
}
