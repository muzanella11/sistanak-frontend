import resource from '~/api/resource'
import endpointPattren from '~/api/endpointPattren'

export default {
  list (qs) {
    let queryString = !qs ? {} : qs
    let link = endpointPattren.list('animalGroup', queryString)
    return resource.get(link)
  },

  detail (id) {
    return resource.get(endpointPattren.read('animalGroup', id))
  },

  create (data) {
    return resource.post(endpointPattren.create('animalGroup'), data)
  },

  update (payload) {
    return resource.put(endpointPattren.update('animalGroup', payload.id), payload.data)
  },

  delete (id) {
    return resource.delete(endpointPattren.delete('animalGroup', id))
  }
}
