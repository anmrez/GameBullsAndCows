<script>

  export default{

    name: 'crate-number-mp',
    props:{

      difficulty:{
        require: true
      }

    },
    data(){

      return{



      }

    },

    methods:{

      generateNumber(){

        let number = this.$generateNumber( this.difficulty )

        let inputCreateNumber = document.querySelector( '#inputCreateNumber' )
        inputCreateNumber.value = number

      },

      sendNumber(){

        this.checkLengthNumber()
        this.checkRepeateDigit()

      },

      checkLengthNumber(){

        let inputCreateNumber = document.querySelector( '#inputCreateNumber' )
        let value = inputCreateNumber.value

        if ( value.length > this.difficulty || value.length < this.difficulty  ) {

          let clasess = [
            'bg-redOpacity',
            'border',
            'border-red-500',
            'rounded',
          ]

          let difficultyGame = document.querySelector( '#difficultyGame' )

          clasess.forEach( item => {
            difficultyGame.classList.add( item )
          })

        }

      },

      checkRepeateDigit(){

        let inputCreateNumber = document.querySelector( '#inputCreateNumber' )
        let value = inputCreateNumber.value
        let digitRepeat = []

        for ( let i = 0; i < value.length; i++ ) digitRepeat.push( value.indexOf( value[i] ) )

        digitRepeat.forEach( ( item, i ) => {

          for ( let k = i + 1; k < digitRepeat.length; k++ ) {

            if ( item === digitRepeat[ k ] ) this.showAlertRepeat()

          }

        })
        
      },
      
      showAlertRepeat(){
        
        let alertRepeateDigitMP = document.querySelector( '#alertRepeateDigitMP' )
        alertRepeateDigitMP.classList.remove( 'hidden' )

      },

      listenerInput( e ){

        let value = e.target.value
        console.log( value )
        

      }


    },

    mounted(){

      let inputCreateNumber = document.querySelector( '#inputCreateNumber' )
      inputCreateNumber.addEventListener( 'input', this.listenerInput )

    },

    beforeUnmount(){

      inputCreateNumber.removeListener( 'input', this.listenerInput )

    }

    
  }

</script>

<template>
  
  <section>



    <h1 class="mb-5 text-center text-xl" > multiplayer game </h1>
    <p class="text-center" >Come up with a number for the opponent </p>

    <section class="space-y-3">

      <section id="difficultyGame" class="p-2 flex justify-center text-sm text-center relative ">
        <span > ( digits: </span>  
        <span class="ml-2" > {{ this.difficulty }} </span>  
        <span class="ml-2" > ) </span>  
      </section>

      <section id="alertRepeateDigitMP" class="p-2 flex justify-center text-sm text-center hidden relative bg-redOpacity border border-red-500 rounded">
        <span > numbers must not be repeated </span>  
      </section>

      
      <input @input="checkLength" id="inputCreateNumber" type="text" class="w-full h-full bg-whiteOpacity-10 text-4xl text-center rounded outline outline-2 outline-transparent outline-offset-1 focus:outline-white"> 

      <section class="flex space-x-3">
        <pixel-button @click="this.generateNumber()" class="md:w-1/2 text-base" > Generate </pixel-button>
        <pixel-button @click="this.sendNumber()" class="md:w-1/2 text-base" > Ready </pixel-button>
      </section>

    </section>



  </section>

</template>