<script>

  export default {
  
    name: 'modal-rules',
    methods: {
  
      hiddenTraining( e ) {
  
        
        let training = document.querySelector( '#training' )
        if ( e.target.id === 'training' || e.target.id === 'closetraining' ) {
          
          let trainingModal = document.querySelector( '#trainingModal' )
          trainingModal.style.height = '0px'
  
  
          setTimeout ( () => {
            training.classList.add( 'hidden' )
            trainingModal.style.height = 'auto'
          }, 150 )
  
        }
  
      },
  
    },
  
    mounted(){
  
      this.$emit( 'showtraining', this.showtraining )
  
    }
  
  }
  
  </script>
  
  <template>
    
    <section id="training" class="w-full h-[100vh] top-0 left-0 absolute hidden" @click="hiddenTraining ( $event )" >
    
        <section id="trainingModal" class="w-[90%] md:w-[60%] h-[0%] md:h-auto max-h-[90%] md:max-h-[60%] p-4 bg-blackOpacity-75 translate-x-[-50%] translate-y-[-50%]  top-[50%] left-[50%] relative duration-300 border-2 border-white z-50 space-y-3 indent-4 rounded"  > 
          <section class="w-full flex flex-nowrap justify-between relative"  >
            <h1 class="" > Instructor </h1>
            <button id="closetraining" @click="hiddenTraining" class="p-2 text-lg hover:text-redOpacity top-[-10px] right-[-10px] relative" > X </button>
          </section>

          <h2>
            - Support table
          </h2>
          <p>
            With the help of the "Support table" you can highlight numbers in several colors
          </p>
          <ul>
            <li> N - null ( transparent ) </li> 
            <li> Y - yellow ( this digit is present but out of place ) </li> 
            <li> R - red ( this digit is not present ) </li> 
            <li> G - green ( this digit is present ) </li> 
          </ul>
          <video src="/gif/support_row.mp4" autoplay loop width="60%"></video>
          <video src="/gif/support_column.mp4" autoplay loop width="80%"></video>
          <p>
            clear all highlight in table
          </p>
          <video src="/gif/clear.mp4" autoplay loop width="80%"></video>
  
          <br>
    
        </section>
    
      </section>
  
  </template>