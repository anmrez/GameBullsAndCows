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

    socketDisconnect(){

      this.socket.disconnect()
      console.log( `socket disconnect: ${ this.socket.disconnected }` )

    },

    socketConnect(){

      this.socket.on( "connect", () => {
        console.log( `socket conndect: ${ this.socket.connected }` )
      })
      this.socket.connect();

    },

    alertNotFoundRoom(){

      let alertRoom = document.querySelector( '#alertRoom' )
      alertRoom.classList.remove( 'hidden' )
      // console.log( `Комната не найдена` )

    },

    connectIO(){

      console.log( `connectIO` )
      let codeRoom = this.inputConnectValue
      let cookie = document.cookie
      // this.socket.connect();
      this.socketConnect()
      this.socket.emit( 'connectLobbi', { codeRoom, cookie }, ( response ) => {

        if ( response !== 'room not found' ) {

          console.log( response )
          let routeRes = {
            host: false,
            codeRoom: response.codeRoom,
            player1: response.player1.username,
            player2: response.player2.username,
            difficulty: response.difficulty,
          }
          return this.$router.push( { name: 'lobbi', params: routeRes } )

        } 
        this.socketDisconnect()
        return this.alertNotFoundRoom()

      })

    },

    createLobbi(){

      let cookie = document.cookie
      console.log( cookie )
      // this.socket.connect();
      this.socketConnect()
      this.socket.emit( 'createLobbi', { cookie }, ( response ) => {

        // console.log( response )
        let routeRes = {
          host: true,
          codeRoom: response.codeRoom,
          player1: response.player1.username,
          player2: '',
        }
        this.socketDisconnect()
        this.$router.push( { name: 'lobbi', params: routeRes } )

      })

    }

  },
  
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
      <back-to-menu class=""></back-to-menu>

    </section >

    <section class="text-center space-y-3 " v-show="connect === true">
    
      <h2> Connect to the lobbi </h2>
      <p> Input code room ( 6 digits ) </p>
      <section id="alertRoom" class="hidden bg-redOpacity border border-red-500 rounded" >
        ! room not found
      </section>
      <input id="inputConnect" type="text" @input="handlerInput" class="w-full h-full bg-whiteOpacity-10 text-4xl text-center rounded outline outline-2 outline-transparent outline-offset-1 focus:outline-white">
      <pixel-button class="w-full text-base" @click="this.connectIO()" > Connect </pixel-button>
      <pixel-button class="w-full text-base" @click="this.connect = false" > Back </pixel-button>

    </section>

  </section>

</template>