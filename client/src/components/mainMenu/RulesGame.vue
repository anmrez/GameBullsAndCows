<script>

export default {

  name: 'modal-rules',
  methods: {

    hiddenRulesGame( e ) {

      
      let rulesGame = document.querySelector( '#rulesGame' )
      if ( e.target.id === 'rulesGame' || e.target.id === 'closeRulesGame' ) {
        
        let rulesGameModal = document.querySelector( '#rulesGameModal' )
        // rulesGameModal.style.transition = '0.2s'
        rulesGameModal.style.height = '0px'


        setTimeout ( () => {
          rulesGame.classList.add( 'hidden' )
          rulesGameModal.style.height = 'auto'
        }, 150 )

      }

    },

  },

  mounted(){

    this.$emit( 'showRulesGame', this.showRulesGame )

  }

}

</script>

<template>
  
  <section id="rulesGame" class="w-full h-[100vh] top-0 left-0 absolute hidden" @click="hiddenRulesGame ( $event )" >
  
      <section id="rulesGameModal" class="w-[90%] md:w-[60%] h-[0%] md:h-auto max-h-[90%] md:max-h-[60%] p-4 bg-blackOpacity-75 translate-x-[-50%] translate-y-[-50%]  top-[50%] left-[50%] relative duration-200 border-2 border-white z-50 space-y-3 indent-4 rounded"  > 
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
  
      </section>
  
    </section>

</template>