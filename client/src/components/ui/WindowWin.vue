
<script>

export default {

  name: 'modal-win',
  props:{

    turn: {
      require: true
    },
    time: {
      require: true
    },
    difficulty: {
      require: true
    }

  }


}
</script>

<template>
  
  <section id="modalWindowWin" class="w-full h-[100vh] z-50 bg-blackOpacity-25 top-0 left-0 absolute hidden" >
    <section class="w-[50%] py-4 px-14 space-y-6 bg-blackOpacity-50 border border-white rounded translate-x-[-50%] translate-y-[-50%] left-[50%] top-[50%] absolute" >
      <h1 class="w-full text-xl text-center"> You Win! </h1>
      <section>
        <ul class="flex justify-between space-x-3 hover:bg-whiteOpacity-25 border-b border-white" >
          <li class="p-2 "> Difficulty: </li>
          <li class="p-2 rounded flex space-x-3" > 
            <p> {{ this.difficulty }} digits </p>
          </li>
        </ul>
        <ul class="flex justify-between space-x-3 hover:bg-whiteOpacity-25 border-b border-white" >
          <li class="p-2 "> Turns: </li>
          <li class="p-2 rounded flex space-x-3" > 
            <p> {{ this.turn }} </p>
          </li>
        </ul>
        <ul class="flex justify-between space-x-3 hover:bg-whiteOpacity-25 border-b border-white" >
          <li class="p-2 "> Time: </li>
          <li class="p-2 rounded flex space-x-3" > 
            <p> {{ this.time }} </p>
            <p> sec </p>
          </li>
        </ul>
      </section>
      <section class="flex place-content-center space-x-3" >
        <!-- <button class="py-2 px-6 rounded hover:bg-whiteOpacity-25" > Restart </button> -->
        <router-link to="/" class="py-3 px-4 border-2 border-white rounded hover:bg-whiteOpacity-10" >
          <span>
            Exit to menu 
          </span>
        </router-link>
      </section>
    </section>

  </section>

</template>