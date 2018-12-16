//
// External dependencies
//
import Vue from 'vue'
import Vuex from 'vuex'
import VueI18n from 'vue-i18n'
import VueRouter from 'vue-router'
import FastClick from 'fastclick'
import i18n from './locale/index'
import router from './router/index'
import VueChartist from 'vue-chartist'
import chartistPluginAxisTitle from './module/chartist/chartist-plugin-axistitle'
import chartistPluginAccessibility from './module/chartist/chartist-plugin-accessibility'

//
// Internal dependencies
// * All the internal dependencies
//
import App from './App'
import Store from './vuex/index'

/* eslint-disable no-new */
/* Middlewares */
Vue.use(VueI18n)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueChartist)
chartistPluginAxisTitle(Vue.chartist)
chartistPluginAccessibility(Vue.chartist)

FastClick.attach(document.body)

const store = new Vuex.Store(Store)

router.beforeEach((to, from, next) => {
  // SET_LANGUAGE
  // * Set the language on the url
  // * Example: www.domain.com/en/home
  // Vue.config.lang = to.params.lang
  // store.loader.dispatch('show')
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // This route requires auth, check if the user is logged in
    if (!store.state.user.data.name) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  // this.isLoading = false
  // store.loader.dispatch('hide')
})

new Vue({
  router,
  store,
  i18n: new VueI18n(i18n),
  template: '<App/>',
  components: { App }
}).$mount('#app')

// // Handle unloading the website
// window.onbeforeunload = quitSession

// function quitSession (evt) {
//   // do something
//   window.localStorage.setItem('last_logged_in', Date.now())
//   return null
// }
