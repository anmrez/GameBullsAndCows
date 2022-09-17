<script>
export default {

  name: 'download-app',
  props:{
    appsMobile:{
      require: true
    }
  },
  data(){

    return{
      ulr: `http://${ import.meta.env.VITE_APP_SERVER_IP }/download/`
      // ulr: `http://192.168.0.2:5005/download`
    }

  }

}
</script>

<template>
  
  <section id="appMobileModal">


    <span id="appMobileStatus" v-if="appsMobile.length === 0" class="block w-full text-center"> not files </span>
    <ul class="w-full flex flex-col space-y-6">
      <li v-for="index in appsMobile" :key="index" class="flex justify-center"> 
        <a :href="ulr + index" target="_blank" class="max-w-[90%] w-full text-center py-2 px-4 border-2 border-white rounded hover:bg-whiteOpacity-10">
          {{ index }}
        </a>
      </li>
    </ul>

  </section>

</template>