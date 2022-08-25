
<script>
  export default{
    name: 'support-table',
        
    props:{
      difficulty: {
        require: true
      },

    },

    methods:{

      editStatusNumverMoveTable( targetButton, column ){

        let allNumbers = document.querySelectorAll( '[data-moveTableNumber]' )
        let digitButton = targetButton.outerText
        let buttonCount = targetButton.dataset.count

        for (let index = 0; index < allNumbers.length; index++) {
          
          let columnInMove = allNumbers[index].children[column]
          let columtItem = columnInMove.children[0]
          let digitItem = columtItem.outerText


          if ( digitButton === digitItem ) {

            if ( buttonCount === '0' ) removeBorder( columtItem )
            if ( buttonCount === '1' ) setBorder( columtItem, 'red' )
            if ( buttonCount === '2' ) setBorder( columtItem, 'yellow' )
            if ( buttonCount === '3' ) setBorder( columtItem, 'green' )

          }
          
        }

        function setBorder( item, status ){

          // status === red / yellow / green
          removeBorder( item )
          item.classList.add( `border-${ status }-500` )

        }

        function removeBorder( item ) {
          
          item.classList.remove( 'border-redOpacity' )
          item.classList.remove( 'border-yellow-500' )
          item.classList.remove( 'border-green-500' )

        }

      },

      nullRows( event ){

        let parent = event.target.parentElement
        let supportTableColumsHihlight = parent.parentElement
        let supportTableRow = supportTableColumsHihlight.parentElement
        let childRow = supportTableRow.children
        this.editStatRows( childRow, 'null' )

      },

      yellowRows( event ){

        let parent = event.target.parentElement
        let supportTableColumsHihlight = parent.parentElement
        let supportTableRow = supportTableColumsHihlight.parentElement
        let childRow = supportTableRow.children
        this.editStatRows( childRow, 'yellow' )

      },

      redRows( event ){

        let parent = event.target.parentElement
        let supportTableColumsHihlight = parent.parentElement
        let supportTableRow = supportTableColumsHihlight.parentElement
        let childRow = supportTableRow.children
        this.editStatRows( childRow, 'red' )

      },

      editStatRows( rowEl, param ){

        for (let index = 0; index < this.difficulty; index++) {
          
          let btn = rowEl[index].getElementsByTagName( 'button' )
          btn = btn[0]
          let btnCount = btn.dataset.count

          if ( btnCount !== '3' ) {

            if ( param === 'red' ) {
  
              btn.dataset.count = '0'
              btn.click()
  
            }
  
            if ( param === 'yellow' ) {
  
              btn.dataset.count = '1'
              btn.click()
  
            }
            
            if ( param === 'null' ) {
  
              btn.dataset.count = '3'
              btn.click()
  
            }

          }
          
        }

      },

      nullCols( e, indexClick ){

        let supportTableBody = document.querySelector( '#supportTableBody' )
        this.editStatCols( supportTableBody, indexClick, 'null' )

      },

      yellowCols( e, indexClick ){

        let supportTableBody = document.querySelector( '#supportTableBody' )
        this.editStatCols( supportTableBody, indexClick, 'yellow' )

      },

      redCols( e, indexClick ){

        let supportTableBody = document.querySelector( '#supportTableBody' )
        this.editStatCols( supportTableBody, indexClick, 'red' )
    

      },

      editStatCols( tableBody, indexCols, param ){

        let tableChild = tableBody.children

        for (let index = 0; index < 10; index++) {

          let row = tableChild[index]
          let indexRow = row.children[indexCols]
          let btnIndexRow = indexRow.getElementsByTagName( 'button' )
          let btn = btnIndexRow[0]

          let btnCount = btn.dataset.count

          if ( btnCount !== '3' ) {

            if ( param === 'red' ) {
  
              btn.dataset.count = '0'
              btn.click()
  
            }
  
            if ( param === 'yellow' ) {
  
              btn.dataset.count = '1'
              btn.click()
  
            }
            
            if ( param === 'null' ) {
  
              btn.dataset.count = '3'
              btn.click()
  
            }

          }

        }


      }

    }



  }


</script>

<template>
  
  <section class="flex justify-between bg-whiteOpacity-25 rounded-t-lg hidden md:flex" >
    <h1 class="p-2"> Support table </h1> 
  </section>


  <table class="table-auto w-full hidden md:table">
    <thead >
      <tr class="border-b border-gray-700 hover:bg-whiteOpacity-10">
        <th v-for="( number, index ) in Number( difficulty )"> {{ index + 1 }} </th>
        <!-- <th> </th> -->
        <th class=""> Highlight </th>
      </tr>
    </thead>

    <tbody id="supportTableBody" class="">

      <tr v-for="( number, index ) in 10" class="table-row h-[60px] border-b border-gray-700 hover:bg-whiteOpacity-10" data-supportRows >

        <td v-for="( i ) in Number( difficulty )" class=""> 
          <button-digit @edit="editStatusNumverMoveTable" v-bind:column="i - 1" :data-supportrow="index" :data-supportcolumn="i - 1"> {{ index }} </button-digit> 
        </td>

        <td class=""> 
          <section class="flex place-content-center">
            <button @click="nullRows( $event, index )" class="p-2 rounded hover:bg-whiteOpacity-25">
              n
            </button>
            <button @click="yellowRows( $event, index )" class="p-2 rounded hover:bg-yellowOpacity">
              y
            </button>
            <button @click="redRows( $event, index )" class="p-2 rounded hover:bg-redOpacity">
              r
            </button>
          </section>
        </td>

      </tr>

      <tr class="">

        <td v-for="( number, index ) in Number( difficulty )" > 
          <section class="flex place-content-center">

            <button @click="nullCols( $event, index )" class="p-2 rounded hover:bg-whiteOpacity-25">
              n
            </button>
            <button @click="yellowCols( $event, index )" class="p-2 rounded hover:bg-yellowOpacity">
              y
            </button>
            <button @click="redCols( $event, index )" class="p-2 rounded hover:bg-redOpacity">
              r
            </button>
          </section>
        </td>

        <td class="font-bold">
          Highlight
        </td>

      </tr>

      <!-- <tr class="">

        <td v-for="( number, index ) in Number( difficulty )">
          <input class="bg-inherit text-white border-b-4 border-gray-600 text-center text-xl w-[50px] h-[50px]" type="text">
        </td>

      </tr> -->

    </tbody>
  </table>

</template>