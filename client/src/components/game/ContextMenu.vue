<script>

export default {

  name: 'context-menu',

  props:{

    columnDigit: {
      require: true
    },
    digit:{
      require: true
    },
    target:{
      requare: true
    }

  },

  methods:{

    setStatus( param ){

      let column = document.querySelectorAll( `[data-rowsMove="${ this.columnDigit }"]` )
      // console.log( column )
      for ( let index = 0; index < column.length; index++ ) {

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

      this.setParamInSupportTable( param )
      

    },

    setParamInSupportTable( param ){

      let supportTableColumn = document.querySelectorAll( `[data-supportcolumn="${ this.columnDigit }"]` )

      if ( param === 'red' || param === 'yellow' || param === 'green' || param === 'white' )
      for ( let index = 0; index < supportTableColumn.length; index++ ) {
        
        let btn = supportTableColumn[index]
        let digit = supportTableColumn[index].outerText
        if ( digit === this.digit ) {
          
          
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
          
        } 

      }

      if ( param === 'allRed' || param === 'allWhite' ) {

        let supportTableRows = document.querySelectorAll( `[data-supportrow]` )
        for ( let index = 0; index < supportTableRows.length; index++ ) {

          let item = supportTableRows[index]
          if ( item.outerText === this.digit ) {

            let btn = supportTableRows[index]

            if ( param === 'allWhite' ) btn.dataset.count = '3'
            if ( param === 'allRed' ) btn.dataset.count = '0'
            btn.click()

          }
          
        }

      }

    }



  }

}

</script>

<template>
  

  <section id="contextMenuDigitMove" class="hidden absolute bg-blackOpacity-25 z-30" data-contextMenuDigitMove> 
    <ul class="w-[200px] border-2 border-gray-500 rounded font-bold" data-contextMenuDigitMove>
      <li data-contextMenuDigitMove class="flex border-b-2 border-gray-500"> 
        <button @click="setStatus( 'red' )" class="w-full py-2 px-4 border-r border-gray-500 hover:bg-whiteOpacity-25" data-contextMenuDigitMove>
          red 
        </button>
        <button @click="setStatus( 'allRed' )" class="w-full py-2 px-4 border-l border-gray-500 hover:bg-whiteOpacity-25">
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
      <li data-contextMenuDigitMove class="flex border-b-2 border-gray-500"> 
        <button @click="setStatus( 'white' )" class="w-full py-2 px-4 border-r border-gray-500 hover:bg-whiteOpacity-25" data-contextMenuDigitMove>
          null 
        </button>
        <button @click="setStatus( 'allWhite' )" class="w-full py-2 px-4 border-l border-gray-500 hover:bg-whiteOpacity-25">
          <span>
            all
          </span>
          <span class="font-bold">
            N
          </span>
        </button>
      </li>
    </ul>
  </section>

</template>