<script>

  export default{

    name: 'pixel-button'

  }

</script>
<template>

  <button type="button" name="button" class='py-2 px-4 border-2 border-white rounded hover:bg-whiteOpacity-10 flex justify-center space-x-3 '> 
    <slot></slot>
  </button>

</template>