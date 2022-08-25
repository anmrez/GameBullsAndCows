<script>
import Backgraund from './components/ui/Backgraund.vue';


</script>



<template >

  <!-- <section class="w-full h-[100vh] absolute top-0 left-0">

    <img src="\src\assets\backgraund\moon.svg" alt="" class="w-[100px] top-[40%] right-[60%] absolute">
    <img src="\src\assets\backgraund\star1.svg" alt="" class="w-[30px] top-[40px] left-[60px] absolute">
    <img src="\src\assets\backgraund\star2.svg" alt="" class="w-[30px] top-[40px] left-[120px] absolute">
    <img src="\src\assets\backgraund\star3.svg" alt="" class="w-[30px] top-[40px] left-[180px] absolute">

  </section> -->
  <backgraund-space></backgraund-space>
  
  <section class='flex justify-center content-center h-[100vh]'  >

    <router-view></router-view>

  </section>

</template>
