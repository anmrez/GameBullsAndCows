import { createApp } from 'vue'
import router from '@/router/router'
import components from '@/components/ui'
import './assets/css/output.css'
import App from './App.vue'

const app = createApp(App)

components.forEach( item => {
  // console.log( item )
  app.component( item.name, item )

});



app
  .use(router)
  .mount('#app')
