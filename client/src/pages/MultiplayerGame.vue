<script>

  export default{

    data(){

      return{

        difficulty: this.$route.params.difficulty,
        codeRoom: this.$route.params.codeRoom,
        player1: this.$route.params.player1,
        player2: this.$route.params.player2,
        game: false
        
      }

    },

    methods:{

      startGame(){

        this.game = true

      }

    },

    mounted(){

      if ( this.$route.params.difficulty === undefined ) this.$router.push({ name: 'multiPlayer' })

    }

  }

</script>

<template>
  <section class="w-full">


    <crate-number-mp 
      v-if=" !game "
      v-bind:difficulty="this.difficulty" 
      v-bind:codeRoom="this.codeRoom" 
      v-bind:player1="this.player1" 
      v-bind:player2="this.player2" 
      @start="this.startGame()"
    ></crate-number-mp>

    <section v-if="game">
      <MultiPlayerGame 
        v-bind:codeRoom="this.codeRoom" 
        v-bind:difficulty="this.difficulty" 
      ></MultiPlayerGame>
    </section>


  </section>
</template>