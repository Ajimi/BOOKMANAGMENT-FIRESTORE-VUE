import Vue from 'vue'
import Router from 'vue-router'
import Vuetify from 'vuetify'
import VeeValidate from 'vee-validate'
import Navbar from '@/components/Navbar'
import BookAdd from '@/components/BookAdd'
import BookView from '@/components/BookView'
import BookList from '@/components/BookList'
import BookEdit from '@/components/BookEdit'

Vue.use(Router)
Vue.use(Vuetify)
Vue.use(VeeValidate)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'BookList',
      component: BookList
    },
    {
      path: '/new',
      name: 'BookAdd',
      component: BookAdd
    },
    {
      path: '/edit/:book_id',
      name: 'BookEdit',
      component: BookEdit
    },
    {
      path: '/:book_id',
      name: 'BookView',
      component: BookView
    }
  ]
})
