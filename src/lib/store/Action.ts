import { writable } from 'svelte/store';

const initialAction = {
	stand:false,
	doubleChip: false,
	deal: false,
	hit: false,
	clear:false,
	doubleBet:false
};

export const Action = writable(initialAction);
