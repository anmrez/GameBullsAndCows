<script>

export default {

  name: 'alert-red',

}

</script>

<template>
  
  <span class="flex justify-center content-center px-4 bg-redOpacity border border-red-500 rounded hidden pointer-events-none" data-view="false"> 
    <span class="absolute bg-redOpacity border border-red-500 rounded"></span>
    <p class="text- font-bold"> <slot></slot> </p>
  </span>

</template>