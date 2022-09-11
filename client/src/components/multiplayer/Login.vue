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

      console.log( `showAlert` )
      let alertInputUsername = document.querySelector( '#alertInputUsername' )

      let clasess = [
        'bg-redOpacity',
        'border',
        'border-red-500',
        'rounded',
      ]
      clasess.forEach( item => {
        alertInputUsername.classList.add( item )
      })

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

  <section class="w-[90%] md:w-auto space-y-5 translate-y-[-50%] top-[50%] translate-x-[-50%] left-[50%] absolute ">

    <h1 class="text-2xl text-center"> Multiplayer </h1>
    <h2 class="text-lg text-center"> Your username </h2>
    <section id="alertInputUsername" class="p-2 flex justify-center text-xs text-center relative ">
      <span id="usernameInstruction" > ( min: 4, max: 20, length:  </span>  
      <span id="usernameLength" class="ml-2" > 0 </span>  
      <span class="ml-2" > ) </span>
    </section>
    <section> 
      <input @input="checkLength" id="inputUsername" type="text" class="w-full h-full bg-whiteOpacity-10 text-4xl text-center rounded outline outline-2 outline-transparent outline-offset-1 focus:outline-white"> 
    </section>

    <section class="w-full md:w-auto flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-3 justify-center" >
      <back-to-menu class="md:w-1/2"></back-to-menu>
      <pixel-button @click="login" class="md:w-1/2 text-base" > Next </pixel-button>
    </section>


  </section>

</template>