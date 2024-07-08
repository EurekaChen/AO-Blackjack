import { writable } from 'svelte/store';
export const ChipRank = writable([
	0.01, 0.05, 0.1, 0.25, 0.5, 1, 5, 25, 100, 500, 1000, 5000, 25000, 100000
]);