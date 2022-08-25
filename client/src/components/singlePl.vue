<script>

  export default {
    data(){

      // difficulty: 2

    },

    methods: {
      singleDifficulty( e ){

        let value = e.target.value
        if ( value.length > 1 ) e.target.value = value.substring( value.length -1, value.length )
        if ( /\D/.test( e.target.value ) ) e.target.value = 2
        value = Number( e.target.value )
        if ( Number( value ) > 7 ) e.target.value = 7
        if ( Number( value ) < 2 ) e.target.value = 2

        this.difficulty = e.target.value
        console.log( this.difficulty )

      }

    }

  }

</script>


<template>


  <section class="m-auto space-y-3">
    <h1 class="mx-auto"> single player </h1>
    <p> Настройка кол-во символов ( 2 - 7 ) </p>
    <h1> number {{ difficulty }} </h1>
    <input v-bind:value='difficulty' @input='singleDifficulty' class='bg-gray-500' type="tel" name="">
    <button> Start </button>
  </section>


</template>
