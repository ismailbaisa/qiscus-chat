import store from '../store'

const authGuard = (to, from, next) => {
  if (to.name === 'Login') {
    if (store.state.isLogin) {
      next('/dashboard')
    } else {
      next()
    }
  } else {
    if (store.state.isLogin) {
      store.dispatch('setPageName', to.name)
      next()
    } else {
      next('/')
    }
  }
}

export {
  authGuard
}