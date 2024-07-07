import { writable } from 'svelte/store';

const initialWinLose = {
	isShow:false,
    class:'tie',
    text:'',
    amount:0,
    icon:'🂠'  
   
};

export const WinLose = writable(initialWinLose);