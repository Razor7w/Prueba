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
    component: () => import(/* webpackChunkName: "login" */ '@/views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue')
  },
  {
    path: '/Inicio',
    name: 'Inicio',
    component: () => import(/* webpackChunkName: "Inicio" */ '@/views/Inicio.vue'),
    meta: { requiresAuth: true, layout: 'default' }
  },
  {
    path: '/Caja',
    name: 'Caja',
    component: () => import(/* webpackChunkName: "caja" */ '@/views/Caja.vue'),
    meta: { requiresAuth: true, layout: 'default' }
  },
  {
    path: '/Comandas',
    name: 'Comandas',
    component: () => import(/* webpackChunkName: "comandas" */ '@/views/Comandas.vue'),
    meta: { requiresAuth: true, layout: 'default' }
  },
  {
    path: '/Cuadrar-caja',
    name: 'Cuadrar Caja',
    component: () => import(/* webpackChunkName: "cuadrar-caja" */ '@/views/Cuadrar-caja.vue'),
    meta: { requiresAuth: true, layout: 'default' }
  },
  {
    path: '/Productos',
    name: 'Productos',
    component: () => import(/* webpackChunkName: "cuadrar-caja" */ '@/views/Productos.vue'),
    meta: { requiresAuth: true, layout: 'default', admin: true }
  },
  {
    path: '/Usuarios',
    name: 'Usuarios',
    component: () => import(/* webpackChunkName: "cuadrar-caja" */ '@/views/Usuarios.vue'),
    meta: { requiresAuth: true, layout: 'default', admin: true }
  },
  {
    path: '/test',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: { layout: 'test', tester: true }
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
