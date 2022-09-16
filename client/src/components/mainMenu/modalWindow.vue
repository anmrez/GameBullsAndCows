<script>

  export default {
  
    name: 'modal-window',
    props:{
      modalType:{
        require: true
      }
  
    },
    methods: {
  
      hiddenModalWindow( e ) {
  
        
        let modalWindowMain = document.querySelector( '#modalWindowMain' )
        if ( e.target.id === 'modalWindowMain' || e.target.id === 'closeModalWindow' ) {
          
          let modalWindow = document.querySelector( '#modalWindow' )
          modalWindow.style.height = '0px'
  
  
          setTimeout ( () => {
            modalWindowMain.classList.add( 'hidden' )
            modalWindow.style.height = 'auto'
          }, 150 )

          window.location.hash = ''
  
        }
  
      },
  
    },
  
  
  }
  
  </script>
  
  <template>
    
    <section id="modalWindowMain" class="w-full h-[100vh] top-0 left-0 absolute hidden z-50" @click="this.hiddenModalWindow ( $event )" >
    
        <section id="modalWindow" class="w-[90%] md:w-[60%] h-[0%] md:h-auto max-h-[90%] md:max-h-[60%] p-4 bg-blackOpacity-75 translate-x-[-50%] translate-y-[-50%]  top-[50%] left-[50%] relative duration-300 border-2 border-white z-50 space-y-3 indent-4 rounded"  > 
          <section class="w-full flex flex-nowrap justify-between relative"  >
            
            <h1 class="" v-show="modalType === 'Rules'" > Rules of the game </h1>
            <h1 class="" v-show="modalType === 'Support'" > Support the developer </h1>
            <h1 class="" v-if="modalType === 'Training'" > Interface training </h1>
            <h1 class="" v-show="modalType === 'AppMobile'" > AppMobile </h1>

            <button id="closeModalWindow" @click="this.hiddenModalWindow" class="p-2 text-lg hover:text-redOpacity top-[-10px] right-[-10px] relative" > X </button>
          </section>

          <support-developer v-if="modalType === 'Support'">  </support-developer>
          <rules-game v-show="modalType === 'Rules'">  </rules-game>
          <download-app v-show="modalType === 'AppMobile'" >  </download-app>
          <interface-training v-if="modalType === 'Training'" >  </interface-training>

    
        </section>
    
      </section>
  
  </template>