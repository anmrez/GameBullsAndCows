
<script>

export default {
  name: 'alert-red',





}

</script>

<template>
  
  <span class="flex justify-center content-center space-x-3 text-red-700 hidden rounded pointer-events-none" data-view="false"> 
    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-50"></span>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="'none'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stroke-red-700" >
      <circle cx="12" cy="12" r="10" class="fill-transparent" />
      <line stroke-width="3" x1="12" y1="8" x2="12" y2="12" />
      <line stroke-width="3" x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
    <p class="text- font-bold"> <slot></slot> </p>
  </span>

</template>