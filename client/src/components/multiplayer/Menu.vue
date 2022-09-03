<script>

export default {

  name: 'multiplayer-menu',

}

</script>

<template>
  
  <!-- <section class="space-y-3 top-[50%] translate-y-[-50%] absolute"> -->
  <section class="space-y-5 translate-y-[-50%] top-[50%] translate-x-[-50%] left-[50%] absolute ">

    <pixel-button class="w-full text-base" > Connect to the lobbi </pixel-button>
    <!-- <pixel-button class="w-full text-base" > Create the room </pixel-button> -->

    <section>
      <router-link to="/multiplayer/lobbi" class="py-2 px-4 border-2 border-white rounded hover:bg-whiteOpacity-10 flex justify-center space-x-3" > Create the lobbi </router-link>
    </section>
    <back-to-menu class=""></back-to-menu>

  </section>

</template>