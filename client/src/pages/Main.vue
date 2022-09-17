<script>

  export default {

    data(){
      return{

        timerAlertId: 0,
        typeModalWindow: '',
        screen: {},
        appsMobile: []

      }

    },

    methods: {

      showModelWindow( typeModal ){

        this.typeModalWindow = typeModal
        if ( typeModal === 'Rules' ) window.location.hash = 'Rules'
        if ( typeModal === 'Support' ) window.location.hash = 'Support'
        if ( typeModal === 'Training' ) window.location.hash = 'Training'
        if ( typeModal === 'AppMobile' ) {
          window.location.hash = 'AppMobile'
          this.getAppFromServer()
        } 
        this.showModalWindow()

      },

      getAppFromServer(){

        this.$socket.connect()
        this.$socket.emit( 'getAppMobileList', ( response ) =>{

          console.log( response )
          console.log( typeof response )
          if ( typeof response === 'object' ) this.appsMobile = response
          this.socketDisconnect()

        })


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
        console.log( `disconnect` )

      },

      scrollPageDown(){

        setTimeout( function() { 
          window.scrollTo( 0, document.body.clientHeight )
        }, 10 );

      },

      hashchangeHiddenModal( e ){

        if ( window.location.hash === '' ) this.hiddenModalWindow()

      },

      hiddenModalWindow( ){

        let modalWindow = document.querySelector( '#modalWindow' )
        modalWindow.style.height = '0px'
          
        let modalWindowMain = document.querySelector( '#modalWindowMain' )
        setTimeout ( () => {
          modalWindowMain.classList.add( 'hidden' )
          modalWindow.style.height = 'auto'
        }, 150 )

      },

      addListenerMuted(){

        let audioMuted = document.querySelector( '#audioMuted' )
        if ( !audioMuted.classList.contains( 'render' ) )
          audioMuted.addEventListener( 'click', this.listenerMuted, audioMuted )
        audioMuted.classList.add( 'render' )

      },

      listenerMuted(  ){

        let audio = document.querySelector( '#audio' )
        if ( audio.muted ) {
          audio.muted = false
          this.mutedOn()
        } else {
          audio.muted = true
          this.mutedOff()
        }

      },

      mutedOn(){

        audioMuted.classList.remove( 'border-whiteOpacity-50' )
        audioMuted.classList.remove( 'fill-whiteOpacity-50' )
        audioMuted.classList.add( 'fill-white' )
        audioMuted.classList.add( 'border-white' )

      },

      mutedOff(){

        audioMuted.classList.add( 'border-whiteOpacity-50' )
        audioMuted.classList.add( 'fill-whiteOpacity-50' )
        audioMuted.classList.remove( 'fill-white' )
        audioMuted.classList.remove( 'border-white' )

      }

    },

    mounted() {
 
      this.socketDisconnect()
      this.timerAlertId = setTimeout( this.hiddenalertFullScreen, 5500 )
      this.scrollPageDown()
      this.addListenerMuted()

      window.location.hash = ''
      window.addEventListener( 'hashchange', this.hashchangeHiddenModal );
      
    },
    
    beforeUnmount(){
      
      clearInterval( this.timerAlertId )
      window.removeEventListener('hashchange', this.hashchangeHiddenModal );

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
            Interface guide
          </p>
        </button>

        <button @click="this.showModelWindow( 'AppMobile' )" type="button" name="button" class='text-xl py-2 px-4 border-2 border-white rounded hover:bg-whiteOpacity-10 flex justify-center space-x-3 '>
          <img src="/rule.svg" alt="coin" class="w-[25px]">
          <p class="pt-1">
            Download app on android
          </p>
        </button>

        <button @click="this.showModelWindow( 'Support' )"  type="button" name="button" class='text-xl py-2 px-4 border-2 border-white rounded hover:bg-whiteOpacity-10 flex justify-center space-x-3 '>
          <img src="/coin.svg" alt="coin" class="w-[25px]">
          <p class="pt-1">
            Support the developer
          </p>
        </button>


  
      </section>
  
    </section>
  
    <modal-window 
      ref="modalWindow" 
      v-bind:modalType="this.typeModalWindow" 
      v-bind:appsMobile="this.appsMobile" 
    ></modal-window>
    <!-- <modal-rules ></modal-rules> -->
    <!-- <modal-helpDev></modal-helpDev> -->

    <information-game></information-game>

  </section>


</template>
