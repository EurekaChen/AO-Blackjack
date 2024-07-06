import { writable } from 'svelte/store';

const initialSpinner = {
	isWaiting:true,
    colorClass:'info',
    text:'请稍候',    
};

export const Spinner = writable(initialSpinner);