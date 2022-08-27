<script>

  export default {

    data(){
      return{

        timerAlertId: 0

      }

    },

    methods: {

      showRulesGame() {

        let rulesGame = document.querySelector( '#rulesGame' )
        rulesGame.classList.remove( 'hidden' )
        
        let rulesGameModal = document.querySelector( '#rulesGameModal' )
        let ruleHeight = rulesGameModal.clientHeight
        console.log( ruleHeight )
        rulesGameModal.style.height = '0%'
        rulesGameModal.style.overflow = 'hidden'
        rulesGameModal.style.overflowY = 'scroll'
        // rulesGameModal.style.transition = '0.2s'
        setTimeout ( () => {
          // rulesGameModal.style.height = ruleHeight + 10 + 'px'
          rulesGameModal.style.height = '100%'
        }, 0 )

      },

      showHelpDev() {

        let rulesGame = document.querySelector( '#helpDev' )
        rulesGame.classList.remove( 'hidden' )

      },

      hiddenalertFullScreen( e ){

        let alert = document.querySelector( '#alertFullScreen' )
        alert.style.top = -alert.clientHeight - 5 + 'px'

      },


    },

    mounted() {

      this.timerAlertId = setTimeout( this.hiddenalertFullScreen, 5500 )

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
            singleplayer
          </p>
        </router-link>

        <router-link to="/multiplayer" class='flex justify-center content-center text-xl text-whiteOpacity-75 py-2 px-4 border-2 border-whiteOpacity-75 rounded bg-blackOpacity-75 cursor-default pointer-events-none flex justify-center space-x-3'>
          <img src="/multiplayer.svg" alt="coin" class="w-[25px]">
          <p class="pt-1">
            multiplayer
          </p>
        </router-link>

        <button @click="showRulesGame" type="button" name="button" class='text-xl py-2 px-4 border-2 border-white rounded hover:bg-whiteOpacity-10 flex justify-center space-x-3 '>
          <img src="/rule.svg" alt="coin" class="w-[25px]">
          <p class="pt-1">
            Rules of game
          </p>
        </button>

        <button @click="showHelpDev" type="button" name="button" class='text-xl py-2 px-4 border-2 border-white rounded hover:bg-whiteOpacity-10 flex justify-center space-x-3 '>
          <img src="/coin.svg" alt="coin" class="w-[25px]">
          <p class="pt-1">
            Help the developer
          </p>
        </button>
  
      </section>
  
    </section>
  
  
    <modal-rules ></modal-rules>
    <modal-helpDev></modal-helpDev>

    <information-game></information-game>

  </section>


</template>
