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

      // difficultyGame( e ){

      //   let value = e.target.value
      //   if ( value.length > 1 ) e.target.value = value.substring( value.length -1, value.length )
      //   if ( /\D/.test( e.target.value ) ) e.target.value = 2
      //   value = Number( e.target.value )
      //   if ( Number( value ) > 7 ) e.target.value = 7
      //   if ( Number( value ) < 2 ) e.target.value = 2

      //   this.difficulty = e.target.value

      // },

      // startGame( ){
      
      //   this.hiddenNumber = this.generateNumber()
      //   this.game = true
      //   let response = {
      //     game: this.game,
      //     difficulty: this.difficulty,
      //     hiddenNumber: this.hiddenNumber
      //   }
      //   this.$emit( 'startGameParam', response )
      
      
      // },

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

        console.log( `hidden number: `, number )
        return number

      },

      generateDigit(){

        let digit = Math.random() * 10
        digit = Math.round( digit )
        
        if ( digit > 9 ) return this.generateDigit()
        return digit

      },

      NewstartGame( difficulty ){

        this.difficulty = difficulty
        this.hiddenNumber = this.generateNumber()
        this.game = true
        let response = {
          game: this.game,
          difficulty: this.difficulty,
          hiddenNumber: this.hiddenNumber
        }
        this.$emit( 'startGameParam', response )

      }

    }

  }

</script>

<template>

  <section>

    <h1 class="mx-auto text-3xl mb-20"> Singleplayer </h1>
    <section class="space-y-8">
  
      <p> The number of digits in a number </p>
      <ul class="flex place-content-center space-x-3 select-none">
        <li @click="NewstartGame( 3 )" class="px-4 py-2 border-2 border-white rounded hover:bg-whiteOpacity-10 active:bg-blackOpacity-50 active:text-whiteOpacity-75 active:border-whiteOpacity-75 cursor-pointer" > 3 </li>
        <li @click="NewstartGame( 4 )" class="px-4 py-2 border-2 border-white rounded hover:bg-whiteOpacity-10 active:bg-blackOpacity-50 active:text-whiteOpacity-75 active:border-whiteOpacity-75 cursor-pointer" > 4 </li>
        <li @click="NewstartGame( 5 )" class="px-4 py-2 border-2 border-white rounded hover:bg-whiteOpacity-10 active:bg-blackOpacity-50 active:text-whiteOpacity-75 active:border-whiteOpacity-75 cursor-pointer" > 5 </li>
        <li @click="NewstartGame( 6 )" class="px-4 py-2 border-2 border-white rounded hover:bg-whiteOpacity-10 active:bg-blackOpacity-50 active:text-whiteOpacity-75 active:border-whiteOpacity-75 cursor-pointer" > 6 </li>
      </ul>

      <back-to-menu class="w-full md:w-auto"></back-to-menu>
  
    </section>

  </section>

</template>