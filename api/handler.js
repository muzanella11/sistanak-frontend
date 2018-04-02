
let errorHandler = {
  unauthenticated () {
    window.$nuxt.redirect('/logout')
  }
}

export default error => {
  let response = error.response

  if (typeof response === 'undefined') {
    return
  }

  switch (response.status) {
    case 401:
      errorHandler.unauthenticated()
      break
  }

  return Promise.reject(error)
}
