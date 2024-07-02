import { writable } from 'svelte/store';

const initialDealer = {   
    Balance:10000000,   
    Hand:[]  
	};
  
export const Dealer=writable(initialDealer);
