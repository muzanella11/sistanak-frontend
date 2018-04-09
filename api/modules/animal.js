import resource from '~/api/resource'
import endpointPattren from '~/api/endpointPattren'

export default {
  list (qs) {
    let queryString = !qs ? {} : qs
    let link = endpointPattren.list('animal', queryString)
    return resource.get(link)
  },

  detail (id) {
    return resource.get(endpointPattren.read('animal', id))
  },

  create (data) {
    return resource.post(endpointPattren.create('animal'), data)
  },

  update (payload) {
    return resource.put(endpointPattren.update('animal', payload.id), payload.data)
  },

  delete (id) {
    return resource.delete(endpointPattren.delete('animal', id))
  },

  report (id) {
    return resource.get(endpointPattren.report('animal'))
  }
}
