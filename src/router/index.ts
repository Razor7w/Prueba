import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
// Import Store
import store from '@/store'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '*',
    name: 'not-found',
    redirect: '/base'
  },
  {
    path: '/base',
    name: 'Base',
    component: () => import(/* webpackChunkName: "base" */ '@/views/Home.vue')
  },
  {
    path: '/api/:type',
    name: 'api',
    component: () => import(/* webpackChunkName: "api" */ '@/views/Api.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters['SessionModule/isAuth'] || (to.meta.admin && store.getters['SessionModule/getRole'] === 1)) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.tester)) {
    if (store.getters['AppModule/isTest'] === 'FALSE') {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
