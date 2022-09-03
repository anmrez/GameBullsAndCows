<script>

export default{

  methods:{

    checkCookie(){

      let cookie = document.cookie
      if ( cookie === '' ) this.$router.push({ name: 'multiPlayer' })
      let arrCookie = cookie.split( '; ' )

      let username
      arrCookie.forEach( item => {
        
        let index = item.indexOf( 'username=' )
        if ( index >= 0 ) username = item.replace( 'username=', '' )
        
      })
      if ( username === undefined ) this.$router.push({ name: 'multiPlayer' })


    }

  },

  mounted(){

    this.checkCookie()

  }

}

</script>

<template>
  
  <section class="space-y-5 translate-y-[-50%] top-[50%] translate-x-[-50%] left-[50%] absolute ">
    <h1 class="text-2xl text-center"> Lobbi </h1>

    <section class="flex space-x-3">

      <!-- <h2> Code of room </h2>
      <span class="font-bold"> 03U23 </span> -->
      <ul>
        <li> Players: </li>
        <li> • anmrez </li>
      </ul>
    </section>

    <pixel-button class="w-full text-base" > Start game </pixel-button>
  </section>

</template>