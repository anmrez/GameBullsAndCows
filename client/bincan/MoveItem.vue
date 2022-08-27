<script>

  export default {

    name: 'move-item',
    props:{

      hiddenNumber: {},
      number: {}

    },
    
    methods:{

      getDigit( number ){

        // console.log( number )
        let response = []
        for (let index = 0; index < number.length; index++) {

          response[index] = number[index];
          
        }

        
        return response

      },

      findBullsAndCows( number ){

        let countBulls = 0
        let countCows = 0

        console.log( ` === findBullsAndCows ===` ) 
        console.log( number ) 

        let hiddenNumber = this.hiddenNumber

        for (let hIndex = 0; hIndex < hiddenNumber.length; hIndex++) {
          
          let hDigit = hiddenNumber[hIndex];
        
          for (let nIndex = 0; nIndex < number.length; nIndex++) {

            let nDigit = number[nIndex]

            if ( hDigit === nDigit && hIndex === nIndex ) countBulls++
            if ( hDigit === nDigit && hIndex !== nIndex ) countCows++
            
          }

        }


        if ( hiddenNumber.length === countBulls ) console.log( `You win!` )


        return {
          bulls: countBulls,
          cows: countCows
        }

      },

    }

  }

</script>

<template>
    
  <div class="flex justify-center content-center space-x-4">
    <div v-for="digit in getDigit( number )" class="p-4" data-popopo>
      <span class="border border-gray-500 p-2 cursor-pointer hover:bg-sky-700"> {{ digit }}  </span>
    </div>
    <p> {{ findBullsAndCows( number ) }} </p>
  </div> 

</template>