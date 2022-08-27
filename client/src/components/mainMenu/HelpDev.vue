

<script>

export default {

  name: 'modal-helpDev',

  methods:{

    hiddenHelpDev( e ) {

      let rulesGame = document.querySelector( '#helpDev' )
      if ( e.target.id === 'helpDev' || e.target.id === 'closeHelpDev' )
        rulesGame.classList.add( 'hidden' )

    },

  }

}

</script>


<template>
  

  <section id="helpDev" class="w-full h-[100vh] top-0 left-0 absolute hidden" @click="hiddenHelpDev( $event )" >
    <section class="w-[90%] md:w-[60%] h-[80%] md:h-auto p-4 pb-8 bg-blackOpacity-75 translate-x-[-50%] translate-y-[-50%]  top-[50%] left-[50%] relative border-2 border-white z-50 space-y-3 indent-4 rounded"  > 
      <section class="w-full flex flex-nowrap justify-between relative"  >
        <h1 class="" > Help developer </h1>
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
  </section>

</template>