import { createApp } from 'vue'
import router from '@/router/router'
import components from '@/components/ui'
import './assets/css/output.css'
import App from './App.vue'
import { io } from 'socket.io-client'

const app = createApp( App )

// app.config.globalProperties.$socket = io( 'http://79.132.136.197:5005' ,{
app.config.globalProperties.$socket = io( 'http://192.168.0.2:5005' ,{
  autoConnect: false
})

app.config.globalProperties.$generateNumber = function( difficulty ){

  let number = ''
  let generateDigit = function(){

    let digit = Math.random() * 10
    digit = Math.round( digit )
    
    if ( digit > 9 ) return generateDigit()
    return digit

  }

  for ( let index = 0; index < difficulty; index++ ) {
  
    let digit = generateDigit()
    let reg = new RegExp( digit )

    if ( reg.test( number ) ) {

      index--

    } else {

      number += digit.toString()

    }
      
  }

  // console.log( `hidden number: `, number )
  return number

}



components.forEach( item => {
  // console.log( item )
  app.component( item.name, item )

});



app
  .use(router)
  .mount('#app')
