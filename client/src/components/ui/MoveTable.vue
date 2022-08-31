<script>
import { isProxy, toRaw } from 'vue'; 

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
    this.checkLastBullsAndCows()

  },

  methods:{

    checkLastBullsAndCows(){
      // if last turn bulls = 0 and cows = 0 color all digits red 

      let lastCows = this.arrayCows; 
      if ( isProxy( this.arrayCows ) ){ lastCows = toRaw( this.arrayCows )} 
      lastCows = lastCows[ lastCows.length - 1 ]

      let lastBulls = this.arrayBulls; 
      if ( isProxy( this.arrayBulls ) ){ lastBulls = toRaw( this.arrayBulls )} 
      lastBulls = lastBulls[ lastBulls.length - 1 ]

      if ( lastBulls === 0 && lastCows === 0 ) {

        let lastRowInMovetable = document.querySelector( `[data-moveTableNumber="${ this.arrayMove.length - 1 }"]` )

        let digits = []
        for (let index = 0; index < lastRowInMovetable.children.length; index++) {
          digits.push( lastRowInMovetable.children[index].outerText ) 
        }

        this.ColorAllDigitsRedInSupportTable( digits )

      }

    },

    ColorAllDigitsRedInSupportTable( digits ){

      for (let i = 0; i < digits.length; i++) {

        let rowInSuportTableBtns = document.querySelectorAll( `[data-supportrow="${ digits[i] }"]` ) 

        for (let k = 0; k < rowInSuportTableBtns.length; k++) {

          let btn = rowInSuportTableBtns[k];
          btn.dataset.count = 0
          btn.click()
          
        }

      }

    },

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

  

  <section class="w-full flex justify-between bg-whiteOpacity-25 rounded-t-lg" >
    <h1 class="p-2"> Turn table </h1> 
  </section>

  <table class="table w-full select-none">
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

        <td class="flex justify-center" :data-moveTableNumber="index"  >
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