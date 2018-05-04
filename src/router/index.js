import Vue from 'vue'
import Router from 'vue-router'
import homePage from '@/views/home'
import detailCom from '@/components/detail'
import targetCom from '@/components/target'
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
    }
  ]
})
