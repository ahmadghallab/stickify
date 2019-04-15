import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import StudySets from './views/StudySets.vue'
import Cards from './views/Cards.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/studysets',
      name: 'studysets',
      component: StudySets
    },
    {
      path: '/studysets/:id',
      name: 'cards',
      component: Cards
    }
  ]
})
