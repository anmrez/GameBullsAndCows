<script>
import { io } from 'socket.io-client'

export default{

  data(){

    return{

      // socket: this.$route.params.socket
      socket: io( 'http://localhost:3000' ),
      codeRoom: this.$route.params.code,
      codeRoomP1: '', // P - Part
      codeRoomP2: '',
      nameHost: this.$route.params.host,
      nameGuest: this.$route.params.guest,
      UserConnect: {}

    }

  },

  methods:{

    checkCookie(){

      let cookie = document.cookie
      if ( cookie === '' ) this.$router.push({ name: 'multiPlayer' })
      let arrCookie = cookie.split( '; ' )

      let username
      arrCookie.forEach( item => {
        
        let index = item.indexOf( 'username=' )
        if ( username !== undefined && index >= 0 ) console.log( `дублирование никнеймов` )
        if ( index >= 0 ) username = item.replace( 'username=', '' )
        
      })
      if ( username === undefined ) this.$router.push({ name: 'multiPlayer' })


    },

    handlerDisconnect(){

      this.socket.on("connect", () => {

      const engine = this.socket.io.engine;
      engine.on("close", (reason) => {

        console.log( reason )
        this.socket.disconnect()
        this.$router.push( { name: 'multiPlayer' } )
        

      });

      });

    },

    changeDifficulty( number ){

      console.log( `=== changeDifficulty ===` )
      this.buttonDifficultyActive( number )
      this.socket.emit( 'changeDifficulty', { number }, ( response ) => {

        console.log( response )

      })

    },

    buttonDifficultyActive( number ){

      console.log( `buttonDifficultyActive` )
      for ( let i = 3; i < 7; i++ ) {

        let item = document.querySelector( `#btnDifficulty${ i }` )
        item.classList.remove( 'bg-whiteOpacity-25' )
        console.log( item )
        
      }

      let btn = document.querySelector( `#btnDifficulty${ number }` )
      btn.classList.add( 'bg-whiteOpacity-25' )

    }

  },

  mounted(){

    this.checkCookie()
    if ( this.codeRoom ) {
      this.codeRoomP1 = this.codeRoom.substring( 0, 3 ),
      this.codeRoomP2 = this.codeRoom.substring( 3, 6 )
    }

    
    
  },
  
  beforeMount(){
    
    let routeDataLength = Object.keys( this.$route.params ).length
    if ( routeDataLength === 0 ) this.$router.push({ name: 'multiPlayer' })
    this.handlerDisconnect()
    
    // listener connect
    this.socket.on( 'userConnected', ( response ) => {

      console.log( response )
      this.UserConnect = response.player2
      this.nameGuest = this.UserConnect.username

    })


    // Сделать только не хосту
    this.socket.on( 'clickDif', ( response ) => {

      console.log( response )
      let difficulty = response.difficulty
      this.buttonDifficultyActive( difficulty )


    })

  }

}

</script>

<template>
  
  <section class="space-y-8 translate-y-[-50%] top-[50%] translate-x-[-50%] left-[50%] absolute ">
    <h1 class="text-2xl text-center"> Lobbi </h1>

    <section class="flex flex-col space-y-5">

      <section class="flex justify-between text-lg ">
        <section>
          <h2 id="codeRoomEl" class="text-center"> CodeRoom: </h2>
          <h2 class="text-center"> {{ this.codeRoomP1 }} {{ this.codeRoomP2 }} </h2>
        </section>
        <ul>
          <li> Players: </li>
          <li id="user1"> • {{ this.nameHost }} </li>
          <li id="user2"> • {{ this.nameGuest }} </li>
        </ul>
      </section>


      <section class="flex items-center space-x-3">
        <h2 class="text-lg"> Difficulty:  </h2>
        <ul class=" flex space-x-3 ">
          <li> <pixel-button id="btnDifficulty3" class="" @click="this.changeDifficulty( 3 )" > 3 </pixel-button> </li>
          <li> <pixel-button id="btnDifficulty4" class="" @click="this.changeDifficulty( 4 )" > 4 </pixel-button> </li>
          <li> <pixel-button id="btnDifficulty5" class="" @click="this.changeDifficulty( 5 )" > 5 </pixel-button> </li>
          <li> <pixel-button id="btnDifficulty6" class="" @click="this.changeDifficulty( 6 )" > 6 </pixel-button> </li>
        </ul>
      </section>
    </section>

    <section class="space-y-3">
      <pixel-button class="w-full text-base" > Start game </pixel-button>
      <pixel-button class="w-full text-base" > Disconnect </pixel-button>
    </section>
  </section>

</template>