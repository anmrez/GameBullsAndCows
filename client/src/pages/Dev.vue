<script>

  export default{

    methods:{


      getUserAgent(){


        let agent = navigator.userAgent 
        console.log( /Windows/.test( agent ) )

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

    },

    mounted(){

      this.getUserAgent()
      this.scrollListener()



    }


  }

</script>


<template>

  <section id="devpage" class="w-full bg-blackOpacity-75 z-10">
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