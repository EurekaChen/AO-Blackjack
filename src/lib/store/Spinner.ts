import { writable } from 'svelte/store';

const initialSpinner = {
	isWaiting:false,
    colorClass:'info',
    text:'请稍候',   
    defaultText:'请稍候' 
};

export const Spinner = writable(initialSpinner);