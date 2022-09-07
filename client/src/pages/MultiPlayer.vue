<script>
import { io } from 'socket.io-client'

export default {

  data(){

    return{

      socketConnectStatus: 'waiting',
      socket: io( 'http://localhost:3000' ),
      loginStatus: false,
      hostDisconnect: this.$route.params.disconnect

    }

  },

  methods:{

    socketDisconnect(){

      console.log( `socket diskonecter` )
      this.socket.disconnect()

    },

    socketConnect(){

      this.socket.connect();

      this.socket.on( "connect", () => {

        if ( this.socket.connected ) {
          this.socketConnectStatus = 'success'
          console.log( `socket conndect: ${ this.socket.connected }` )
          setTimeout( this.socketDisconnect, 1000 )
        }
        // this.socket.disconnect()

      });

    },

  },

  // mounted(){

  //   console.log( this.$route.params )

  // },


  beforeMount(){

    
    this.socketConnect()

    
    
    this.socket.on( "connect_error", (error) => {
      if ( error ) this.socketConnectStatus = 'fail'
    });
    

  }
  
}


</script>

<template>
  
  <section class="h-[100vh] w-full  top-0 left-0 absolute">

    <pixel-spinner v-if="this.socketConnectStatus !== 'success'" v-bind:connection="this.socketConnectStatus"> </pixel-spinner>

    <multiplayer-login 
      v-if="this.socketConnectStatus === 'success' && this.loginStatus === false" 
      @LoginStatus="this.loginStatus = true"
    ></multiplayer-login>

    <multiplayer-menu v-if="loginStatus" v-bind:socket="this.socket" ></multiplayer-menu>


  </section>


</template>