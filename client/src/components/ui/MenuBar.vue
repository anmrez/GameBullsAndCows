<script>

export default {

  name: 'menu-bar',

  methods:{

    menu( e ){

      let menuItem = document.querySelector( '#menuItem' )

      if ( menuItem.classList.contains( 'right-5' ) ){

        menuItem.classList.add( 'right-[-100%]' )
        menuItem.classList.remove( 'right-5' )

      } else {

        menuItem.classList.remove( 'right-[-100%]' )
        menuItem.classList.add( 'right-5' )

      }


    },

    closeMenu( e ){
      
      if ( e.target.dataset.menu !== '' ) {

        let menuItem = document.querySelector( '#menuItem' )
        menuItem.classList.add( 'right-[-100%]' )
        menuItem.classList.remove( 'right-5' )

      }

    },


  },
  mounted(){

    let menu = document.querySelector( '#menuButton' )
    menu.addEventListener( 'click', this.menu )
    document.addEventListener( 'click', this.closeMenu )

  },
  beforeUnmount() {

    let menu = document.querySelector( '#menuButton' )
    menu.removeEventListener( 'click', this.menu )
    document.removeEventListener( 'click', this.closeMenu )

  }

}

</script>

<template>

  <section class="w-full h-[100vh] overflow-hidden top-0 left-0 absolute">
    <button id="menuButton" class="w-[40px] h-[40px] rounded border-2 border-white flex flex-col justify-center content-center justify-items-center bg-blackOpacity-75 hover:bg-whiteOpacity-25 top-[5%] right-5 absolute z-50" data-menu>
      <section class="space-y-1 translate-y-[-50%] top-[50%] translate-x-[-50%] left-[50%] absolute" data-menu>
        <span class="w-[20px] h-[3px] rounded bg-white block" data-menu></span>
        <span class="w-[20px] h-[3px] rounded bg-white block" data-menu></span>
        <span class="w-[20px] h-[3px] rounded bg-white block" data-menu></span>
      </section>
    </button>
    <section id="menuItem" class="duration-200 top-[15%] right-[-100%] absolute z-50"> 
      <router-link to="/" class="py-3 px-4 border-2 border-white rounded bg-blackOpacity-75 hover:bg-whiteOpacity-10" > Back to menu </router-link>
    </section>
  </section>


</template>