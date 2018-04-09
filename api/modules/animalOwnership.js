import resource from '~/api/resource'
import endpointPattren from '~/api/endpointPattren'

export default {
  list (qs) {
    let queryString = !qs ? {} : qs
    let link = endpointPattren.list('animalOwnership', queryString)
    return resource.get(link)
  },

  detail (id) {
    return resource.get(endpointPattren.read('animalOwnership', id))
  },

  create (data) {
    return resource.post(endpointPattren.create('animalOwnership'), data)
  },

  update (payload) {
    return resource.put(endpointPattren.update('animalOwnership', payload.id), payload.data)
  },

  delete (id) {
    return resource.delete(endpointPattren.delete('animalOwnership', id))
  },

  deleteDetail (id) {
    return resource.delete(endpointPattren.delete('animalOwnershipDetail', id))
  },

  report (id) {
    return resource.get(endpointPattren.report('animalOwnership'))
  }
}
