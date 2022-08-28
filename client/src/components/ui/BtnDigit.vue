<script>



export default {
  
  name: 'button-digit',
  props:{
    column: {
      require: true
    }
  },
  methods:{
    rbm( event ){

      event.preventDefault()

      let item = event.target
      item.dataset.count = 3
      this.statusButton( event )

    },
    statusButton( event ){

      let item = event.target
      let count = item.dataset.count
      

      if ( count === '3' ) {

        item.classList.remove( 'bg-green-600' )
        item.classList.remove( 'bg-red-500' )
        item.classList.remove( 'bg-yellowOpacity' )
        item.classList.add( 'bg-inherit-600' )

      }

      if ( count === '2' ) {

        item.classList.remove( 'bg-yellowOpacity' )
        item.classList.remove( 'bg-red-500' )
        item.classList.add( 'bg-green-600' )
        this.redAllRowAndColumnInSupportTable( item )

      }

      if ( count === '1' ) {

        item.classList.remove( 'bg-green-600' )
        item.classList.remove( 'bg-red-500' )
        item.classList.add( 'bg-yellowOpacity' )

      }

      if ( count === '0' ) {

        item.classList.remove( 'bg-green-600' )
        item.classList.remove( 'bg-yellowOpacity' )
        item.classList.remove( 'bg-inherit-600' )
        item.classList.add( 'bg-red-500' )

      }

      item.dataset.count++
      if ( item.dataset.count > '3' ) item.dataset.count = '0'
      this.$emit( 'edit', item, this.column )

    },

    redAllRowAndColumnInSupportTable( btnDigit ){

      let numberRow = btnDigit.dataset.supportrow
      let numberColumn = btnDigit.dataset.supportcolumn

      let rowBtnsInSupportTable = document.querySelectorAll( `[data-supportrow="${ numberRow }"]` )
      for (let i = 0; i < rowBtnsInSupportTable.length; i++) {

        let btn = rowBtnsInSupportTable[i];
        if ( btn.dataset.count !== '2' ) {

          btn.dataset.count = '0'
          btn.click()

        }
        
      }

      let columnBtnsInSupportTable = document.querySelectorAll( `[data-supportcolumn="${ numberColumn }"]` )
      for (let i = 0; i < columnBtnsInSupportTable.length; i++) {

        let btn = columnBtnsInSupportTable[i];
        if ( btn.dataset.count !== '2' ) {

          btn.dataset.count = '0'
          btn.click()

        }
        
      }

    }


  }



}


</script>

<template>

  <button @contextmenu="rbm( $event )" @click="statusButton( $event )" data-count="0" class="py-2 px-6 border-y-2 border-transparent rounded hover:border-white" > <slot></slot> </button>

</template>