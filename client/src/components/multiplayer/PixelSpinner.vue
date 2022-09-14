<script>

export default{

  name: 'pixel-spinner',

  data(){

    return{

      timerIDSpinner: [],
      timerIDPointer: []

    }

  },

  props:{

    connection:{
      require: true
    }

  },

  methods:{

    startSpinner(){

      
      let spinnerPositionGroup = document.querySelector( '#spinnerPosition' )
      let allSpinnerPosition = spinnerPositionGroup.children
      // console.log( allSpinnerPosition )

      let timer = 200
      for (let index = 0; index < allSpinnerPosition.length; index++) {
        
        let spinnerPosition = allSpinnerPosition[index];
        let timerID = setTimeout( this.spinnerMove, timer, spinnerPosition, index )
        this.timerIDSpinner.push( timerID )
        timer += 200

      }

    },

    spinnerMove( spinnerPosition, index ){

      try {
        
        let spinnerTarget = document.querySelector( '#spinnerTarget' )
        let spinnerPositionGroup = document.querySelector( '#spinnerPosition' )
        let allSpinnerPosition = spinnerPositionGroup.children
  
        let X = spinnerPosition.x.baseVal.value
        let Y = spinnerPosition.y.baseVal.value
  
        spinnerTarget.x.baseVal.value = X
        spinnerTarget.y.baseVal.value = Y
  
        if ( index + 1 === allSpinnerPosition.length ) {
          this.timerIDSpinner = []
          this.startSpinner()
        } 

      } catch (error) {
        
        // console.log( `error spinner` )

      }

    },

    startPointAnimation(){

      let timer = 700
      for ( let i = 0; i < 4; i++ ) {

        let timerID = setTimeout( this.pointAnimationMove, timer, i )
        this.timerIDPointer.push( timerID ) 
        timer += 700
        
      }

    },

    pointAnimationMove( index ){

      let pointAnimation = document.querySelector( '#pointAnimation' )

      if ( index === 0 ) pointAnimation.innerHTML = ''
      if ( index === 1 ) pointAnimation.innerHTML = '.'
      if ( index === 2 ) pointAnimation.innerHTML = '..'
      if ( index === 3 ) {
        pointAnimation.innerHTML = '...'
        this.startPointAnimation()
        // this.timerIDPointer = []
      } 
      if ( this.timerIDPointer.length > 5 ) this.timerIDPointer.shift()

    },

    stopAllTimer(){

      // console.log( `stopAllTimer` )

      this.timerIDSpinner.forEach( item => {
        clearInterval( item )
      });

      this.timerIDPointer.forEach( item => {
        clearInterval( item )
      });

    }

  },
  
  mounted(){

    this.startPointAnimation()
    this.startSpinner()

  },

  beforeUnmount() {

    this.stopAllTimer()

  }

}

</script>

<template>
  
  <!-- <section class="h-[100vh] w-full  top-0 left-0 absolute" > -->
    <section class="w-[90%] md:w-[30%] space-y-3 translate-y-[-50%] top-[50%] translate-x-[-50%] left-[50%] absolute">

      <section class="w-full flex items-center justify-center">
        
        <svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="86px" height="86px" viewBox="0 0 86 86" xml:space="preserve" fill='#ffffff66' class="w-[30px] h-[30px] mr-2" >
          <g id="spinnerPosition">
            <rect x="60" y="2.6" width="24.4" height="24.4"/>
            <rect x="60" y="31.9" width="24.4" height="24.4"/>
            <rect x="60" y="60.9" width="24.4" height="24.4"/>
            <rect x="30.6" y="60.9" width="24.4" height="24.4"/>
            <rect x="1.3" y="60.9" width="24.4" height="24.4"/>
            <rect x="1.3" y="31.5" width="24.4" height="24.4"/>
            <rect x="1.3" y="2.2" width="24.4" height="24.4"/>
            <rect x="30.6" y="2.2" width="24.4" height="24.4"/>
          </g>
          <rect id="spinnerTarget" x="60" y="2.6" fill="#FFFFFF" width="24.4" height="24.4"/>
        </svg>
  
        <section class="flex "> 
          <p> Server connection </p>
          <span id="pointAnimation" > ... </span>
        </section>
    
        
      </section>
      
      <section v-show="this.connection === 'fail'" class="pt-2 bg-redOpacity border border-red-500 rounded" >
        <!-- <span class="block w-full mb-3 text-center" > Connect fail </span> -->
        <span class="px-4 block w-full mb-3 text-center " > Perhaps you have connection problems or the server is unavailable </span>
      </section>
  
      <back-to-menu class=""></back-to-menu>

    </section>
  <!-- </section> -->


</template>