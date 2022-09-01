<script>
export default {

  name: 'interface-training'

}
</script>

<template>
  
  <section class="space-y-3">
    <h2 class="text-lg">
      - Support table 
    </h2>
    <p>
      With the help of the "Support table" you can highlight digits in several colors
    </p>
    <ul>
      <li> N - null ( transparent ) </li> 
      <li> Y - yellow ( this digit is present but in the wrong place ) </li> 
      <li> R - red ( this digit is not present ) </li> 
      <li> G - green ( this digit is present and in the right place ) </li> 
    </ul>

    <br>
    <p>
      • Left mouse button: - change the color 
    </p>
    <video src="/gif/LBM.mp4" autoplay loop class="m-auto border-4 border-white rounded" ></video>

    <br>
    <p>
      • Right mouse button: - clear the color 
    </p>
    <video src="/gif/RBM.mp4" autoplay loop class="m-auto border-4 border-white rounded" ></video>

    <br>
    <p>
      • You can also color the entire column or row
    </p>
    <video src="/gif/row.mp4" autoplay loop class="m-auto border-4 border-white rounded" ></video>
    <video src="/gif/column.mp4" autoplay loop class="m-auto border-4 border-white rounded" ></video>

    <br>
    <p>
      • You can also clear all colors in the table
    </p>
    <video src="/gif/clearAll.mp4" autoplay loop class="m-auto border-4 border-white rounded" ></video>

    <br>
    <br>
    <h2 class="text-lg"> - Turn table </h2>
    <p>
      All your moves are displayed here
    </p>
    <p>
      "support table" connected with "turn table"
    </p>

    <br>
    <p>
      • context menu: - change color
    </p>
    <video src="/gif/contextMenu.mp4" autoplay loop class="m-auto border-4 border-white rounded" ></video>

    <br>
  </section>

</template>