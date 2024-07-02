import { writable } from 'svelte/store';


const initialBet = {
    bet:0
}
  
export const Bet=writable(initialBet);

