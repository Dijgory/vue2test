import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Home from '../components/Home'
import indexcourse from '../components/course/indexcourse'
import indexclass from '../components/class/indexclass'

Vue.use(Router)
export default new Router({
  mode:'history',
  linkActiveClass:'active',
  routes: [
     {
      path:'/',
      component: Login,
      // redirect: '/home'
    }, 
    {
      path:'/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      redirect: '/home/indexcourse',
      children:[{
        path:'/home/indexcourse',
        component: indexcourse
      },
      {
        path:'/home/indexclass',
        component: indexclass
      }]
    },
  ]
})
