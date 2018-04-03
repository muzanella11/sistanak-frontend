import * as AUTH from '~/store/modules/auth/types'

export default function ({ store, redirect }) {
  if (store.getters[AUTH.IS_AUTHENTICATED]) {
    redirect('/')
  }
}
