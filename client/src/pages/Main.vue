<script>

  export default {

    data(){
      return{

        timerAlertId: 0,
        typeModalWindow: '',
        screen: {}

      }

    },

    methods: {

      showModelWindow( typeModal ){

        this.typeModalWindow = typeModal
        this.showModalWindow()

      },


      hiddenalertFullScreen( e ){

        let alert = document.querySelector( '#alertFullScreen' )
        alert.style.top = -alert.clientHeight - 5 + 'px'

      },


      showModalWindow(){

        let modalWindowMain = document.querySelector( '#modalWindowMain' )
        modalWindowMain.classList.remove( 'hidden' )
        
        let modalWindow = document.querySelector( '#modalWindow' )
        modalWindow.style.height = '0%'
        modalWindow.style.overflow = 'hidden'
        modalWindow.style.overflowY = 'scroll'
        setTimeout ( () => {
          modalWindow.style.height = '100%'
        }, 0 )

      },

      socketDisconnect(){

        this.$socket.off( "disconnect" );
        this.$socket.disconnect()

      },

      scrollPageDown(){

        setTimeout( function() { 
          window.scrollTo( 0, document.body.clientHeight )
        }, 10 );

      },

    },

    mounted() {
 
      this.socketDisconnect()
      this.timerAlertId = setTimeout( this.hiddenalertFullScreen, 5500 )
      this.scrollPageDown()

    },

    beforeUnmount(){

      clearInterval( this.timerAlertId )

    }

  }


</script>



<template class="">

  <section class="w-[90%] md:w-auto">

    <alert-screen></alert-screen>

    <section class='flex flex-col justify-center content-center pb-20 h-[100vh] w-full md:w-[400px] mx-auto z-20 relative'>
  
      <h3 class="mx-auto text-3xl mb-20">
        Bulls and cows
      </h3>
  
      <section class="flex flex-col space-y-3">
        <router-link to="/singleplayer" class='flex justify-center content-center text-xl py-2 px-4 border-2 border-white rounded hover:bg-whiteOpacity-10 flex justify-center space-x-3'>
          <img src="/singleplayer.svg" alt="coin" class="w-[25px]">
          <p class="pt-1">
            Game
          </p>
        </router-link>


        <router-link to="/multiplayer" class='flex justify-center content-center text-xl py-2 px-4 border-2 border-white rounded hover:bg-whiteOpacity-10 flex justify-center space-x-3'>
          <img src="/multiplayer.svg" alt="coin" class="w-[25px]">
          <p class="pt-1">
            Multiplayer
          </p>
        </router-link>

        <!-- <router-link to="/multiplayer" class='flex justify-center content-center text-xl text-whiteOpacity-75 py-2 px-4 border-2 border-whiteOpacity-75 rounded bg-blackOpacity-75 cursor-default pointer-events-none flex justify-center space-x-3'>
          <img src="/multiplayer.svg" alt="coin" class="w-[25px]">
          <p class="pt-1">
            multiplayer
          </p>
        </router-link> -->

        <button @click="this.showModelWindow( 'Rules' )" type="button" name="button" class='text-xl py-2 px-4 border-2 border-white rounded hover:bg-whiteOpacity-10 flex justify-center space-x-3 '>
          <img src="/rule.svg" alt="coin" class="w-[25px]">
          <p class="pt-1">
            Rules of the game
          </p>
        </button>

        <button @click="this.showModelWindow( 'Training' )" type="button" name="button" class='text-xl py-2 px-4 border-2 border-white rounded hover:bg-whiteOpacity-10 flex justify-center space-x-3 '>
          <img src="/training.svg" alt="coin" class="w-[25px]">
          <p class="pt-1">
            interface guide
          </p>
        </button>

        <!-- <button @click="showAppMobile" type="button" name="button" class='text-xl py-2 px-4 border-2 border-white rounded hover:bg-whiteOpacity-10 flex justify-center space-x-3 '>
          <img src="/rule.svg" alt="coin" class="w-[25px]">
          <p class="pt-1">
            download app on android
          </p>
        </button> -->

        <button @click="this.showModelWindow( 'Support' )"  type="button" name="button" class='text-xl py-2 px-4 border-2 border-white rounded hover:bg-whiteOpacity-10 flex justify-center space-x-3 '>
          <img src="/coin.svg" alt="coin" class="w-[25px]">
          <p class="pt-1">
            Support the developer
          </p>
        </button>
  
      </section>
  
    </section>
  
    <modal-window v-bind:modalType="this.typeModalWindow" ></modal-window>
    <!-- <modal-rules ></modal-rules> -->
    <!-- <modal-helpDev></modal-helpDev> -->

    <information-game></information-game>

  </section>


</template>
