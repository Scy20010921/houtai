import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/Main.vue'
import Home from '@/views/Home/index.vue'
import User from '@/views/User/index.vue'
import Mall from '@/views/Mall/index.vue'
import PageOne from '@/views/Other/pageOne.vue'
import PageTwo from '@/views/Other/pageTwo.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/main' },
    {
      path: '/main',
      component: Main,
      redirect: '/main/home',
      children: [
        {
          path: 'home',
          name: 'home',
          component: Home,
        },
        {
          path: 'user',
          name: 'user',
          component: User,
        },
        {
          path: 'mall',
          name: 'mall',
          component: Mall,
        },
        {
          path: 'page1',
          name: 'page1',
          component: PageOne,
        },
        {
          path: 'page2',
          name: 'page2',
          component: PageTwo,
        },
      ],
    },
  ],
  // routes: [
  //   { path: '/', redirect: '/home' },
  //   {
  //     path: '/main',
  //     component: Main,
  //     children: [
  //       { path: '/home', component: Home },
  //       { path: '/user', component: User },
  //       { path: '/mall', component: Mall },
  //       { path: '/page1', component: page1 },
  //       { path: '/page2', component: page2 },
  //     ],
  //   },
  // ],
})

export default router
