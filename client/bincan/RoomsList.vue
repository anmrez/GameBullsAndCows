<script>

export default {

  name: 'rooms-list'


}


</script>

<template>
  
  <section class="w-[90%]  translate-y-[0%] top-[5%] translate-x-[-50%] left-[50%] absolute">


    <table class="min-w-full rounded border-2 border-white  text-white">


      <thead class="border-b hover:bg-whiteOpacity-10">
        <tr>
          <th scope="col" class="text-sm text-center px-6 py-4 text-left">
            #
          </th>
          <th scope="col" class="text-sm text-center px-6 py-4 text-left">
            Author
          </th>
          <th scope="col" class="text-sm  text-center px-6 py-4 text-left">
            Difficylty
          </th>
          <th scope="col" class="text-sm text-center px-6 py-4 text-left">
            Password
          </th>
        </tr>
      </thead>


      <tbody>
        <tr class="border-b bg-blackOpacity-50 hover:bg-whiteOpacity-10">
          <td class="text-sm text-center px-6 py-4 ">
            1
          </td>
          <td class="text-sm text-center px-6 py-4">
            Mark
          </td>
          <td class="text-sm text-center px-6 py-4">
            Otto
          </td>
          <td class="text-sm text-center px-6 py-4">
            false
          </td>
        </tr>

        <tr class="border-b bg-blackOpacity-50 hover:bg-whiteOpacity-10">
          <td class="text-sm text-center px-6 py-4">
            2
          </td>
          <td class="text-sm text-center px-6 py-4">
            Jacob
          </td>
          <td class="text-sm text-center px-6 py-4">
            Thornton
          </td>
          <td class="text-sm text-center px-6 py-4">
            false
          </td>
        </tr>

      </tbody>
    </table>


  </section>


</template>