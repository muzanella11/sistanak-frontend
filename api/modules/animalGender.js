import resource from '~/api/resource'
import endpointPattren from '~/api/endpointPattren'

export default {
  list (qs) {
    let queryString = !qs ? {} : qs
    let link = endpointPattren.list('animalGender', queryString)
    return resource.get(link)
  },

  detail (id) {
    return resource.get(endpointPattren.read('animalGender', id))
  },

  create (data) {
    return resource.post(endpointPattren.create('animalGender'), data)
  },

  update (payload) {
    return resource.put(endpointPattren.update('animalGender', payload.id), payload.data)
  },

  delete (id) {
    return resource.delete(endpointPattren.delete('animalGender', id))
  }
}
