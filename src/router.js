import Vue from 'vue'
import Router from 'vue-router'

import store from './store';

import Home from './views/Home.vue'
import Login from './views/Login.vue'
import User from './views/User.vue'
import Flashcards from './views/Flashcards.vue'
import Test from './views/Test.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/user/:id',
      name: 'user',
      component: User
    },
    {
      path: '/studyset/:id/flashcards',
      name: 'flashcards',
      component: Flashcards
    },
    {
      path: '/studyset/:id/test',
      name: 'test',
      component: Test
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(!store.state.isAuthenticated && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})

export default router