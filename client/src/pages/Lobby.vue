<script>

export default{

  data(){

    return{

      routeParam: this.$route.params,
      codeRoom: this.$route.params.codeRoom,
      codeRoomP1: '', // P - Part
      codeRoomP2: '',
      player1: this.$route.params.player1,
      player2: this.$route.params.player2,
      host: this.$route.params.host,
      // difficulty: this.$route.params.difficulty,
      difficulty: 3

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
        if ( username !== undefined && index >= 0 ){
          // console.log( `дублирование никнеймов` )
          // console.log( `index: ${ index }; item: ${ item }` )
          document.cookie = 'username=;expires=Thu, 01 Jan 1970 00:00:00 GMT'


        } 
        if ( index >= 0 ) {
          username = item.replace( 'username=', '' )
        } 
        
      })
      if ( username === undefined ) this.redirectInMenu()


    },

    listenerDisconnect( data ){

      // console.log( `=== listenerDisconnect ===` )
      let player = data.disconnect
      // console.log( player )

      if ( player === 'host' ) this.redirectInMenu()
      if ( player === 'guest' ) this.player2 = ''

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

    disconnectFromLobby(){

      let data = {
        codeRoom: this.codeRoom
      }

      if ( this.host ){
        
        this.socketEmit( 'disconnectHost', data )

      } else {

        this.socketEmit( 'disconnectGuest', data )

      }

      this.redirectInMenu()

    },

    socketEmit( event, data ){

      this.$socket.emit( event, data, ( response ) => {

        return response

      })

    },

    listenerRoom(){

      this.$socket.on( 'room', ( response ) => {

        let param = response.param

        if ( this.host && response.event === 'userConnected' ) this.hostListeningConnections( param )
        
        if ( !this.host && response.event === 'listenerDifficulty' ) this.listenerDifficulty( param )

        // all
        if ( response.event === 'listenerDisconnect' ) this.listenerDisconnect( param )
        if ( response.event === 'startGame' ) this.redirectInGame()

      })

    },

    redirectInGame(){

      let param = {
        codeRoom: this.codeRoom,
        difficulty: this.difficulty,
        player1: this.player1,
        player2: this.player2,
      }
      this.$socket.off( 'room' );
      this.$router.push({ name: 'MultiplayerGame', params: param })

    },

    // ====
    // player 2
    // ====


    listenerDifficulty( data ){

      // console.log( data )
      let difficulty = data.difficulty
      this.difficulty = difficulty

    },


    // ====
    // host
    // ====


    changeDifficulty( number ){

      // console.log( `=== changeDifficulty ===` )

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

    hostListeningConnections( data ){

      // console.log( data )
      let player2 = data.player2.username
      this.player2 = player2

    },

    checkPlayer2(){

      let data = {
        codeRoom: this.codeRoom
      }

      this.$socket.emit( 'checkPlayer2', data, async ( response ) => {

        if ( response === 'fail' ) this.showAlertStartGame()
        if ( response === 'success' ) this.startGame()
        // this.startGame()

      })

    },

    showAlertStartGame(){

      let alertStartGame = document.querySelector( '#alertStartGame' )
      alertStartGame.classList.remove( 'hidden' )

    },

    startGame(){

      let data = {
        codeRoom: this.codeRoom
      }
      this.socketEmit( 'startGame', data )
      
    },

    copyCode(){

      let copyStatus = document.querySelector( '#copyStatus' )

      navigator.clipboard.writeText( this.codeRoom ).then( function(){
        console.log( `success` )
        copyStatus.innerHTML = 'copied'
        setTimeout( function(){
          copyStatus.innerHTML = 'copy'
        }, 2000 )
      },
      function( err ){
        console.log( err )
        copyStatus.innerHTML = 'failed'
      } )

    },

  },

  mounted(){

    let copyCodeRoom = document.querySelector( '#copyCodeRoom' )
    copyCodeRoom.addEventListener( 'click', this.copyCode )

  },
  
  beforeMount(){
    
    // common 
    this.listenerRoom()
    this.checkCookie()
    this.checkRouteParams()
    this.host = this.host === 'true'
    
  },

  beforeUnmount(){

    let copyCodeRoom = document.querySelector( '#copyCodeRoom' )
    copyCodeRoom.removeEventListener( 'click', this.copyCode )

  },


}

</script>

<template>
  
  <section class="min-w-[340px] space-y-8 translate-y-[-50%] top-[50%] translate-x-[-50%] left-[50%] absolute ">
    <h1 class="text-2xl text-center"> Lobby </h1>

    <section class="flex flex-col space-y-5">

      <section class="flex justify-between text-lg ">
        <section id="copyCodeRoom" class="p-2 cursor-pointer rounded hover:bg-whiteOpacity-10">
          <h2 id="codeRoomEl" class="text-center"> Room code: </h2>
          <h2 class="text-center">
            <section>
              <span>
                {{ this.codeRoomP1 }} 
              </span>
              <span class="ml-2">
                {{ this.codeRoomP2 }}
              </span>
            </section>
            <span id="copyStatus" class="text-whiteOpacity-50 text-xs"> copy </span>
          </h2>
              
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
      <section id="alertStartGame" class="text-center hidden bg-redOpacity border border-red-500 rounded" > Player is absent </section>
      <pixel-button v-if="this.host" @click="this.checkPlayer2()" class="w-full text-base" > Start game </pixel-button>
      <pixel-button @click="this.disconnectFromLobby()" class="w-full text-base" > Disconnect </pixel-button>
    </section>
  </section>

</template>