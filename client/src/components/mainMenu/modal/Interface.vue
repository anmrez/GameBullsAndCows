<script>
export default {

  name: 'interface-training'

}
</script>

<template>
  
  <section class="space-y-3">
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
    <video src="/gif/support_row.mp4" autoplay loop class="border-4 border-white rounded" ></video>
    <video src="/gif/support_column.mp4" autoplay loop class="border-4 border-white rounded" ></video>
    <p>
      clear all highlight in table
    </p>
    <video src="/gif/clear.mp4" autoplay loop class="border-4 border-white rounded" ></video>

    <br>
  </section>

</template>