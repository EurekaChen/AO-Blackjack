import { writable } from 'svelte/store';

const initialWaiting = {
	isWaiting:false,
    alertClass:'info',
    waitingText:'数据正在请求中，请稍候...',
    confirm:false
};

export const Waiting = writable(initialWaiting);