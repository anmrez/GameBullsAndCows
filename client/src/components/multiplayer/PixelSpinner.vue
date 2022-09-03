<script>

export default{

  name: 'pixel-spinner',

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
        setTimeout( this.spinnerMove, timer, spinnerPosition, index )
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
  
        if ( index + 1 === allSpinnerPosition.length ) this.startSpinner()

      } catch (error) {
        
        // console.log( `error spinner` )

      }

    }

  },
  
  mounted(){

    this.startSpinner()

  }

}

</script>

<template>
  
  <!-- <section class="h-[100vh] w-full  top-0 left-0 absolute" > -->
    <section class="w-[30%] space-y-3 translate-y-[-50%] top-[50%] translate-x-[-50%] left-[50%] absolute">

      <section class="w-full flex items-center justify-center">
        
        <svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="200px" height="200px" viewBox="0 0 270 270" xml:space="preserve" fill='#ffffff66' class="w-[70px] h-[70px]">
          <g id="spinnerPosition">
            <rect x="158.1" y="79.4" width="33" height="33"/>
            <rect x="158.1" y="118.9" width="33" height="33"/>
            <rect x="158.1" y="158.1" width="33" height="33"/>
    
            <rect x="118.4" y="158.1" width="33" height="33"/>
            <rect x="78.9" y="158.1" width="33" height="33"/>
            <rect x="78.9" y="118.4" width="33" height="33"/>
            <rect x="78.9" y="78.9" width="33" height="33"/>
            <rect x="118.4" y="78.9" width="33" height="33"/>
          </g>
          <rect id="spinnerTarget" x="158.1" y="79.4" fill="#ffffff" width="33" height="33"/>
        </svg>
  
        <span class="mr-[25px]"> 
          <slot></slot>  
        </span>
    
        
      </section>

      <span v-show="this.connection === 'fail'" class="block w-full mb-3 text-center" > Connect fail </span>
      <span v-show="this.connection === 'fail'" class="block w-full mb-3 text-center" > Perhaps you have connection problems or the server is unavailable </span>
  
      <back-to-menu class=""></back-to-menu>

    </section>
  <!-- </section> -->


</template>