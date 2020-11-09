import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Camera from '@/components/Camera'
import Echo from '@/components/Echo'
import Test from '@/components/Test'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Camera',
      name: 'Camera',
      component: Camera
    },
    {
      path: '/Echo',
      name: 'Echo',
      component: Echo
    },    
    {
      path: '/Test',
      name: 'Test',
      component: Test
    },    
  ]
})
