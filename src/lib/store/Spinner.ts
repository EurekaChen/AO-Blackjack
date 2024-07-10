import { writable } from 'svelte/store';

const initialSpinner = {
	isWaiting:false,
    colorClass:'info',
    text:'请稍候'   
};


function createSpinner() {
	const { subscribe, set, update } = writable(initialSpinner);
	return {
		subscribe,
		set,
		stop: () =>
			update((spinner) => {
				spinner.isWaiting = false;
				spinner.colorClass = 'primary';
				spinner.text = '请稍候';				
				return spinner;
			}),
		info: (text: string) =>
			update((spinner) => {
				spinner.isWaiting = true;
				spinner.text = text;
				spinner.colorClass="info";				
				return spinner;
			}),
		result: () =>
			update((spinner) => {
				spinner.isWaiting = true;
				spinner.text = "获取结果中";
				spinner.colorClass = 'sucess';								
				return spinner;
			})		
	};
}

export const Spinner = createSpinner();
