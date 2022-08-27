<script>
  export default {

    name: 'backgraund-space',
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
          img.style.transform = `rotate( ${ this.generateRotate() }deg) scale( ${ this.generateScale() } )`
          backgraund.append( img )

        }

      },

      generateScale(){

        let random = Math.random() * 2
        if ( random > 1.5 || random < 0.5 ) return this.generateScale()
        return random

      },

      generateRotate(){

        let random = Math.floor( Math.random() * 100 )
        if ( random > 90 ) return 45 
        return 0

      },

      randomStar(){

        let star = Math.floor( Math.random() * 100 )
        
        let returnValue = 1
        if ( star > 30 ) returnValue = 1
        if ( star <= 30 && star > 15 ) returnValue = 2
        if ( star <= 15 && star > 5 ) returnValue = 3
        if ( star <= 5 && star > 0 ) returnValue = 4
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

      let numberStars = 95
      if ( document.body.clientWidth < 640 ) numberStars = 10
      this.generateStars( numberStars )

    },
  }

</script>

<template>
  
  <section id="backgraundSpace" class="w-full h-[100vh] absolute top-0 left-0 pointer-events-none">

    <img src="/backgraund/moon.svg" alt="" class="w-[100px] top-[5%] md:top-[25%] left-[10%] md:left-[35%] opacity-60 md:opacity-95 absolute">

  </section>

</template>