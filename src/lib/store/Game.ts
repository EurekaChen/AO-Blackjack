import { writable } from 'svelte/store';

enum State{
	NewHand,
	Deal,
	Finish
}

const initialGame = {
    Busy: false,
		State: 0,
		//ChipAmount: [1, 5, 10, 25, 50, 100, 500, 2500, 10000, 50000, 100000, 500000, 2500000, 10000000],
		
		ChipOffset: 6,
		//ChipName: ['5', '25', '100', '500', '1000', '5000', '25000']
	};
  

//const {subscribe,set,update}=writable(initialState);

export const Game=writable(initialGame);

