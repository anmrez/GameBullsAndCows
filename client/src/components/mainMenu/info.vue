<script>

export default{

  name: 'information-game',
  data(){

    return {

      version: import.meta.env.VITE_APP_VERSION

    }

  },

}


</script>


<template>
  
  <section class="w-full h-[100vh] top-0 left-0 absolute pointer-events-none z-0" >

    <section class="text-sm bottom-5 right-5 absolute ">
      <span> Version: {{ this.version }} </span>
    </section>

  </section>

</template>