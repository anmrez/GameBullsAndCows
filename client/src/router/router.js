import Main from '@/pages/Main.vue'
import NotFound from '@/pages/NotFound.vue'
import singlePlayer from '@/pages/Single.vue'
import multiPlayer from '@/pages/MultiPlayer.vue'
import Lobbi from '@/pages/Lobbi.vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'


const routes = [
     {
          path: '/',
          name: 'Home',
          component: Main
     },
     {
          path: '/singleplayer',
          name: 'singlePlayer',
          component: singlePlayer
     },
     {
          path: '/multiplayer',
          name: 'multiPlayer',
          component: multiPlayer
     },
     {
          path: '/multiplayer/Lobbi',
          name: 'lobbi',
          component: Lobbi
     },
     // { path: '/404', component: NotFound },
     // { path: '/:catchAll(.*)', redirect: '/404' },
     { path: '/:catchAll(.*)', component: NotFound },

]

const router = createRouter({

     // history: createWebHashHistory( ),
     history: createWebHistory(),
     routes,

})

export default router