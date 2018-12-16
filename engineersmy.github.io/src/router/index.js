import VueRouter from 'vue-router'
/*
 * All the individual pages, arranged A-Z
**/
import PageData from '../components/page/data'
// import PageEvent from '../components/page/event'
import PageHome from '../components/page/home'
import PageFeedback from '../components/page/feedback'

/*
 * Export routes to be reused in the app-navbar, KISS
**/
export const routes = [
  // Orders are alphebetical, A-Z
  {
    name: 'index',
    path: '*',
    redirect: '/home',
    meta: {
      requiresAuth: false
    }
  },
  {
    name: 'home',
    path: '/home',
    component: PageHome
  },
  {
    name: 'data',
    path: '/data',
    component: PageData,
    meta: {
      requiresAuth: false
    }
  },
  // {
  //   name: 'events',
  //   path: '/events',
  //   component: PageEvent
  // },
  {
    name: 'feedback',
    path: '/feedbacks',
    component: PageFeedback
  }
]

export default new VueRouter({
  mode: 'history',
  routes
})
