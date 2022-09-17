<script>
  
  // import { App } from '@capacitor/app';
  export default{

    methods:{


      getUserAgent(){


        let agent = navigator.userAgent 
        // console.log( /Windows/.test( agent ) )

        let userAgent = document.querySelector( '#userAgent' )
        userAgent.innerHTML = agent

      },

      scrollListener(){

        let showScroll = document.querySelector( '#showScroll' )
        showScroll.innerHTML = window.pageYOffset + 'px'

        window.addEventListener('scroll', function() {
          showScroll.innerHTML = window.pageYOffset + 'px';
        });

      },

      // listenerBackButton(){

      //   // window.history.back()
      //   this.$router.push({ path: window.history.state.back }) 

      // }

    },


    mounted(){

      this.getUserAgent()
      this.scrollListener()
      // App.addListener( 'backButton', this.listenerBackButton )
      
    },
    


  }

</script>


<template>

  
  <section id="devpage" class="w-full bg-blackOpacity-75 z-10">
    <!-- <button @click="this.listenerBackButton"> back </button> -->
    <ul class="mt-[10%] space-y-3">
      <li class="flex flex-col text-center">
        <span> User agent: </span>
        <span id="userAgent" ></span>
      </li>
    </ul>

    <section class="fixed bottom-5 right-5" > 
      <span> scroll: </span> 
      <span id="showScroll" > </span>
    </section>

  </section>

</template>


<style>

#devpage{
  font-family: 'Courier New', Courier, monospace;
}

</style>