import { get, writable } from 'svelte/store';
import { t } from '$lib/i18n';

const initialSpinner = {
	isWaiting:false,
    colorClass:'info',
    text:get(t)('action.waiting')		   
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
				spinner.text = get(t)('action.waiting');				
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
				spinner.text = get(t)('action.querying');			
				spinner.colorClass = 'success';								
				return spinner;
			})		
	};
}

export const Spinner = createSpinner();
