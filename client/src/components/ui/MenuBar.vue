<script>

export default {

  name: 'menu-bar',

  methods:{

    editStatusMenu ( ) {

      let menu = document.querySelector( '#menu' )
      let menuArrow = document.querySelector( '#menuArrow' )
      let leftMenu = menu.style.left
      // let menuWidth = menu.clientWidth
      let width = document.body.clientWidth
      let menuBar = document.querySelector( '#menuBar' )

      
      if ( leftMenu === '0px' ) {

        menu.style.left = '-25%'
        if ( width < 640 ) menu.style.left = '-100%'
        if ( width < 640 ) menuBar.classList.remove( 'rotate-180' )

        if ( width > 640 ) menuArrow.classList.remove( 'rotate-180' )

      } else {
        
        menu.style.left = '0px'
        if ( width < 640 ) menuBar.classList.add( 'rotate-180' )
        
        if ( width > 640 ) menuArrow.classList.add( 'rotate-180' )

      }

      



    },

    handlerKey( e ){

      if ( e.key === 'Escape' ) this.editStatusMenu()

    },


  },
  mounted(){

    document.addEventListener( 'keyup', this.handlerKey )

  },
  beforeUnmount() {

    document.removeEventListener( 'keyup', this.handlerKey )

  }

}

</script>

<template>

  <section>

    
    <section id="menu" class="w-[100%] md:w-[25%] h-[100vh] bg-blackOpacity-75 border-r-2 border-white ease-in duration-300 translate-y-[-50%] top-[50%] left-[-100%] md:left-[-25%] fixed z-10 ">

      <section id="menuBar" @click="editStatusMenu" class="w-[60px] h-[80px] cursor-pointer translate-y-[-50%] top-[50%] translate-x-[100%] right-[0px] origin-left  absolute overflow-hidden ease-in duration-200 z-20">
        <section class="w-[60px] h-[60px] border-2 border-white translate-y-[-50%] top-[50%]  rounded-full left-[-30px] absolute " >
    
          <span id="menuArrow" class="text-lg translate-x-[-50%] translate-y-[-50%] top-[50%] left-[70%] absolute origin-center duration-100 ">
            >
          </span>
      
        </section>
      </section>
      
      <section class="w-full flex flex-col justify-center space-y-5">
        <h1 class="text-lg my-6 text-center"> Bulls and Cows </h1>
  
        <ul class="mx-5 "> statistics
          <li class="ml-5" > time </li>  
          <li class="ml-5" > turn </li>
          <li class="ml-5" > difficulty </li>
        </ul>

        <router-link to="/" class="py-2 px-4 mx-5 text-center border-2 border-white rounded hover:bg-whiteOpacity-10" > Back to menu </router-link>

      </section>

    </section>

  </section>
  

</template>