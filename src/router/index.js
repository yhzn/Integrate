import Vue from 'vue'
import Router from 'vue-router'
import homePage from '@/views/home'
import patientPage from '@/views/patient'

import detailCom from '@/components/detail'
import targetCom from '@/components/target'
import targetListCom from '@/components/target-list'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: homePage,
      children:[
        {
          path:'/detail',
          component:detailCom
        },
        {
          path:'/target',
          component:targetCom
        }
      ]
    },
    {
      path:'/patient',
      name:'patient',
      component:patientPage,
      children:[
        {
          path:'/patient/target-list',
          name:'targetListCom',
          component:targetListCom
        }
      ]
    }
  ]
})
