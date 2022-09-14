
<script>

  export default {
  
    name: 'modal-win-multiplayer',
    props:{

      difficulty:{
        require: true
      }

    },
    data(){

      return{

        player1: 'name1' ,
        player2: 'name2' ,
        turns1: 'Nan' ,
        turns2: 'Nan' ,
        beginningGame: 'number' ,
        endTime1: 'number' ,
        endTime2: 'number' ,

        plTime1: 'Nan',
        plTime2: 'Nan',


      }

    },


    methods:{

      listenerRoom(){

        this.$socket.on( 'room', ( response ) => {

          console.log( response )
          let param = response.param

          if ( response.event === 'statistics' ) this.setStatistics( param )

        })

      },

      setStatistics( param ){

        this.setParams( param )

        this.plTime1 = ( this.endTime1 - this.beginningGame ) / 1000
        this.plTime1 = Math.ceil( this.plTime1 )
        
        this.plTime2 = ( this.endTime2 - this.beginningGame ) / 1000
        this.plTime2 = Math.ceil( this.plTime2 )

      },

      setParams( param ){

        this.player1 = param.player1
        this.player2 = param.player2
        this.turns1 = param.turns1
        this.turns2 = param.turns2
        this.beginningGame = param.beginningGame
        this.endTime1 = param.endTime1
        this.endTime2 = param.endTime2

      }

    },

    mounted(){

      this.listenerRoom()

    }
  
  
  }
  </script>
  
  <template>
    
    <section id="modalWindowWin" class="w-full h-[100vh] z-50 bg-blackOpacity-25 top-0 left-0 absolute hidden" >
      <section class="w-[90%] md:w-[50%] py-6 md:py-4 px-4 md:px-14 space-y-6 bg-blackOpacity-50 border border-white rounded translate-x-[-50%] translate-y-[-50%] left-[50%] top-[50%] absolute" >
        <h1 class="w-full text-xl text-center"> Multiplayer </h1>
        <h3 class="text-center" > Difficulty: {{ this.difficulty }} digits </h3>
        <section class="flex space-x-3" >

          <!-- player1 -->
          <ul class="w-1/2 space-y-3">

            <!-- title -->
            <li>
              <!-- <h1 class="text-center text-xl text-greenOpacity" > Win </h1> -->
              <h1 class="text-center text-xl text-yellowOpacity" > ... </h1>
              <h3 class="text-center" > {{ player1 }} </h3>
            </li>

            <!-- turn -->
            <li class="px-2 flex justify-between space-x-3 hover:bg-whiteOpacity-25 border-b border-white">
              <span class="text-sm md:text-base" >
                Turns:
              </span>
              <span class="text-sm md:text-base" >
                {{ this.turns1 }}
              </span>
            </li>

            <!-- time -->
            <li class="px-2 flex justify-between space-x-3 hover:bg-whiteOpacity-25 border-b border-white">
              <span class="text-sm md:text-base" >
                Time:
              </span>
              <span class="text-sm md:text-base" >
                <span> {{ this.plTime1 }} </span>
                <span class="text-xs" > sec. </span>
              </span>
            </li>

          </ul>
          
          <!-- player2 -->
          <ul class="w-1/2 space-y-3">

            <!-- title -->
            <li>
              <!-- <h1 class="text-center text-xl text-redOpacity" > Lose </h1> -->
              <h1 class="text-center text-xl text-yellowOpacity" > ... </h1>
              <h3 class="text-center" > {{ player2 }} </h3>
            </li>

            <!-- turn -->
            <li class="px-2 flex justify-between space-x-3 hover:bg-whiteOpacity-25 border-b border-white">
              <span class="text-sm md:text-base" >
                Turns:
              </span>
              <span class="text-sm md:text-base" >
                {{ this.turns2 }}
              </span>
            </li>

            <!-- time -->
            <li class="px-2 flex justify-between space-x-3 hover:bg-whiteOpacity-25 border-b border-white">
              <span class="text-sm md:text-base" >
                Time:
              </span>
              <span class="text-sm md:text-base" >
                <span> {{ this.plTime2 }} </span>
                <span class="text-xs" > sec. </span>
              </span>
            </li>

          </ul>


        </section>
        <section class="flex place-content-center space-x-3" >
          <!-- <pixel-button @click="this.disconnectFromLobby()" class="w-full text-base" > Disconnect </pixel-button> -->
          <back-to-menu class="w-full"></back-to-menu>
        </section>
      </section>
  
    </section>
  
  </template>