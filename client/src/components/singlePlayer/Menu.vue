<script>

  export default {

    data(){

      return {

        // difficulty: 2,
        game: false,
        hiddenNumber: ''

      }

    },

    methods: {

      difficultyGame( e ){

        let value = e.target.value
        if ( value.length > 1 ) e.target.value = value.substring( value.length -1, value.length )
        if ( /\D/.test( e.target.value ) ) e.target.value = 2
        value = Number( e.target.value )
        if ( Number( value ) > 7 ) e.target.value = 7
        if ( Number( value ) < 2 ) e.target.value = 2

        this.difficulty = e.target.value

      },

      startGame( ){
      
        this.hiddenNumber = this.generateNumber()
        this.game = true
        let response = {
          game: this.game,
          difficulty: this.difficulty,
          hiddenNumber: this.hiddenNumber
        }
        this.$emit( 'startGameParam', response )
      
      
      },

      generateNumber(){

        let number = ''

        // let numberLength = number.toString().length

        for ( let index = 0; index < this.difficulty; index++ ) {
        
          let digit = this.generateDigit()
          let reg = new RegExp( digit )

          if ( reg.test( number ) ) {

            index--

          } else {

            number += digit.toString()

          }

            
        }

        console.log( number )
        return number

      },

      generateDigit(){

        let digit = Math.random() * 10
        digit = Math.round( digit )
        
        if ( digit > 9 ) return this.generateDigit()
        return digit

      },

    }

  }

</script>

<template>

    
    <h1 class="mx-auto text-3xl mb-20"> Singleplayer </h1>
    <p> Сколько цифр будет в загаданном числе? ( 2 - 7 ) </p>
    <h1> number {{ difficulty }} </h1>
    <input v-bind:value='this.difficulty' @input='difficultyGame' class='bg-gray-500 w-14 text-4xl text-center rounded' type="tel" name="">
    <br>
    <button @click="startGame()" class="border border-sky-500 rounded py-1 px-6 text-lg hover:bg-sky-700"> Start </button>

</template>