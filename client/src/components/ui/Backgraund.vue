<script>
  export default {

    name: 'backgraund-space',
    data(){

      return {


      }

    },

    methods: {

      generateStars: function ( numberStars ){
        
        let backgraund = document.querySelector( '#backgraundSpace' )

        for ( let index = 0; index < numberStars; index++) {
          
          let X = this.generateX()
          let Y = this.generateY()

          let img = document.createElement( 'img' )
          let numberStar = this.randomStar()
          img.src = `/backgraund/star${ numberStar }.svg`
          img.alt = `star${ numberStar }`
          img.style.width = '30px'
          img.style.position = 'absolute'
          img.style.opacity = this.generateOpacity()
          // img.dataset.star = ''
          img.style.left = X + '%'
          img.style.top = Y + '%'
          img.style.transform = `rotate( ${ this.generateRotate() }deg)`
          backgraund.append( img )

        }

      },

      generateRotate(){

        let random = Math.floor( Math.random() * 100 )
        if ( random > 90 ) return 45 
        return 0

      },

      randomStar(){

        let star = Math.floor( Math.random() * 100 )
        
        let returnValue = 1
        if ( star > 40 ) returnValue = 1
        if ( star <= 40 && star > 20 ) returnValue = 2
        if ( star <= 20 && star > 10 ) returnValue = 3
        if ( star <= 10 && star > 0 ) returnValue = 4
        return returnValue

      },

      generateOpacity(){

        let opacity = Math.random()
        if ( opacity > 0.7 || opacity < 0.1 ) return this.generateOpacity()
        return opacity

      },

      generateX(){

        let randomX = Math.random() * 100
        if ( randomX > 95 ) return this.generateX()
        return randomX

      },

      generateY(){

        let randomY = Math.random() * 100
        if ( randomY > 95 ) return this.generateY()
        return randomY

      },

    },

    mounted(){

      let numberStars = 65
      if ( document.body.clientWidth < 640 ) numberStars = 10
      this.generateStars( numberStars )

    },
  }

</script>

<template>
  
  <section id="backgraundSpace" class="w-full h-[100vh] absolute top-0 left-0 pointer-events-none">

    <img src="/backgraund/moon.svg" alt="" class="w-[100px] top-[5%] md:top-[25%] left-[10%] md:left-[35%] opacity-95 absolute">

    <!-- <img src="\src\assets\backgraund\star1.svg" alt="" class="w-[30px] top-[40px] left-[60px] absolute"> -->
    <!-- <img src="\src\assets\backgraund\star2.svg" alt="" class="w-[30px] top-[40px] left-[120px] absolute">
    <img src="\src\assets\backgraund\star3.svg" alt="" class="w-[30px] top-[40px] left-[180px] absolute"> -->

  </section>

</template>