
<script>

export default {

  name: 'rules-game'

}

</script>
<template>
  

  <section>
    <p  >
      The game is played in turns by two opponents who aim to decipher the other's secret code by trial and error. 
    </p>
    <p  >
      Each player write a 4-digit secret number. The digits must be all different. Then, in turn, the players try to guess their opponent's number who gives the number of matches. The digits of the number guessed also must all be different. If the matching digits are in their right positions, they are "bulls", if in different positions, they are "cows".
    </p>
    <ul class="" >
        Example: 
        <li class="ml-3"  > Secret number: 4271 </li>
        <li class="ml-3"  > Opponent's try: 1234 </li>
        <li class="ml-3"  > Answer: 1 bull and 2 cows. (The bull is 
        <span class="text-greenOpacity"  >
          "2"
        </span>
        , the cows are 
        <span class="text-yellowOpacity"  >
          "4"
        </span>
        and 
        <span class="text-yellowOpacity"  >
          "1"
        </span>
          .) </li>
    </ul>
    <p >
      The first player to reveal the other's secret number wins the game.
    </p>
  </section>

</template>