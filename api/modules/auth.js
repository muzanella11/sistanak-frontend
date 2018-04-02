import resource from '~/api/resource'
import endpoint from '~/api/endpoint'

export default {
  login (credentials) {
    return resource.post(endpoint.auth.authorization, credentials)
  }
}
