<script>

import axios from 'axios'


export default {
  data(){



  },

  methods: {

    async fetchRooms(){

      try {
      
        let config = {
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        }
        let response = await axios.get( 'http://192.168.0.2:3000/api/rooms/get', config )
        // let response = await axios.get( 'https://jsonplaceholder.typicode.com/posts' )
        
        console.log( response )

      } catch ( error ) {
        
        console.log( error )

      }

    }

  }

}


// import { io } from 'socket.io-client'
// import { onBeforeMount } from 'vue'
// const socket = io('http://192.168.0.2:3000/')


// onBeforeMount( () => {
//   socket.emit( 'connectInRoom', {}, ( response ) => {
    
//     console.log( response )

//   })
// })

</script>
<template>

  <h1> Multiplayer page</h1>
  <button @click="fetchRooms()"> Список комнат </button>

</template>
