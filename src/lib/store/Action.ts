import { writable } from 'svelte/store';

// const initialAction = Object.freeze({
// 	newHand: false,
// 	repeat: false,
// 	stand: false,
// 	doubleChip: false,
// 	deal: false,
// 	hit: false,
// 	clear: false,
// 	doubleBet: false
// });

const initialAction ={
	newHand: false,
	repeat: false,
	stand: false,
	doubleChip: false,
	deal: false,
	hit: false,
	clear: false,
	doubleBet: false
};

function createAction() {
	const { subscribe, set, update } = writable({ ...initialAction });

	// return {
	// 	subscribe,
	// 	set,
	// 	clearAll: () => update((action) =>{
	// 		action.stand=false;
	// 		action.doubleChip=false;
	// 		action.deal=false;
	// 		action.hit=false;
	// 		action.clear=false;
	// 		action.doubleBet=false;
	// 		return action;
	// 	 })
	// };

	return {
		subscribe,
		set,
		update,
		//clearAll: () => set(initialAction)
		clearAll: () => {
			console.log('init:', { ...initialAction });
			set({ ...initialAction });
		}
	};
}

export const Action = createAction();
