<script>
export default {

  name: 'multiplayer-menu',
  data(){

    return{

      connect: false,
      inputConnectValue: ''

    }

  },

  methods:{

    handlerInput(){

      let inputConnect = document.querySelector( '#inputConnect' )
     
      let validationInput = inputConnect.value.replace( /\D/g, '' )
      validationInput = validationInput.substring( 0, 6 )
      inputConnect.value = validationInput
      
      this.inputConnectValue = inputConnect.value

    },

    alertNotFoundRoom( textError ){

      let alertConnectInRoom = document.querySelector( '#alertConnectInRoom' )
      alertConnectInRoom.innerHTML = '! ' + textError
      alertConnectInRoom.classList.remove( 'hidden' )

    },

    connectIO(){

      console.log( `connectIO` )
      let codeRoom = this.inputConnectValue
      let cookie = document.cookie

      this.$socket.emit( 'connectLobby', { codeRoom, cookie }, ( response ) => {

        if ( response === 'room not found' ) return this.alertNotFoundRoom( response )
        if ( response === 'The lobby is full' ) return this.alertNotFoundRoom( response )

        let routeRes = {
          host: false,
          codeRoom: response.codeRoom,
          player1: response.player1.username,
          player2: response.player2.username,
          difficulty: response.difficulty,
        }
        return this.$router.push( { name: 'lobby', params: routeRes } )

      })

    },

    createLobby(){

      let cookie = document.cookie
      console.log( cookie )

      this.$socket.emit( 'createLobby', { cookie }, ( response ) => {

        let routeRes = {
          host: true,
          codeRoom: response.codeRoom,
          player1: response.player1.username,
          player2: '',
        }
        console.log( routeRes )
        this.$router.push( { name: 'lobby', params: routeRes } )

      })

    },

    listenerKeyEnter( e ){

      if (e.key === 'Enter') this.connectIO()

    },

    inputConnectFocus(){

      let inputConnect = document.querySelector( '#inputConnect' )
      inputConnect.focus()

    }

  },
  
  updated(){
    
    this.inputConnectFocus()
    if ( this.connect ) document.addEventListener( 'keypress', this.listenerKeyEnter );
    if ( !this.connect ) {

      document.removeEventListener( 'keypress', this.listenerKeyEnter );
      
      let alertConnectInRoom = document.querySelector( '#alertConnectInRoom' )
      alertConnectInRoom.classList.add( 'hidden' )
    
    } 

  },
  
  beforeUnmount(){

    document.removeEventListener( 'keypress', this.listenerKeyEnter );

  },

}

</script>

<template>
  
  <section class="w-[90%] md:w-auto translate-y-[-50%] top-[50%] translate-x-[-50%] left-[50%] absolute ">

    <section v-show="connect === false" class="space-y-5">

      <pixel-button class="w-full text-base" @click="this.connect = true" > Connect to the Lobby </pixel-button>
      <pixel-button class="w-full text-base" @click="this.createLobby()" > Create the Lobby </pixel-button>
      <back-to-menu class=""></back-to-menu>

    </section >

    <section class="text-center space-y-3 " v-show="connect === true">
    
      <h2> Connect to the Lobby </h2>
      <p> Input code room ( 6 digits ) </p>
      <section id="alertConnectInRoom" class="hidden bg-redOpacity border border-red-500 rounded" ></section>
      
      <input id="inputConnect" type="tel" @input="handlerInput" class="w-full h-full bg-whiteOpacity-10 text-4xl text-center rounded outline outline-2 outline-transparent outline-offset-1 focus:outline-white">
      <pixel-button class="w-full text-base" @click="this.connectIO()" > Connect </pixel-button>
      <pixel-button class="w-full text-base" @click="this.connect = false" > Back </pixel-button>

    </section>

  </section>

</template>