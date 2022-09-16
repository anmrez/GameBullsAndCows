import Main from '@/pages/Main.vue'
import NotFound from '@/pages/NotFound.vue'
import singlePlayer from '@/pages/Single.vue'
import multiPlayer from '@/pages/MultiPlayer.vue'
import Lobby from '@/pages/Lobby.vue'
import Dev from '@/pages/Dev.vue'
import MultiplayerGame from '@/pages/MultiplayerGame.vue'
import { createRouter, createWebHistory } from 'vue-router'


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
          path: '/multiplayer/lobby',
          name: 'lobby',
          component: Lobby
     },
     {
          path: '/multiplayer/game',
          name: 'MultiplayerGame',
          component: MultiplayerGame
     },
     {
          path: '/dev',
          name: 'Dev',
          component: Dev
     },
     { path: '/:catchAll(.*)', component: NotFound },

]

const router = createRouter({

     history: createWebHistory(),
     routes,

})

export default router