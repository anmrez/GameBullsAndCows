<script>
import { io } from 'socket.io-client'
import PixelButton from '../components/ui/Pixel-button.vue'

export default {
  components: { PixelButton },

  data(){

    return{

      socket: io( 'http://localhost:3000' )

    }

  },

  methods:{

    checkUsername(){

      let cookie = document.cookie
      console.log( cookie )

      if( cookie ) return true
      return false

    }

  },

  beforeMount(){

    this.socket.emit( 'connectInRoom', {}, ( response ) => {

    // console.log( response )

    })

  }
  


}


</script>

<template>
  
  <section class="space-y-5 translate-y-[-50%] top-[50%] absolute ">
    <h1 class="text-2xl text-center"> Multiplayer </h1>
    <h2 class="text-lg text-center"> Your username </h2>
    <section v-if="checkUsername()"> suc </section>
    <section v-else> 
      <input type="text" class="w-full h-full bg-whiteOpacity-10 text-4xl text-center rounded outline outline-2 outline-transparent outline-offset-1 focus:outline-white"> 
    </section>

    <section class="flex space-x-3 justify-center" >
      <pixel-button class="text-base" > Main menu </pixel-button>
      <pixel-button class="text-base" > Next </pixel-button>
    </section>
    <!-- <button type="button" name="button" class='text-xl py-2 px-4 border-2 border-white rounded hover:bg-whiteOpacity-10 flex justify-center space-x-3 '> Create </button>
    <button type="button" name="button" class='text-xl py-2 px-4 border-2 border-white rounded hover:bg-whiteOpacity-10 flex justify-center space-x-3 '> Connect </button> -->
  </section>

</template>