<script>

export default {

  data(){

    return{

      socketConnectStatus: 'waiting',
      loginStatus: false,
      hostDisconnect: this.$route.params.disconnect,
      listenerSocketEvent: false,
      
    }

  },

  methods:{

    checkSocketConnsect(){

      if ( this.$socket.connected ) {

        this.socketConnectStatus = "success"

      } else {

        this.socketConnect()

      }

    },

    socketConnect(){

      this.$socket.connect();

      this.$socket.once( "connect", ( ) => {

        if ( this.$socket.connected ) {

          this.socketConnectStatus = "success"
          console.log( `socket connect: ${ this.$socket.connected }` )

        }

      });

    },

    checkSocketError(){

      this.$socket.off( "connect_error" );
      this.$socket.once( "connect_error", (error) => {
        if ( error ) {

          this.socketConnectStatus = 'fail'
          console.log( `connection error:` )
          console.log( error )

        } 
      });

    },

    socketListenerDisconnect(){

      this.$socket.off( "disconnect" );
      this.$socket.once( "disconnect", (  ) => { this.$router.push({ name: 'multiPlayer' }) });

    }

  },

  beforeMount(){

    this.checkSocketError()
    this.checkSocketConnsect()
    this.socketListenerDisconnect()
    
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