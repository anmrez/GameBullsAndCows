<script>

  export default{

    name: 'alert-complite',
    expose: ['showFN'],
    data(){

      return{

        show: false,
        username: '',
        turns: 0,

      }

    },
    methods:{

      showFN( username, turns ){

        if ( this.show ) return
        this.username = username
        this.turns = turns

        let alertComplite = document.querySelector( '#alertComplite' )
        alertComplite.style.top = '0px'

        setTimeout( this.hidden, 3000 )
        
        
      },
      
      hidden(){
        
        let alertComplite = document.querySelector( '#alertComplite' )
        alertComplite.style.top = '-100px'
        this.show = false

      }

    },

  }

</script>

<template>

  <section id="alertComplite" class="w-[95%] md:w-auto px-6 py-2 bg-blackOpacity-75 border-x-2 border-b-2 border-white rounded  ease-in-out delay-100 duration-500  translate-x-[-50%] left-[50%] top-[-100px] absolute" >
    <section class="py-6 text-center">
  
      <span id="complitedUsername" class="p-2 border border-white rounded" > {{ username }} </span>
      <span class=""> completed the game in </span>
      <span id="complitedTurns" class="" > {{ turns }} </span>
      <span class=" "> turns </span>
  
    </section>
  </section>
  

</template>