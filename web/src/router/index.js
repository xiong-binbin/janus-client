import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Camera from '@/components/Camera'
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
      path: '/camera',
      name: 'Camera',
      component: Camera
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },    
  ]
})
