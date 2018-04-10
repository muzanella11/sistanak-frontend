import * as AUTH from '~/store/modules/auth/types'
// import localStorage from 'store'

export const AUTH_PAGE_USER = ['admin-hewan-ownership-list', 'admin-hewan-ownership-create', 'admin-environment-list', 'admin-environment-create']
export const EXCEPT_PAGE = ['auth-Signin', 'pagesNotFound']

export default function ({ route, store, redirect }) {
  if (EXCEPT_PAGE.indexOf(route.name) !== -1) {
    return
  }

  if (!store.getters[AUTH.IS_AUTHENTICATED]) {
    redirect('/auth/signin')
  }
}
