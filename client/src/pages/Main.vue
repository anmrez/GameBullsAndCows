<script>

  export default {

    data(){
      return{

        timerAlertId: 0

      }

    },

    methods: {

      // showRulesGame() {

      //   let rulesGame = document.querySelector( '#rulesGame' )
      //   rulesGame.classList.remove( 'hidden' )
        
      //   let rulesGameModal = document.querySelector( '#rulesGameModal' )
      //   let ruleHeight = rulesGameModal.clientHeight
      //   console.log( ruleHeight )
      //   rulesGameModal.style.height = '0%'
      //   rulesGameModal.style.overflow = 'hidden'
      //   rulesGameModal.style.transition = '0.2s'
      //   setTimeout ( () => {
      //     rulesGameModal.style.height = ruleHeight + 10 + 'px'
      //   }, 0 )


      // },

      // hiddenRulesGame( e ) {

        
      //   let rulesGame = document.querySelector( '#rulesGame' )
      //   if ( e.target.id === 'rulesGame' || e.target.id === 'closeRulesGame' ) {
          
      //     let rulesGameModal = document.querySelector( '#rulesGameModal' )
      //     rulesGameModal.style.transition = '0.2s'
      //     rulesGameModal.style.height = '0'


      //     setTimeout ( () => {
      //       rulesGame.classList.add( 'hidden' )
      //       rulesGameModal.style.height = 'auto'
      //     }, 150 )

      //   }

      // },

      showHelpDev() {

        let rulesGame = document.querySelector( '#helpDev' )
        rulesGame.classList.remove( 'hidden' )

      },

      hiddenHelpDev( e ) {

        let rulesGame = document.querySelector( '#helpDev' )
        if ( e.target.id === 'helpDev' || e.target.id === 'closeHelpDev' )
          rulesGame.classList.add( 'hidden' )

      },

      hiddenalertFullScreen( e ){

        let alert = document.querySelector( '#alertFullScreen' )
        alert.style.top = -alert.clientHeight - 5 + 'px'

      },

      stopTimer ( timerId ){

        clearInterval( timerId )

      }

    },

    mounted() {

      this.timerAlertId = setTimeout( this.hiddenalertFullScreen, 2000 )

    }

  }


</script>



<template class="">

  <section>

    <section id="alertFullScreen22" class="w-full h-[100vh] hidden md:block top-0 left-0 absolute pointer-events-none z-0" >

      <section id="alertFullScreen" class="h-[60px] p-3 bg-blackOpacity-75 border-x-2 border-b-2 border-white rounded-b translate-x-[-50%] left-[50%] top-0 absolute flex place-content-center ease-in duration-150 pointer-events-none">
        <div class="my-auto pointer-events-auto">
          press <span class="border vorder-white rounded p-2 mr-2"> F11 </span> to enter full screen mode
        </div>
      </section>

    </section>

    <section class='flex flex-col justify-center content-center pb-20 h-[100vh] w-[400px] mx-auto z-20 relative'>
  
      <h3 class="mx-auto text-3xl mb-20">
        Bulls and cows
      </h3>
  
      <section class="flex flex-col space-y-3">
        <router-link to="/singleplayer" @click="stopTimer( this.timerAlertId )" class='flex justify-center content-center text-xl py-2 px-4 border-2 border-white rounded hover:bg-whiteOpacity-10 flex justify-center space-x-3'>
          <img src="/singleplayer.svg" alt="coin" class="w-[25px]">
          <p class="pt-1">
            singleplayer
          </p>
        </router-link>

        <router-link to="/multiplayer" @click="stopTimer( this.timerAlertId )" class='flex justify-center content-center text-xl text-whiteOpacity-75 py-2 px-4 border-2 border-whiteOpacity-75 rounded bg-blackOpacity-75 cursor-default pointer-events-none flex justify-center space-x-3'>
          <img src="/multiplayer.svg" alt="coin" class="w-[25px]">
          <p class="pt-1">
            multiplayer
          </p>
        </router-link>

        <button @click="showRulesGame" @showRulesGame="showRulesGame" type="button" name="button" class='text-xl py-2 px-4 border-2 border-white rounded hover:bg-whiteOpacity-10 flex justify-center space-x-3 '>
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
  
  
    <rules-game ></rules-game>
    <!-- <section id="rulesGame" class="w-full h-[100vh] top-0 left-0 absolute hidden" @click="hiddenRulesGame ( $event )" >
  
      <section id="rulesGameModal" class="w-[800px] p-4 bg-blackOpacity-75 translate-x-[-50%] translate-y-[-50%]  top-[50%] left-[50%] relative border-2 border-white z-50 space-y-3 indent-4 rounded"  > 
        <section class="w-full flex flex-nowrap justify-between relative"  >
          <h1 class="" > Rules of game </h1>
          <button id="closeRulesGame" @click="hiddenRulesGame" class="p-2 text-lg hover:text-redOpacity top-[-10px] right-[-10px] relative" > X </button>
        </section>
        <p  >
          The game is played in turns by two opponents who aim to decipher the other's secret code by trial and error. 
        </p>
        <p  >
          The players each write a 4-digit secret number. The digits must be all different. Then, in turn, the players try to guess their opponent's number who gives the number of matches. The digits of the number guessed also must all be different. If the matching digits are in their right positions, they are "bulls", if in different positions, they are "cows".
        </p>
        <ul class="" >
           Example: 
           <li class="ml-3"  > Secret number: 4271 </li>
           <li class="ml-3"  > Opponent's try: 1234 </li>
           <li class="ml-3"  > Answer: 1 bull and 2 cows. (The bull is 
            <span class="text-greenOpacity"  >
              "2"
            </span>
            , the cows are 
            <span class="text-yellowOpacity"  >
              "4"
            </span>
            and 
            <span class="text-yellowOpacity"  >
              "1"
            </span>
             .) </li>
        </ul>
        <p  >
          The first player to reveal the other's secret number wins the game.
        </p>
         <p>
          The game may also be played by two teams of players, with the team members discussing their strategy before selecting a move. 
        </p>
  
  
      </section>
  
    </section> -->

    <section id="helpDev" class="w-full h-[100vh] top-0 left-0 absolute hidden" @click="hiddenHelpDev( $event )" >
      <section class="w-[800px] p-4 pb-8 bg-blackOpacity-75 translate-x-[-50%] translate-y-[-50%]  top-[50%] left-[50%] relative border-2 border-white z-50 space-y-3 indent-4 rounded"  > 
        <section class="w-full flex flex-nowrap justify-between relative"  >
          <h1 class="" > Help developer </h1>
          <button id="closeHelpDev" @click="hiddenHelpDev( $event )" class="p-2 text-lg hover:text-redOpacity top-[-10px] right-[-10px] relative" > X </button>
        </section>
        <ul class="w-full flex flex-col space-y-6">
          <li class="flex justify-center"> 
            <a href="https://boosty.to/" target="_blank" class="max-w-[30%] w-full text-center py-2 px-4 border-2 border-white rounded hover:bg-whiteOpacity-10">
              Boosty.io 
            </a>
          </li>
          <li class="flex justify-center"> 
            <a href="https://boosty.to/" target="_blank" class="max-w-[30%] w-full text-center py-2 px-4 border-2 border-white rounded hover:bg-whiteOpacity-10">
              Patreon
            </a>
          </li>
        </ul>
      </section>
    </section>

  </section>


</template>
