<script>
import { io } from 'socket.io-client'

export default{

  data(){

    return{

      // socket: this.$route.params.socket
      socket: io( 'http://localhost:3000' ),

      routeParam: this.$route.params,
      codeRoom: this.$route.params.codeRoom,
      codeRoomP1: '', // P - Part
      codeRoomP2: '',
      player1: this.$route.params.player1,
      player2: this.$route.params.player2,
      
      // UserConnect: {},
      host: this.$route.params.host,
      difficulty: this.$route.params.difficulty,

    }

  },

  methods:{

    checkCookie(){

      let cookie = document.cookie
      if ( cookie === '' ) this.redirectInMenu()
      
      let arrCookie = cookie.split( '; ' )
      let username
      arrCookie.forEach( item => {
        
        let index = item.indexOf( 'username=' )
        if ( username !== undefined && index >= 0 ) console.log( `дублирование никнеймов` )
        if ( index >= 0 ) username = item.replace( 'username=', '' )
        
      })
      if ( username === undefined ) this.redirectInMenu()


    },

    listenerDisconnect(){

      console.log( `listenerDisconnect` )
      this.socket.on( "listenerDisconnect", ( response ) => {

        console.log( response )
        if ( response.disconnect === 'host' ) this.$router.push({ name: 'multiPlayer', params: response })
        if ( response.disconnect === 'guest' ) this.player2 = ''

      })

      this.socket.on("connect", () => {

        const engine = this.socket.io.engine;
        engine.on("close", ( reason ) => {

          console.log( reason )
          this.socket.disconnect()
          this.redirectInMenu()
          

        });

      });

    },

    redirectInMenu(){

      this.$router.push({ name: 'multiPlayer' })

    },

    checkRouteParams(){

      let routeDataLength = Object.keys( this.$route.params ).length
      if ( routeDataLength === 0 ) {
        
        this.redirectInMenu()

      } else {

        this.codeRoomP1 = this.codeRoom.substring( 0, 3 ),
        this.codeRoomP2 = this.codeRoom.substring( 3, 6 )

      }

    },

    disconnectFromLobbi(){

      let data = {
        codeRoom: this.codeRoom
      }

      if ( this.host ){
        
        this.socketEmit( 'disconnectHost', data )
        console.log( `Отключение хоста (удалить комнату и всех отключить)` )


      } else {

        this.socketEmit( 'disconnectGuest', data )
        console.log( `Отключение pl2 ` )

      }

      this.socketDisconnect()

    },

    socketEmit( event, data ){

      this.socket.emit( event, data, ( response ) => {

        return response

      })

    },

    socketDisconnect(){

      this.socket.disconnect()
      console.log( `socket disconnect: ${ this.socket.disconnected }` )

    },

    addPopstateListener(){

      console.log( `addPopstateListener` )
      window.addEventListener( "popstate", this.socketDisconnect )

    },

    destroyPopstateListener(){

      console.log( `destroyPopstateListener` )
      window.removeEventListener( "popstate", this.socketDisconnect )

    },



    // ====
    // player 2
    // ====


    listenerDifficulty(){

      this.socket.on( 'listenerDifficulty', ( response ) => {

        // console.log( response )
        this.difficulty = response.difficulty

      })

    },


    // ====
    // host
    // ====


    changeDifficulty( number ){

      console.log( `=== changeDifficulty ===` )

      if ( this.difficulty === number ) return

      this.buttonDifficultyActive( number )
      this.difficulty = number
      let data = {
        codeRoom: this.codeRoom,
        difficulty: this.difficulty
      }

      this.socketEmit( 'changeDifficulty', data )

    },

    buttonDifficultyActive( number ){

      for ( let i = 3; i < 7; i++ ) {

        let item = document.querySelector( `#btnDifficulty${ i }` )
        item.classList.remove( 'bg-whiteOpacity-25' )
        // console.log( item )
        
      }

      let btn = document.querySelector( `#btnDifficulty${ number }` )
      btn.classList.add( 'bg-whiteOpacity-25' )

    },

    hostListeningConnections(){



      if ( this.$route.params.host )
        this.socket.on( 'userConnected', ( response ) => {

          console.log( response )
          this.player2 = response.player2.username

        })

    },

  },

  beforeMount(){

    console.log( this.socket.rooms )
    this.socket.on( 'room', ( response ) => {

      console.log( response )

    })

  },

  mounted(){
  
    // common 
    this.checkCookie()
    this.checkRouteParams()
    this.listenerDisconnect()
    this.addPopstateListener()
    this.host = this.host === 'true'
    
    // player 2
    this.listenerDifficulty()
    
    // host
    this.hostListeningConnections()
    
  },

  beforeUnmount(){

    this.destroyPopstateListener()

  }


}

</script>

<template>
  
  <section class="min-w-[340px] space-y-8 translate-y-[-50%] top-[50%] translate-x-[-50%] left-[50%] absolute ">
    <h1 class="text-2xl text-center"> Lobbi </h1>

    <section class="flex flex-col space-y-5">

      <section class="flex justify-between text-lg ">
        <section>
          <h2 id="codeRoomEl" class="text-center"> CodeRoom: </h2>
          <h2 class="text-center"> {{ this.codeRoomP1 }} {{ this.codeRoomP2 }} </h2>
        </section>
        <ul>
          <li> Players: </li>
          <li id="user1"> • {{ this.player1 }} </li>
          <li id="user2"> • {{ this.player2 }} </li>
        </ul>
      </section>


      <section class="flex items-center space-x-3">
        <h2 class="text-lg"> Difficulty:  </h2>
        <ul v-if="this.host" class=" flex space-x-3 ">
          <li> <pixel-button id="btnDifficulty3" class="bg-whiteOpacity-25" @click="this.changeDifficulty( 3 )" > 3 </pixel-button> </li>
          <li> <pixel-button id="btnDifficulty4" class="" @click="this.changeDifficulty( 4 )" > 4 </pixel-button> </li>
          <li> <pixel-button id="btnDifficulty5" class="" @click="this.changeDifficulty( 5 )" > 5 </pixel-button> </li>
          <li> <pixel-button id="btnDifficulty6" class="" @click="this.changeDifficulty( 6 )" > 6 </pixel-button> </li>
        </ul>
        <span v-else > {{ difficulty }} </span>
      </section>
    </section>

    <section class="space-y-3">
      <pixel-button class="w-full text-base" > Start game </pixel-button>
      <pixel-button @click="this.disconnectFromLobbi()" class="w-full text-base" > Disconnect </pixel-button>
    </section>
  </section>

</template>