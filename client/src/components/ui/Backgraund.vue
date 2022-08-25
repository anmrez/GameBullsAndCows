<script>
  export default {

    name: 'backgraund-space',
    data(){

      return {

        // numberStars: 45,
        coordinates: []

      }

    },

    methods: {

      generateStars: function ( numberStars ){
        
        let backgraund = document.querySelector( '#backgraundSpace' )

        for ( let index = 0; index < numberStars; index++) {
          
          let X = this.generateX()
          let Y = this.generateY()
          // let randomCoordinate = this.createUniqueCoordinate()
          // let X = randomCoordinate[0]
          // let Y = randomCoordinate[1]

          let img = document.createElement( 'img' )
          img.src = `/src/assets/backgraund/star${ this.randomStar() }.svg`
          img.alt = `star${ this.randomStar() }`
          img.style.width = '30px'
          img.style.position = 'absolute'
          img.style.opacity = this.generateOpacity()
          img.dataset.star = ''
          // img.style.transform = `rotate(${ this.generateRotate() }deg)`
          img.style.left = X + '%'
          img.style.top = Y + '%'

          backgraund.append( img )

        }

      },

      // createUniqueCoordinate(){

      //   let coordinate = []

      //   let randomX = this.generateX()
      //   let randomY = this.generateY() 

      //   coordinate.push( randomX )
      //   coordinate.push( randomY )

      //   console.log( `======` )
      //   let allStar = document.querySelectorAll( '[data-star]' )
      //   console.log( allStar )
      //   // for (let index = 0; index < this.coordinates.length; index++) {

          
      //   // }

      //   return coordinate

      // },

      generateRotate(){

        let rotate = Math.floor( Math.random() * 30 )
        if ( rotate > 20 ) return this.generateRotate()
        return rotate

      },

      randomStar(){

        let star = Math.floor( Math.random() * 10 )
        if ( star > 3 || star < 1 ) return this.randomStar()
        return star

      },

      generateOpacity(){

        let opacity = Math.random()
        if ( opacity > 0.7 || opacity < 0.1 ) return this.generateOpacity()
        return opacity

      },

      generateX(){

        // let randomX = Math.random() * document.body.clientWidth
        // if ( randomX > document.body.clientWidth - 75 ) return this.generateX()
        let randomX = Math.random() * 100
        if ( randomX > 95 ) return this.generateX()
        return randomX

      },

      generateY(){

        // let randomY = Math.random() * document.body.clientHeight
        // if ( randomY > document.body.clientHeight - 75 ) return this.generateY()
        let randomY = Math.random() * 100
        if ( randomY > 95 ) return this.generateY()
        return randomY

      },

    },

    mounted(){

      let numberStars = 45
      if ( document.body.clientWidth < 640 ) numberStars = 10
      this.generateStars( numberStars )

    },
  }

</script>

<template>
  
  <section id="backgraundSpace" class="w-full h-[100vh] absolute top-0 left-0 pointer-events-none">

    <img src="\src\assets\backgraund\moon.svg" alt="" class="w-[100px] top-[5%] md:top-[25%] left-[10%] md:left-[35%] opacity-95 absolute">

    <!-- <img src="\src\assets\backgraund\star1.svg" alt="" class="w-[30px] top-[40px] left-[60px] absolute"> -->
    <!-- <img src="\src\assets\backgraund\star2.svg" alt="" class="w-[30px] top-[40px] left-[120px] absolute">
    <img src="\src\assets\backgraund\star3.svg" alt="" class="w-[30px] top-[40px] left-[180px] absolute"> -->

  </section>

</template>