<script>

export default {

  name: 'multiplayer-login',
  methods:{

    checkUsername(){

      let cookie = document.cookie

      if ( cookie !== '' ) {

        let username
        let arrCookie = cookie.split('; ')
        arrCookie.forEach( item => {

          let index = item.indexOf( 'username=' )
          if ( index >= 0 ) username = item.replace( 'username=', '' );

        })

        let input = document.querySelector( '#inputUsername' )
        try {
          if ( username.length >= 4 && username.length <= 20 ) input.value = username
        } catch (error) {}

      }

      this.checkLength()

    },

    login(){

      let input = document.querySelector( '#inputUsername' )
      // let username = input.value
      this.checkLengthUsername()

    },

    checkLengthUsername(){

      let input = document.querySelector( '#inputUsername' )
      let username = input.value
      if ( username.length >= 4 && username.length <= 20 ) {

        document.cookie = `username=${ username }; expires=Tue, 01 Jan 2040 00:00:00 GMT; samesite=strict`
        this.$emit( 'LoginStatus', true )

      } else {

        this.showAlert()

      }

    },

    checkLength(){

      let input = document.querySelector( '#inputUsername' )
      let outLength = document.querySelector( '#usernameLength' )
      outLength.innerHTML = input.value.length

    },

    showAlert(){

      let alertInputUsername = document.querySelector( '#alertInputUsername' )
      let usernameInstruction = document.querySelector( '#usernameInstruction' )

      let left = usernameInstruction.offsetLeft
      alertInputUsername.style.left = left - 35 + 'px'
      
      // let hidden = function (){
      //   alertInputUsername.classList.add( 'hidden' )
      // }

      // let rimerID = setTimeout( hidden, 4000 )
      alertInputUsername.classList.remove( 'hidden' )
      

    }

  },
  mounted(){

    this.checkUsername()

    let inputUsername = document.querySelector( '#inputUsername' )
    inputUsername.focus()

  }


}

</script>

<template>

  <section class="space-y-5 translate-y-[-50%] top-[50%] translate-x-[-50%] left-[50%] absolute ">

    <h1 class="text-2xl text-center"> Multiplayer </h1>
    <h2 class="text-lg text-center"> Your username </h2>
    <section class="flex justify-center text-xs text-center relative">
      <span id="alertInputUsername" class="w-5 mr-5 hidden block bg-redOpacity animate-ping border border-red-500 rounded text-center duration-500 absolute"> ! </span>
      <span id="usernameInstruction" > ( min: 4, max: 20, length: </span>  
      <span id="usernameLength"> 0 </span>  
      <span> ) </span>
    </section>
    <section> 
      <input @input="checkLength" id="inputUsername" type="text" class="w-full h-full bg-whiteOpacity-10 text-4xl text-center rounded outline outline-2 outline-transparent outline-offset-1 focus:outline-white"> 
    </section>

    <section class="flex space-x-3 justify-center" >
      <back-to-menu class=""></back-to-menu>
      <pixel-button @click="login" class="text-base" > Next </pixel-button>
    </section>


  </section>

</template>