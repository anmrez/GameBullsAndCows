<script>

export default {

  data(){

    return{

      socketConnectStatus: 'waiting',
      loginStatus: false,
      hostDisconnect: this.$route.params.disconnect,
      
    }

  },

  methods:{

    checkSocketConnsect(){

      if ( this.$socket.connected ) {

        this.socketConnectStatus = 'success'

      } else {

        this.socketConnect()

      }

    },

    socketConnect(){

      this.$socket.connect();

      this.$socket.on( "connect", () => {

        if ( this.$socket.connected ) {
          this.socketConnectStatus = 'success'
          console.log( `socket conndect: ${ this.$socket.connected }` )
          // setTimeout( this.socketDisconnect, 1000 )
        }

      });

    },

    checkSocketError(){

      this.$socket.on( "connect_error", (error) => {
        if ( error ) {
          this.socketConnectStatus = 'fail'
          console.log( `socket error` )
        } 
      });

    },

  },

  beforeMount(){

    this.checkSocketConnsect()
    this.checkSocketError()
    
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