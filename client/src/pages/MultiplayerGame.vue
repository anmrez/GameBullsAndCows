<script>

  export default{

    data(){

      return{

        difficulty: 3

      }

    },

    methods:{



    },


    mounted(){



    },

  }

</script>

<template>
  
  <section class="w-[90%] md:w-auto space-y-5 translate-y-[-50%] top-[50%] translate-x-[-50%] left-[50%] absolute ">

    <crate-number-mp v-bind:difficulty="this.difficulty" ></crate-number-mp>

  </section>

</template>