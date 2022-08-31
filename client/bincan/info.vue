<script>

export default{

  name: 'information-game',

  // methods:{

  //   resize( e ){

  //     logHeight.innerHTML = document.documentElement.clientHeight
  //     logWidth.innerHTML = document.documentElement.clientWidth

  //   }

  // },

  
  // mounted() {

  //   this.timerAlertId = setTimeout( this.showAlertScreen, 1100 )
  //   window.addEventListener( 'resize', this.resize )
  //   document.addEventListener( 'DOMContentLoaded', this.resize )

  // },
  // beforeUnmount(){

  //   clearInterval( this.timerAlertId )
  //   window.removeEventListener( 'resize', this.resize )
  //   document.removeEventListener( 'DOMContentLoaded', this.resize )

  // }

}


</script>


<template>
  
  <section class="w-full h-[100vh] top-0 left-0 absolute pointer-events-none z-0" >

    <section class="text-sm bottom-5 right-5 absolute ">
      <!-- <div> Height: <span id="logHeight" >  </span> </div>
      <div> Width: <span id="logWidth" >  </span> </div> -->
      <span> Version: 0.0.11 </span>
    </section>

  </section>

</template>