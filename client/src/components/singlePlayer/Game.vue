<script>
import { isProxy, toRaw } from 'vue'; 
export default {

  data(){

    return {

      arrayMove: [],
      arrayBulls: [],
      arrayCows: [],
      lastMove: '',
      amountTurns: 0,
      amountTime: 0,
      timerId: ''

    }

  },

  props:{
    difficulty: {
      require: true
    },
    hiddenNumber: {
      require: true
    },

  },

  created() {
    window.addEventListener( "resize", this.windowResize );
    document.addEventListener( "click", this.onDOMClick );
    document.addEventListener( "touchstart", this.onDOMClick );
  },

  destroyed() {
    window.removeEventListener( "resize", this.windowResize );
    document.removeEventListener( "click", this.onDOMClick );
    document.removeEventListener( "touchstart", this.onDOMClick );
  },

  beforeCreate(){

    this.windowResize
    

  },

  mounted(){

    this.timerId = setInterval( this.timer, 1000 )

  },

  methods: {

    timer: function() {

      this.amountTime++

    },

    windowResize(  ){

      let height = document.documentElement.clientHeight;
      let width = document.documentElement.clientWidth;
      if ( width <= 640 ) {

        let mobileKeyboard = document.querySelector( '#mobileKeyboard' )
        let mobileKeyboardHeight = mobileKeyboard.scrollHeight
  
        let difference = height - mobileKeyboardHeight
  
        let tableMove = document.querySelector( '#totalMove' )
        tableMove.style.maxHeight = difference - 25 + 'px'

      }

    },

    onDOMClick( e ){

      let contextMenuDigitMoveElements = document.querySelectorAll( '[data-contextMenuDigitMove]' )
      for (let index = 0; index < contextMenuDigitMoveElements.length; index++) {
        
        let item = contextMenuDigitMoveElements[index];
        if ( e.target.dataset.contextmenudigitmove === '' ) return
        let contextMenuDigitMove = document.querySelector( '#contextMenuDigitMove' )
        contextMenuDigitMove.classList.add( 'hidden' )

      }

    },

    checkStatusNumverMoveTable( ){

      let value = this.lastMove

      let supportTableRows = document.querySelectorAll( '[data-supportRows]' )
      let movetableRows = document.querySelectorAll( '[data-movetablenumber]' )
      let movetableLastRow = movetableRows[ movetableRows.length - 1 ]

      for (let index = 0; index < supportTableRows.length; index++) {

        let supportTableRowsItem = supportTableRows[ index ].children

        for (let index = 0; index < value.length; index++) {
          
          let supportTableColumnItem = supportTableRowsItem[ index ]
          let supportTableColumnItemValue = supportTableColumnItem.outerText
          let digit = value[index]

          if ( digit === supportTableColumnItemValue ) {
            
            let supportTableButton = supportTableColumnItem.children[0]
            let movetableLastRowButton = movetableLastRow.children[index]  
            setStatus( supportTableButton, movetableLastRowButton )

          }
          
          
        }

        
      }

      // scroll moveTable in bottom        
      let tableMove = document.querySelector( '#totalMove' )
      let tableMoveHeight = tableMove.scrollHeight + 50
      tableMove.scroll( 0, tableMoveHeight )

      function setStatus( supportButton, moveButton ){

        let moveItemColumn = moveButton.children[0]
        let count = supportButton.dataset.count

        if( count === '1' ) moveItemColumn.classList.add( 'border-redOpacity' )
        if( count === '2' ) moveItemColumn.classList.add( 'border-yellow-500' )
        if( count === '3' ) moveItemColumn.classList.add( 'border-green-500' )

      }


    },

    alert( alert ){

      if ( alert.dataset.view === 'false' ) {

        alert.dataset.view = true
        alert.classList.remove( 'hidden' )
        setTimeout( hiddenAlert, 3000 )

      }

      function hiddenAlert( ){

        alert.dataset.view = false
        alert.classList.add( 'hidden' )

      }

    },

    checkInputGame( input ){

      let value = input.value

      let str = value.replace( /\D/gi, '');
      input.value = str

      if ( value.length > this.difficulty ) input.value = str.substring( 0, this.difficulty )

      for (let index = 0; index < value.length; index++) {

        let first = Number( str.indexOf( value[index] ) )
        let second = str.indexOf( value[index] , first + 1 )
        if ( second > -1 && first !== second ) {

          let subStrStart = str.substring( 0, second )
          let subStrEnd = str.substring( second + 1, str.length )
          input.value = subStrStart + subStrEnd

          let alert = document.querySelector( '#alertRepeat' )
          this.alert( alert )

        } 

      }

    },

    onEnterListen( event ){

      if ( event.key === 'Enter' ) {

        this.makeMove( )

      }

    },

    focusInputGame( e ){

      e.target.addEventListener( 'keydown', this.onEnterListen )

    },

    blurInputGame( e ){

      e.target.removeEventListener( 'keydown', this.onEnterListen )

    },

    makeMove( ){

      let inputMove = document.querySelector( '#inputMove' )
      if ( inputMove.value === '' ) inputMove = document.querySelector( '#inputMobileMove' )
      let value = inputMove.value
      let result = this.checkInput( value )
      if ( result ) {

        this.arrayMove.push( value )
        this.findBullsAndCows( value )
        inputMove.value = ''
        this.lastMove = value
        // this.checkStatusNumverMoveTable( value )
        this.amountTurns++


      }

    },

    checkInput( value ){

      if ( value.length < this.difficulty ) {

        let alert = document.querySelector( '#alertInput' )
        this.alert( alert )
        return false

      } else {

        return true

      }


    },


    findBullsAndCows( number ){

      let countBulls = 0
      let countCows = 0

      let hiddenNumber = this.hiddenNumber

      for (let hIndex = 0; hIndex < hiddenNumber.length; hIndex++) {
        
        let hDigit = hiddenNumber[hIndex];
      
        for (let nIndex = 0; nIndex < number.length; nIndex++) {

          let nDigit = number[nIndex]

          if ( hDigit === nDigit && hIndex === nIndex ) countBulls++
          if ( hDigit === nDigit && hIndex !== nIndex ) countCows++
          
        }

      }

      if ( hiddenNumber.length === countBulls ) {
        
        let modalWindowWin = document.querySelector( '#modalWindowWin' )
        modalWindowWin.classList.remove( 'hidden' )
        clearInterval( this.timerId )

      }

      this.arrayBulls.push( countBulls )
      this.arrayCows.push( countCows )

    },

  }

}

</script>



<template>

  <section class="flex w-full" >

    <menu-bar></menu-bar>

    <modal-win v-bind:difficulty="this.difficulty" v-bind:turn="this.amountTurns" v-bind:time="this.amountTime" ></modal-win>
  
    <section class="md:flex space-x-0 md:space-x-7 w-full relative ">
  
      
    
      <section class="px-5 md:px-0 mt-10 w-full md:w-1/2 hidden md:block space-y-3 text-center" >
        
        <support-table v-bind:difficulty="this.difficulty" class=" md:hidden sm:hidden"></support-table>
        <section class="flex space-x-3">
          <section class="relative">
            <input id="inputMove" type="tel" @blur="blurInputGame" @focus="focusInputGame" @input="checkInputGame( $event.target )" class="w-full bg-whiteOpacity-10 text-4xl text-center rounded outline outline-1 outline-transparent outline-offset-1 focus:outline-neon">
            <ul class="absolute flex mt-2">
              <li>
                <alert-red id="alertRepeat"> Digit repeats </alert-red>
              </li>
              <li>
                <alert-red id="alertInput"> Not enough digit </alert-red>
              </li>
            </ul>
          </section>
          <button @click="makeMove" class="w-1/3 py-2 px-4 mx-5 border-2 border-white rounded hover:bg-whiteOpacity-10" > Make a move </button>
        </section>
  
      </section>
  
      <section id="totalMove" class="pb-5 md:pb-0 md:px-0 px-5 md:px-0 mt-5 md:mt-10 w-full md:w-1/2 text-sm md:text-base space-y-3 max-h-[90vh] overflow-y-auto">
        <move-table 
          v-bind:arrayMove="this.arrayMove"
          v-bind:hiddenNumber="this.hiddenNumber"
          v-bind:arrayBulls="this.arrayBulls"
          v-bind:arrayCows="this.arrayCows"
          v-bind:checkStatusNumverMoveTable="this.checkStatusNumverMoveTable"
  
        ></move-table>
      </section>
  
      <mobile-keyboard id="mobileKeyboard" v-bind:difficulty="this.difficulty" @clickMove="makeMove( )" @checkMobileInput="checkInputGame" class="" ></mobile-keyboard>
  
    </section>

  </section>


</template>



<style>

body::-webkit-scrollbar {
  width: 12px;               /* ширина scrollbar */
}
body::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.25);        /* цвет дорожки */
}
body::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.25);    /* цвет плашки */
  border-radius: 20px;       /* закругления плашки */
  border: 3px solid orange;  /* padding вокруг плашки */
}

body {
  scrollbar-radius: 20px; 
  scrollbar-width: thin;          /* "auto" или "thin"  */
  scrollbar-color: rgba(255, 255, 255, 0.10) rgba(0, 0, 0, 0);   /* плашка скролла и дорожка */ 
}

</style>