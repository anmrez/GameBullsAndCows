<script setup>

  // import HelloWorld from './components/HelloWorld.vue'
  // import TheWelcome from './components/TheWelcome.vue'
  import { io } from 'socket.io-client'
  import { onBeforeMount } from 'vue'
  const socket = io('http://192.168.0.2:3000/')

  let res

  onBeforeMount( () => {
    socket.emit( 'connectInRoom', {}, ( response ) => {
      res = response
      console.log( typeof res )
    })
  })

</script>



<template>

  <h3>
    HelloWorld
  </h3>
  <p>
    {{ res }}
  </p>

</template>



<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
