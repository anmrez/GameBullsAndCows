<script>

  export default {

    name: 'mobile-keyboard',
    props:{
      difficulty: {
        require: true
      },
    },

    methods: {

      checkInputGame( input ){

        this.$emit( 'checkMobileInput', input )

      },

      clickButton( key ){

        let inputMove = document.querySelector( '#inputMobileMove' )
        let difficulty = Number( this.difficulty )

        if ( key === 'Delete' ) {
        
          let value = inputMove.value
          let newValue = value.substring( 0, value.length - 1 )
          inputMove.value = newValue

        }
        if ( key === 'Move' ) {

          this.$emit( 'clickMove' )

        }
        if ( key === 'Support' ) {

          let mobileKeyboard = document.querySelector( '#mobileKeyboard' )

          mobileKeyboard.classList.add( 'hidden' )
          console.log( `show support menu` )

        }
        if ( inputMove.value.length < difficulty ) {
          
          if ( typeof key === 'number' ) inputMove.value += key
          this.checkInputGame( inputMove )

        }


        
      }



    }

  }

</script>

<template>


  <section class="w-full px-1 pb-1 bottom-0 block md:hidden fixed space-y-1">
    <section>
      <alert-red id="alertRepeat"> Digit repeats </alert-red>
      <alert-red id="alertInput"> Not enough digit </alert-red>
    </section>
    <section class="flex justify-between space-x-1 w-full">
      <input id="inputMobileMove" type="text" class="w-2/3 max-h-[42px] p-2 rounded border border-gray-800 bg-transparent text-lg text-center rounded focus:outline-none" readOnly >
      <button @click="clickButton( 'Delete' )" class="w-1/3 max-h-[42px] py-2 px-1 flex place-content-center bg-blackOpacity-25 rounded border border-gray-800 hover:bg-whiteOpacity-10">
        <svg class="fill-red-500" width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 5H7v2H5v2H3v2H1v2h2v2h2v2h2v2h16V5h-2zM7 17v-2H5v-2H3v-2h2V9h2V7h14v10H7zm8-6h-2V9h-2v2h2v2h-2v2h2v-2h2v2h2v-2h-2v-2zm0 0V9h2v2h-2z" />
        </svg>
      </button>
    </section>

    <section id="mobileKeyboard" class="grid grid-cols-3 gap-1  ">
      <button 
        @click="clickButton( 1 )" 
        class="p-2 bg-blackOpacity-25 rounded border border-gray-800 hover:bg-whiteOpacity-10" 
      > 1 
      </button>
      <button 
        @click="clickButton( 2 )" 
        class="p-2 bg-blackOpacity-25 rounded border border-gray-800 hover:bg-whiteOpacity-10" 
      > 2 
      </button>
      <button 
        @click="clickButton( 3 )" 
        class="p-2 bg-blackOpacity-25 rounded border border-gray-800 hover:bg-whiteOpacity-10" 
      > 3 
      </button>
      <button 
        @click="clickButton( 4 )" 
        class="p-2 bg-blackOpacity-25 rounded border border-gray-800 hover:bg-whiteOpacity-10" 
      > 4 
      </button>
      <button 
        @click="clickButton( 5 )" 
        class="p-2 bg-blackOpacity-25 rounded border border-gray-800 hover:bg-whiteOpacity-10" 
      > 5 
      </button>
      <button 
        @click="clickButton( 6 )" 
        class="p-2 bg-blackOpacity-25 rounded border border-gray-800 hover:bg-whiteOpacity-10" 
      > 6 
      </button>
      <button 
        @click="clickButton( 7 )" 
        class="p-2 bg-blackOpacity-25 rounded border border-gray-800 hover:bg-whiteOpacity-10" 
      > 7 
      </button>
      <button 
        @click="clickButton( 8 )" 
        class="p-2 bg-blackOpacity-25 rounded border border-gray-800 hover:bg-whiteOpacity-10" 
      > 8 
      </button>
      <button 
        @click="clickButton( 9 )" 
        class="p-2 bg-blackOpacity-25 rounded border border-gray-800 hover:bg-whiteOpacity-10" 
      > 9 
      </button>
      <button 
        @click="clickButton( 'Support' )" 
        class="font-pixel p-2 bg-blackOpacity-25 rounded border border-gray-800 hover:bg-whiteOpacity-10" 
      > Support 
      </button>
      <button 
        @click="clickButton( 0 )" 
        class="p-2 bg-blackOpacity-25 rounded border border-gray-800 hover:bg-whiteOpacity-10"
      > 0 
      </button>
      <button 
        @click="clickButton( 'Move' )" 
        class="p-2 bg-blackOpacity-25 rounded border border-gray-800 hover:bg-whiteOpacity-10" 
      > Move 
      </button>
  
    </section>

    <section id="mobileSupport" class="hidden" >
      <section> Цифры которых нет </section>
      <section> Цифры которыe возможно есть </section>
      <section> Цифры которые есть </section>
      <button 
        @click="clickButton( 'back' )" 
        class="p-2 bg-gray-400 rounded border border-gray-800 hover:bg-whiteOpacity-10" 
      > back
      </button>
    </section>

  </section>  

</template>