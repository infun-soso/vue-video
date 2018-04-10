import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Me from '@/pages/Me'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          name: 'search',
          path: '/home/search',
          component: Search
        }
      ],
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/me',
      name: 'me',
      component: Me
    }
  ]
})
