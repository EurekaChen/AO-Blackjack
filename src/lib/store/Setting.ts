import { writable } from 'svelte/store';
export const ChipQuantity = writable([
	0.01, 0.05, 0.1, 0.25, 0.5, 1, 5, 25, 100, 500, 1000, 5000, 25000, 100000
]);


// export const ChipRank = writable([5, 25, 100, 500, 1000, 5000, 25000]);
// export const ChipQuantity = writable([
// 	1, 5, 10, 25, 50, 100, 500, 2500, 10000, 50000, 100000, 500000, 2500000, 10000000
// ]);

// export const ChipQuantityReverse = writable([
// 	10000000, 2500000, 500000, 100000, 50000, 10000, 2500, 500, 100, 50, 25, 10, 5, 1
// ]);
