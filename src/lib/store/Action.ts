import { writable } from 'svelte/store';

const initialAction ={
	newHand: false,
	//repeat: false,//同上
	//doubleRepeat:false //同上
	stand: false,
	doubleChip: false,
	deal: false,
	hit: false,
	clear: false,
	doubleBet: false
};

function createAction() {
	const { subscribe, set, update } = writable({ ...initialAction });

	return {
		subscribe,
		set,
		clearAll: () => update((action) =>{
			action.newHand=false;
			action.stand=false;
			action.doubleChip=false;
			action.deal=false;
			action.hit=false;
			action.clear=false;
			action.doubleBet=false;
			return action;
		 }),
		beforeDeal:()=>update((action)=>{
			action.doubleChip=true;
			action.deal=true;
			action.clear=true;
			return action;
		})
	};
	
}

export const Action = createAction();
