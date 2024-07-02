import { writable } from 'svelte/store';

const initialAction = {
	double: false,
	deal: false,
	hit: false,
	clear:false
};

export const Action = writable(initialAction);
