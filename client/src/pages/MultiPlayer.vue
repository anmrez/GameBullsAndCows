<script>
import { io } from 'socket.io-client'
import PixelButton from '../components/ui/Pixel-button.vue'
import ButtonBack from '../components/ui/Button-back.vue'

export default {
  components: { PixelButton, ButtonBack },

  data(){

    return{

      socketConnect: 'waiting',
      socket: io( 'http://localhost:3000' ),
      loginStatus: false,


    }

  },

  methods:{

    

  },

  beforeMount(){
    

    this.socket.on( "connect", () => {
      if ( this.socket.connected ) this.socketConnect = 'success'
    });

    this.socket.on( "connect_error", (error) => {
      if ( error ) this.socketConnect = 'fail'
    });

  }
  
}


</script>

<template>
  
  <section class="h-[100vh] w-full  top-0 left-0 absolute">

    <pixel-spinner v-if="this.socketConnect !== 'success'" v-bind:connection="this.socketConnect"> Server connection... </pixel-spinner>

    <multiplayer-login 
      v-if="this.socketConnect === 'success' && this.loginStatus === false" 
      @LoginStatus="this.loginStatus = true"
    ></multiplayer-login>

    <multiplayer-menu v-if="loginStatus" ></multiplayer-menu>


  </section>


</template>