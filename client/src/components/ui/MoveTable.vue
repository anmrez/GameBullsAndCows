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

      // console.log( number )
      let response = []
      for (let index = 0; index < number.length; index++) {

        response[index] = number[index];
        
      }

      
      return response

    },
    hoverDigit( event ){

      // console.log( `hover` )
      let tableMove = document.querySelector( '#moveTableBody' )
      let allDigit = tableMove.querySelectorAll( '[data-moveTableDigit]' )
      let hoverDigit = event.target.outerText
      // console.log( event.target.outerText )
      
      for (let index = 0; index < allDigit.length; index++) {

        if ( hoverDigit === allDigit[index].outerText ) {

          // console.log ( allDigit[index] )
          allDigit[index].classList.add( 'bg-whiteOpacity-25' )

        }
        
      }

    },
    unhoverDigit( event ){

      // console.log( `leave` )
      let tableMove = document.querySelector( '#moveTableBody' )
      let allDigit = tableMove.querySelectorAll( '[data-moveTableDigit]' )

      for (let index = 0; index < allDigit.length; index++) {

        allDigit[index].classList.remove( 'bg-whiteOpacity-25' )
        
      }


    },

    rbmDigit( event ){

      event.preventDefault()
      let contextMenuDigitMove = document.querySelector( '#contextMenuDigitMove' )
      // console.log( contextMenuDigitMove )
      contextMenuDigitMove.classList.remove( 'hidden' )
      if ( event.x + contextMenuDigitMove.clientWidth > document.body.clientWidth  ) {

        contextMenuDigitMove.style.left = event.x - contextMenuDigitMove.clientWidth + 'px'
      contextMenuDigitMove.style.top = event.y + 'px'

      } else {

        contextMenuDigitMove.style.left = event.x + 'px'
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
      // console.log( `row: ${ row }; digit: ${ digit }` )


    },

    setStatus( param ){

      let column = document.querySelectorAll( `[data-rowsMove="${ this.columnDigit }"]` )
      console.log( column )
      for (let index = 0; index < column.length; index++) {

        let item = column[index];
        if ( item.outerText === this.digit ) {

          item.classList.remove( `border-white` )
          item.classList.remove( `border-red-500` )
          item.classList.remove( `border-yellow-500` )
          item.classList.remove( `border-green-500` )
          if ( param === 'white' ) {

            item.classList.add( `border-${ param }` )

          } else {

            item.classList.add( `border-${ param }-500` )

          }


        } 
      
      }

      let contextMenuDigitMove = document.querySelector( '#contextMenuDigitMove' )
      contextMenuDigitMove.classList.add( 'hidden' )



      let supportTableRows = document.querySelectorAll( `[data-supportcolumn="${ this.columnDigit }"]` )
      for (let index = 0; index < supportTableRows.length; index++) {
        
        let btn = supportTableRows[index]
        let digit = supportTableRows[index].outerText
        if ( digit === this.digit ) {
        
          console.log( supportTableRows[index] )
          
          // if ( btnCount !== '3' ) {
            if ( param === 'red' ) {

              btn.dataset.count = '0'
              btn.click()

            }

            if ( param === 'yellow' ) {

              btn.dataset.count = '1'
              btn.click()

            }

            if ( param === 'green' ) {

              btn.dataset.count = '2'
              btn.click()

            }
            
            if ( param === 'white' ) {

              btn.dataset.count = '3'
              btn.click()

            }
          // }
          
        } 


      }

    }

  }


}

</script>

<template>

  <section class="flex justify-between bg-whiteOpacity-25 rounded-t-lg" >
    <h1 class="p-2"> Game table </h1> 
    <!-- <button class="p-2 hover:text-redOpacity"> X </button> -->
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
        <!-- <th> Bulls </th> -->
        <!-- <th> Cows </th> -->
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
  
  <section id="contextMenuDigitMove" class="hidden absolute bg-blackOpacity-25 z-30" data-contextMenuDigitMove> 
    <ul class="w-[200px] border-2 border-gray-500 rounded font-bold" data-contextMenuDigitMove>
      <li data-contextMenuDigitMove class="flex border-b-2 border-gray-500"> 
        <button @click="setStatus( 'red' )" class="w-full py-2 px-4 border-r border-gray-500 hover:bg-whiteOpacity-25" data-contextMenuDigitMove>
          red 
        </button>
        <button class="w-full py-2 px-4 border-l border-gray-500 hover:bg-whiteOpacity-25">
          <span>
            all
          </span>
          <span class="font-bold">
            N
          </span>
        </button>
      </li>
      <li data-contextMenuDigitMove> 
        <button @click="setStatus( 'yellow' )" class="w-full py-2 px-6 border-b-2 border-gray-500 hover:bg-whiteOpacity-25" data-contextMenuDigitMove>
          yellow 
        </button>
      </li>
      <li data-contextMenuDigitMove> 
        <button @click="setStatus( 'green' )" class="w-full py-2 px-6 border-b-2 border-gray-500 hover:bg-whiteOpacity-25" data-contextMenuDigitMove>
          green 
        </button>
      </li>
      <li data-contextMenuDigitMove> 
        <button @click="setStatus( 'white' )" class="w-full py-2 px-6 hover:bg-whiteOpacity-25" data-contextMenuDigitMove>
          null 
        </button>
      </li>
    </ul>
  </section>

</template>