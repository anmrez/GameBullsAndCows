<script>

  export default{

    name: 'crate-number-mp',
    props:{

      difficulty:{
        require: true
      },
      codeRoom:{
        require: true
      },
      player1:{
        require: true
      },
      player2:{
        require: true
      },

    },
    data(){

      return{

        checkRepeateDigitResult: true

      }

    },

    methods:{
      
      listenerRoom(){

        this.$socket.on( 'room', ( response ) => {

          // console.log( response )
          let param = response.param

          if ( response.event === 'ready' ) {
            if ( param === 'player1 ready' ) this.editPlayerStatus( 1 )
            if ( param === 'player2 ready' ) this.editPlayerStatus( 2 )
            if ( param === 'all ready' ) this.start()
          }


        })

      },

      start(){

        this.$emit( 'start' )

      },

      generateNumber(){

        let number = this.$generateNumber( this.difficulty )

        let inputCreateNumber = document.querySelector( '#inputCreateNumber' )
        inputCreateNumber.value = number

      },

      sendNumber(){

        let validNumber = this.checkNumber()
        if ( validNumber === false ) return


        let inputCreateNumber = document.querySelector( '#inputCreateNumber' )
        let value = inputCreateNumber.value

        let data = {
          codeRoom: this.codeRoom,
          number: value
        }
        // console.log( data )
        this.$socket.emit( 'setNumber', data )

      },

      editPlayerStatus( numberPlayer ){

        let player = document.querySelector( `#statusPL${ numberPlayer }` )
        
        player.classList.add( 'bg-greenOpacity' )

      },

      checkNumber(){

        let checkLengthNumberResult = this.checkLengthNumber()
        this.checkRepeateDigit()

        if ( checkLengthNumberResult === this.checkRepeateDigitResult ) return true
        return false

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

          return false

        }

        return true

      },

      checkRepeateDigit(){

        let inputCreateNumber = document.querySelector( '#inputCreateNumber' )
        let value = inputCreateNumber.value
        let digitRepeat = []
        this.checkRepeateDigitResult = true

        for ( let i = 0; i < value.length; i++ ) digitRepeat.push( value.indexOf( value[i] ) )

        digitRepeat.forEach( ( item, i ) => {

          for ( let k = i + 1; k < digitRepeat.length; k++ ) {

            if ( item === digitRepeat[ k ] ) {
              this.showAlertRepeat()
              this.checkRepeateDigitResult = false
              return
            } 

          }

        })
        
      },
      
      showAlertRepeat(){
        
        let alertRepeateDigitMP = document.querySelector( '#alertRepeateDigitMP' )
        alertRepeateDigitMP.classList.remove( 'hidden' )

      },

      // listenerInput( e ){

      //   let value = e.target.value
      //   // console.log( value )

      // }


    },

    mounted(){

      let inputCreateNumber = document.querySelector( '#inputCreateNumber' )
      // inputCreateNumber.addEventListener( 'input', this.listenerInput )

      this.listenerRoom()

    },

    beforeUnmount(){

      // inputCreateNumber.removeEventListener( 'input', this.listenerInput )
      
      this.$socket.off( 'room' );

    }

    
  }

</script>

<template>
  
  <section class="w-[90%] md:w-auto space-y-5 translate-y-[-50%] top-[50%] translate-x-[-50%] left-[50%] absolute ">



    <h1 class="mb-5 text-center text-xl" > multiplayer game </h1>

    <section class="mb-3 text-sm md:text-base">
      <section class="flex justify-center space-x-3 ">
        <span> players: </span>
        <ul class="space-y-3">
          <li id="statusPL1" class="p-1 rounded " > • {{ this.player1 }} </li>
          <li id="statusPL2" class="p-1 rounded " > • {{ this.player2 }} </li>
        </ul>
      </section>
    </section>

    <p class="text-center text-sm md:text-base" >Come up with a number for the opponent </p>

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

      <section class="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
        <pixel-button @click="this.generateNumber()" class="md:w-1/2 text-base" > Generate </pixel-button>
        <pixel-button @click="this.sendNumber()" class="md:w-1/2 text-base" > Ready </pixel-button>
      </section>

    </section>



  </section>

</template>