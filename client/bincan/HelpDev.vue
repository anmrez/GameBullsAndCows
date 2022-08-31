

<script>

export default {

  name: 'modal-helpDev',

  methods:{

    // hiddenHelpDev( e ) {

    //   let rulesGame = document.querySelector( '#helpDev' )
    //   if ( e.target.id === 'helpDev' || e.target.id === 'closeHelpDev' )
    //     rulesGame.classList.add( 'hidden' )

    // },

    hiddenSupportDev( e ) {
      
      let supportDev = document.querySelector( '#supportDev' )
      if ( e.target.id === 'supportDev' || e.target.id === 'closeSupportDev' ) {
        
        let rulesGameModal = document.querySelector( '#supportDevModal' )
        supportDevModal.style.height = '0px'


        setTimeout ( () => {
          supportDev.classList.add( 'hidden' )
          supportDevModal.style.height = 'auto'
        }, 150 )

      }

    },


  },
  mounted(){

    this.$emit( 'showSupportDev', this.showSupportDev )

  }

}

</script>


<template>



  <section id="supportDev" class="w-full h-[100vh] top-0 left-0 absolute hidden" @click="hiddenSupportDev( $event )" >
    <section id="supportDevModal" class="w-[90%] md:w-[60%] h-[0%] md:h-auto max-h-[90%] md:max-h-[60%] p-4 bg-blackOpacity-75 translate-x-[-50%] translate-y-[-50%]  top-[50%] left-[50%] relative duration-300 border-2 border-white z-50 space-y-3 indent-4 rounded"  > 
      <section class="w-full flex flex-nowrap justify-between relative"  >
        <h1 class="" > Support developer </h1>
        <button id="closeSupportDev" @click="hiddenSupportDev( $event )" class="p-2 text-lg hover:text-redOpacity top-[-10px] right-[-10px] relative" > X </button>
      </section>
      <ul class="w-full flex flex-col space-y-6">
        <li class="flex justify-center"> 
          <a href="https://boosty.to/" target="_blank" class="max-w-[90%] w-full text-center py-2 px-4 border-2 border-white rounded hover:bg-whiteOpacity-10">
            Boosty.io 
          </a>
        </li>
        <li class="flex justify-center"> 
          <a href="https://boosty.to/" target="_blank" class="max-w-[90%] w-full text-center py-2 px-4 border-2 border-white rounded hover:bg-whiteOpacity-10">
            Patreon
          </a>
        </li>
      </ul>
    </section>
  </section>

  <!-- <section id="helpDev" class="w-full h-[100vh] top-0 left-0 absolute hidden" @click="hiddenHelpDev( $event )" >
    <section class="w-[90%] md:w-[60%] h-[80%] md:h-auto p-4 pb-8 bg-blackOpacity-75 translate-x-[-50%] translate-y-[-50%]  top-[50%] left-[50%] relative border-2 border-white z-50 space-y-3 indent-4 rounded"  > 
      <section class="w-full flex flex-nowrap justify-between relative"  >
        <h1 class="" > Support developer </h1>
        <button id="closeHelpDev" @click="hiddenHelpDev( $event )" class="p-2 text-lg hover:text-redOpacity top-[-10px] right-[-10px] relative" > X </button>
      </section>
      <ul class="w-full flex flex-col space-y-6">
        <li class="flex justify-center"> 
          <a href="https://boosty.to/" target="_blank" class="max-w-[30%] w-full text-center py-2 px-4 border-2 border-white rounded hover:bg-whiteOpacity-10">
            Boosty.io 
          </a>
        </li>
        <li class="flex justify-center"> 
          <a href="https://boosty.to/" target="_blank" class="max-w-[30%] w-full text-center py-2 px-4 border-2 border-white rounded hover:bg-whiteOpacity-10">
            Patreon
          </a>
        </li>
      </ul>
    </section>
  </section> -->

</template>