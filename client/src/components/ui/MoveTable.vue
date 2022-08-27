<script>


export default {
  name: 'move-table',

  props:{
    arrayMove:{
      required: true
    },
    arrayBulls:{
      required: true
    },
    arrayCows:{
      required: true
    },
    hiddenNumber: {
      require: true
    },
    checkStatusNumverMoveTable: {
      require: true
    },
  },
  data(){
    
    return{
      
      columnDigit: '',
      digit: '',
      target: ''

    }

  },


  updated() {

    this.$nextTick().then( this.checkStatusNumverMoveTable( ) );

  },

  methods:{

    getDigit( number ){

      let response = []
      for (let index = 0; index < number.length; index++) {

        response[index] = number[index];
        
      }
      
      return response

    },
    hoverDigit( event ){

      let tableMove = document.querySelector( '#moveTableBody' )
      let allDigit = tableMove.querySelectorAll( '[data-moveTableDigit]' )
      let hoverDigit = event.target.outerText
      
      for (let index = 0; index < allDigit.length; index++) {

        if ( hoverDigit === allDigit[index].outerText ) {

          allDigit[index].classList.add( 'bg-whiteOpacity-25' )

        }
        
      }

    },
    unhoverDigit( event ){

      let tableMove = document.querySelector( '#moveTableBody' )
      let allDigit = tableMove.querySelectorAll( '[data-moveTableDigit]' )

      for (let index = 0; index < allDigit.length; index++) {

        allDigit[index].classList.remove( 'bg-whiteOpacity-25' )
        
      }


    },

    rbmDigit( event ){

      event.preventDefault()
      let contextMenuDigitMove = document.querySelector( '#contextMenuDigitMove' )
      contextMenuDigitMove.classList.remove( 'hidden' )
      if ( event.x + contextMenuDigitMove.clientWidth > document.body.clientWidth  ) {

        contextMenuDigitMove.style.left = event.x - contextMenuDigitMove.clientWidth + 'px'
        contextMenuDigitMove.style.top = event.y + 'px'

      } else {

        contextMenuDigitMove.style.left = event.x + 5 + 'px'
        contextMenuDigitMove.style.top = event.y + 'px'

      }

      let digit, row, target
      if ( event.target.dataset.rowsmove ) {
        
        target = event.target
        digit = target.outerText
        row = target.dataset.rowsmove

      } else {
        
        target = event.target.children[0]
        digit = target.outerText
        row = target.dataset.rowsmove

      }

      this.columnDigit = row
      this.digit = digit
      this.target = target


    },

  }


}

</script>

<template>

  

  <section class="flex justify-between bg-whiteOpacity-25 rounded-t-lg" >
    <h1 class="p-2"> Game table </h1> 
  </section>

  <table class="table w-full">
    <thead >

      <tr class="border-b border-whiteOpacity-10 hover:bg-whiteOpacity-10 ">

        <th class="px-2">  
          <span class="hidden md:block" > Move </span>
          <span class="block md:hidden" > M </span>
        </th>

        <th> Number </th>
        <th class="px-2">  
          <span class="hidden md:block" > Bulls </span>
          <span class="block md:hidden" > B </span>
        </th>

        <th class="px-2">  
          <span class="hidden md:block" > Cows </span>
          <span class="block md:hidden" > C </span>
        </th>

      </tr>

    </thead>

    <tbody id="moveTableBody" class="" >
      
      <tr v-for="(number, index) in arrayMove" class="table-row h-[60px] border-b border-whiteOpacity-10 hover:bg-whiteOpacity-10">
        <td class="text-center"> {{ index + 1 }} </td>

        <td class="flex justify-center" data-moveTableNumber >
          <div 
          @contextmenu="this.rbmDigit( $event )"
          @mouseover="this.hoverDigit( $event )" 
          @mouseleave="this.unhoverDigit( $event )"
          v-for="(digit, digitIn) in getDigit( number )" 
          data-moveTableDigit
          class="p-4 rounded"
          >
            <span class="border-b-2 border-white p-2 select-none cursor-default" :data-rowsMove = digitIn> {{ digit }}  </span>
          </div>
        </td>

        <td class="text-center" > {{ arrayBulls[index] }} </td>
        <td class="text-center" > {{ arrayCows[index] }} </td>

      </tr>

    </tbody>
  </table>
  
  <context-menu v-bind:columnDigit="this.columnDigit" v-bind:digit="this.digit" v-bind:target="this.target" ></context-menu>
 

</template>