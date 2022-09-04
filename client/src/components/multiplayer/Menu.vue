<script>
import { io } from 'socket.io-client'
export default {

  name: 'multiplayer-menu',
  data(){

    return{

      connect: false,
      socket: io( 'http://localhost:3000', { autoConnect: false } ),
      inputConnectValue: ''

    }

  },

  methods:{

    handlerInput(){

      let inputConnect = document.querySelector( '#inputConnect' )
      this.inputConnectValue = inputConnect.value
      console.log( this.inputConnectValue )

      // check input!!!!

    },

    alertNotFoundRoom(){

      console.log( `null` )

    },

    connectIO(){

      console.log( `connectIO` )
      let codeRoom = this.inputConnectValue
      let cookie = document.cookie
      this.socket.connect();
      this.socket.emit( 'connectLobbi', { codeRoom, cookie }, ( response ) => {

        // console.log( response )
        if ( response.status !== 'not found' ) return this.$router.push( { name: 'lobbi', params: response } )
        return this.alertNotFoundRoom()

      })

    },

    createLobbi(){

      let cookie = document.cookie
      console.log( cookie )
      this.socket.connect();
      this.socket.emit( 'createLobbi', { cookie }, ( response ) => {

        console.log( response )
        this.$router.push( { name: 'lobbi', params: response } )

      })

    }

  },

  // mounted(){


    
  // },
  
  updated(){
    
    let inputConnect = document.querySelector( '#inputConnect' )
    inputConnect.focus()

  }

}

</script>

<template>
  
  <section class=" translate-y-[-50%] top-[50%] translate-x-[-50%] left-[50%] absolute ">

    <section v-show="connect === false" class="space-y-5">
      <pixel-button class="w-full text-base" @click="this.connect = true" > Connect to the lobbi </pixel-button>
      <pixel-button class="w-full text-base" @click="this.createLobbi()" > Create the lobbi </pixel-button>
  
      <!-- <section>
        <router-link to="/multiplayer/lobbi" class="py-2 px-4 border-2 border-white rounded hover:bg-whiteOpacity-10 flex justify-center space-x-3" > Create the lobbi </router-link>
      </section> -->
  
      <back-to-menu class=""></back-to-menu>
    </section >

    <section class="text-center space-y-3 " v-show="connect === true">
    
      <h2> Connect to the lobbi </h2>
      <p> Input code room ( 6 digits ) </p>
      <input id="inputConnect" type="text" @input="handlerInput" class="w-full h-full bg-whiteOpacity-10 text-4xl text-center rounded outline outline-2 outline-transparent outline-offset-1 focus:outline-white">
      <pixel-button class="w-full text-base" @click="this.connectIO()" > Connect </pixel-button>

    </section>

  </section>

</template>