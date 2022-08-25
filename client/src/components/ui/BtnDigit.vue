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

          // item.classList.remove( 'hover:bg-green-600' )
          item.classList.remove( 'bg-green-600' )
          item.classList.remove( 'bg-redOpacity' )
          item.classList.remove( 'bg-yellowOpacity' )
          // item.classList.add( 'hover:bg-red-800' )
          item.classList.add( 'bg-inherit-600' )

      }

      if ( count === '2' ) {

          // item.classList.remove( 'hover:bg-green-600' )
          item.classList.remove( 'bg-yellowOpacity' )
          // item.classList.add( 'hover:bg-gray-800' )
          item.classList.add( 'bg-green-600' )

      }

      if ( count === '1' ) {

          // item.classList.remove( 'hover:bg-yellowOpacity' )
          item.classList.remove( 'bg-redOpacity' )
          // item.classList.add( 'hover:bg-green-600' )
          item.classList.add( 'bg-yellowOpacity' )

      }

      if ( count === '0' ) {

          // item.classList.remove( 'hover:bg-redOpacity' )
          item.classList.remove( 'bg-yellowOpacity' )
          item.classList.remove( 'bg-inherit-600' )
          item.classList.add( 'bg-redOpacity' )

      }

      item.dataset.count++
      if ( item.dataset.count > '3' ) item.dataset.count = '0'
      this.$emit( 'edit', item, this.column )

    }

  }



}


</script>

<template>

  <button @contextmenu="rbm( $event )" @click="statusButton( $event )" data-count="0" class="py-2 px-6 border-y-2 border-transparent rounded hover:border-white" > <slot></slot> </button>

</template>