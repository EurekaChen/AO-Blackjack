import { writable } from 'svelte/store';

export const count = writable(0);

//数据结构尽量跟OA Lua保持一致
const initialPlayer = {
	//从钱包提到游戏进程(bjProcess)的EGC数量(quantity)，变成数字，随着游戏变化。
	balance: 0,

    //尽量保持OA和JS的数据结构一致。
	state: {		
		hands: [
			{ cards:[], quantity: 0 }			
		],
		//由于序数的不同，在lua要加1
		activeHandIndex: 0,
		//原为null，我觉得也可以为0，用0更简单，0表示没下保险。
		insurance: 0
		//不考虑投降 Surrendered: false,
	}
};

export const Player = writable(initialPlayer);
