import { writable } from 'svelte/store';

const initialWinLose = {
	isShow:true,
    class:'lose',
    text:'',
    amount:0  
   
};

export const WinLose = writable(initialWinLose);