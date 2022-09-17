<script>
import { App } from '@capacitor/app';

export default{

  methods:{

    listenerBackButton(){

      let reg = new RegExp( '/#', 'i' )
      let currentUrl = window.history.state.current

      if ( reg.test( currentUrl ) ) {

        window.location.hash = ''
        this.$socket.disconnect()
        return
        
      }
      
      this.$router.push({ path: window.history.state.back }) 
        
    }
  
  },
  mounted(){
    App.addListener( 'backButton', this.listenerBackButton )
  }
}

</script>



<template >

  <backgraund-space></backgraund-space>
  
  <section class='flex justify-center content-center h-[100vh]'  >

    <router-view></router-view>

  </section>

</template>
