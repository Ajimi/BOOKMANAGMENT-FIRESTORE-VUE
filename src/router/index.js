import Vue from 'vue'
import Router from 'vue-router'
import Vuetify from 'vuetify'
import Navbar from '@/components/Navbar'
import BookAdd from '@/components/BookAdd'
import BookView from '@/components/BookView'
import BookEdit from '@/components/BookEdit'

Vue.use(Router)
Vue.use(Vuetify)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'BookView',
      component: BookView
    },
    {
      path: '/new',
      name: 'BookAdd',
      component: BookAdd
    }
  ]
})
