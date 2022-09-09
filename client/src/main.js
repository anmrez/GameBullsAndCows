import { createApp } from 'vue'
import router from '@/router/router'
import components from '@/components/ui'
import './assets/css/output.css'
import App from './App.vue'
import { io } from 'socket.io-client'

const app = createApp(App)

app.config.globalProperties.$socket = io( 'http://localhost:3000' ,{
  autoConnect: false
})

components.forEach( item => {
  // console.log( item )
  app.component( item.name, item )

});



app
  .use(router)
  .mount('#app')
