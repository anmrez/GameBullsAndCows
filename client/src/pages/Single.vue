<script>
import SinglePlayerMenu from '@/components/singlePlayer/Menu.vue'
import SinglePlayerGame from '@/components/singlePlayer/Game.vue'

  export default {
    components: {

      SinglePlayerMenu,
      SinglePlayerGame,

    },
    data(){

      return {

        hiddenNumber: '',
        difficulty: 2,
        game: false,

      }

    },

    methods: {

      startGame( e ){

        this.game = e.game
        this.difficulty = e.difficulty
        this.hiddenNumber = e.hiddenNumber

      },


    }

  }

</script>


<template>

  <section class="m-auto space-y-3 text-center" v-if="!game">
    <SinglePlayerMenu @startGameParam="startGame" ></SinglePlayerMenu>
  </section>

  <section class="flex w-full" v-else> 
    <SinglePlayerGame v-bind:difficulty="difficulty" v-bind:hiddenNumber="hiddenNumber"> </SinglePlayerGame>
  </section>

</template>
