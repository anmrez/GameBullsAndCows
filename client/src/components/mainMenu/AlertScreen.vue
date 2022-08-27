
<script>

export default {

  name: 'alert-screen',
  data(){

    return {

      timerAlertId: 0

    }

  },
  methods: {

    showAlertScreen(){

      let alert = document.querySelector( '#alertFullScreen' )
      alert.style.top = '0px'

    },




  },

  mounted() {

    this.timerAlertId = setTimeout( this.showAlertScreen, 1100 )

  },
  beforeUnmount(){

    clearInterval( this.timerAlertId )

  }

}

</script>


<template>

  <section class="w-full h-[100vh] hidden md:block top-0 left-0 absolute pointer-events-none z-0" >

    <section id="alertFullScreen" class="h-[60px] p-3 bg-blackOpacity-75 border-x-2 border-b-2 border-white rounded-b translate-x-[-50%] left-[50%] top-[-65px] absolute flex place-content-center ease-in duration-150 pointer-events-none">
      <div class="my-auto pointer-events-auto">
        press <span class="border vorder-white rounded p-2 mr-2"> F11 </span> to enter full screen mode
      </div>
    </section>

  </section>

</template>