import { writable } from 'svelte/store';

const initialDealer = {   
    Balance:10000000,   
    Hand:["7s","?"]  
	};
  
export const Player=writable(initialDealer);
