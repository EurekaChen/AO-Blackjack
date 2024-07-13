import { writable } from 'svelte/store';

const initialWaiting = {
	isWaiting:false,
    alertClass:'info',
    waitingText:'⏳...',
    confirm:false
};

export const Waiting = writable(initialWaiting);