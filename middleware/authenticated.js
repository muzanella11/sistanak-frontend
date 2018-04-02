import * as AUTH from '~/store/modules/auth/types'

export const EXCEPT_PAGE = ['auth-Signin', 'pagesNotFound']

export default function ({ route, store, redirect }) {
  if (EXCEPT_PAGE.indexOf(route.name) !== -1) {
    return
  }

  if (!store.getters[AUTH.IS_AUTHENTICATED]) {
    redirect('/auth/signin')
  }
}
