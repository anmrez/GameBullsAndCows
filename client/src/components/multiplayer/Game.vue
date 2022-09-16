<script>

  export default{

    name: 'MultiPlayerGame',
    props:{

      difficulty:{
        require: true
      },
      codeRoom:{
        require: true
      }

    },

    data(){

      return{

        arrayMove: [],
        arrayBulls: [],
        arrayCows: [],
        lastMove: '',
        showAlertComplite: false,

        complitedUsername: '',
        complitedTurns: '',
        complitedShow: false,

      }

    },

    methods:{

      windowResize(  ){

        let height = document.documentElement.clientHeight;
        let width = document.documentElement.clientWidth;
        if ( width <= 640 ) {

          let mobileKeyboard = document.querySelector( '#mobileKeyboard' )
          let mobileKeyboardHeight = mobileKeyboard.scrollHeight

          let difference = height - mobileKeyboardHeight

          let tableMove = document.querySelector( '#totalMove' )
          tableMove.style.maxHeight = difference - 25 + 'px'

          let tableSupport = document.querySelector( '#supportTable' )
          tableSupport.style.maxHeight = difference - 50 + 'px'

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

          if( count === '1' ) moveItemColumn.classList.add( 'border-red-500' )
          if( count === '2' ) moveItemColumn.classList.add( 'border-yellow-500' )
          if( count === '3' ) moveItemColumn.classList.add( 'border-green-500' )

        }

      },

      alert( alert ){

        if ( alert === null ) return
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
            
            alert = document.querySelector( '#alertRepeatMobile' )
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

          this.findBullsAndCows( value )
          inputMove.value = ''
          this.lastMove = value

        }

      },

      checkInput( value ){

        if ( value.length < this.difficulty ) {

          let alert = document.querySelector( '#alertInput' )
          this.alert( alert )
          
          alert = document.querySelector( '#alertInputMobile' )
          this.alert( alert )

          return false

        } else {

          return true

        }


      },


      findBullsAndCows( number ){

        let data = {
          codeRoom: this.codeRoom,
          number: number
        }

        this.$socket.emit( 'getBullsAndCows', data, ( response ) => {

          let countBulls = response.bulls
          let countCows = response.cows

          this.arrayBulls.push( countBulls )
          this.arrayCows.push( countCows )

          this.arrayMove.push( number )

          if ( response.complited ) this.showWinsowWin()

          this.$socket.emit( 'updateStatistics', this.codeRoom )

        })

      },

      showWinsowWin(){

        let modalWindowWin = document.querySelector( '#modalWindowWin' )
        modalWindowWin.classList.remove( 'hidden' )

      },

      listenerRoom(){

        this.$socket.on( 'room', ( response ) => {

          let param = response.param
          if ( response.event === 'listenerComplited' ) this.showAlertPlayerComplited( param )

        })

      },

      showAlertPlayerComplited( data ){

        console.log( data )
        this.complitedUsername = data.username
        this.complitedTurns = data.turns
        let complited = data.complited

        if ( complited ) {

          if ( this.complitedShow ) return
    
          this.complitedShow = true
          let alertComplite = document.querySelector( '#alertComplite' )
          alertComplite.style.top = '0px'
    
          setTimeout( this.hiddenAlertPlayerComplited, 6500 )

        }
        
      },

      hiddenAlertPlayerComplited(){

        let alertComplite = document.querySelector( '#alertComplite' )
        alertComplite.style.top = '-8em'
        this.complitedShow = false

      }


    },

    mounted(){

      this.windowResize

      window.addEventListener( "resize", this.windowResize );
      document.addEventListener( "click", this.onDOMClick );
      document.addEventListener( "touchstart", this.onDOMClick );
      
      this.listenerRoom()

    },

    beforeUnmount() {

      window.removeEventListener( "resize", this.windowResize );
      document.removeEventListener( "click", this.onDOMClick );
      document.removeEventListener( "touchstart", this.onDOMClick );

    },


  }

</script>

<template>

  <section class="">

    <modal-win-multiplayer
      v-bind:difficulty="this.difficulty"
    ></modal-win-multiplayer>


    <section id="alertComplite" class="w-[95%] md:w-auto px-6 py-2 bg-blackOpacity-75 border-x-2 border-b-2 border-white rounded  ease-in-out delay-100 duration-500  translate-x-[-50%] left-[50%] top-[-8em] absolute" >
      <section class="py-6 text-center">
    
        <span class=""> player: </span>
        <span id="complitedUsername" class="text-yellowOpacity" > {{ this.complitedUsername }} </span>
        <span class=""> completed the game in </span>
        <span id="complitedTurns" class="text-yellowOpacity" > {{ this.complitedTurns }} </span>
        <span class=" "> turns </span>
    
      </section>
    </section>

    <section class="md:flex space-x-0 md:space-x-7 w-full z-[1]">

      <section class="px-5 md:px-0 mt-10 w-full md:w-1/2 hidden md:block space-y-3 text-center" >
        <support-table v-bind:difficulty="this.difficulty"></support-table>
  
        <section id="moveInput" class="hidden md:flex space-x-3 ">
          <section class="relative">
            <input id="inputMove" autocomplete="off" type="tel" @blur="blurInputGame" @focus="focusInputGame" @input="checkInputGame( $event.target )" class="w-full h-full bg-whiteOpacity-10 text-4xl text-center rounded outline outline-2 outline-transparent outline-offset-1 focus:outline-white">
            <ul class="absolute flex mt-2">
              <li>
                <alert-red id="alertRepeat" class="mr-3"> Digit repeats </alert-red>
              </li>
              <li>
                <alert-red id="alertInput"> Not enough digit </alert-red>
              </li>
            </ul>
          </section>
          <button @click="makeMove" class="w-1/3 py-2 px-4 mx-5 border-2 border-white rounded hover:bg-whiteOpacity-10" > Make a move </button>
        </section>
      </section>
  
      <section id="totalMove" class="pb-5 md:pb-0 md:px-0 px-5 md:px-0 mt-5 md:mt-10 w-full md:w-1/2 text-sm md:text-base space-y-0 max-h-[90vh] overflow-scroll">
        <move-table 
          v-bind:arrayMove="this.arrayMove"
          v-bind:arrayBulls="this.arrayBulls"
          v-bind:arrayCows="this.arrayCows"
          v-bind:checkStatusNumverMoveTable="this.checkStatusNumverMoveTable"
        ></move-table>
      </section>

    </section>

    <mobile-keyboard id="mobileKeyboard" v-bind:windowResize="this.windowResize" v-bind:difficulty="this.difficulty" @clickMove="makeMove( )" @checkMobileInput="checkInputGame" class="" ></mobile-keyboard>



  </section>
</template>