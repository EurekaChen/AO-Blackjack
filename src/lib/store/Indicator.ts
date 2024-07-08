import { writable } from 'svelte/store';

const initialIndicator = {
	isShow: false,
	class: 'tie',
	text: '',
	amount: 0,
	icon: '🂠'
};

function createIndicator() {
	const { subscribe, set, update } = writable(initialIndicator);
	return {
		subscribe,
		set,
		win: (amount: number) =>
			update((indicator) => {
				indicator.isShow = true;
				indicator.class = 'win';
				indicator.text = '您赢了';
				indicator.amount = amount;
				indicator.icon = '🏆';
				return indicator;
			}),
		lose: (amount: number) =>
			update((indicator) => {
				indicator.isShow = true;
				indicator.class = 'lose';
				indicator.text = '您输了';
				indicator.amount = amount;
				indicator.icon = '😞';
				return indicator;
			}),
		tie: (amount: number) =>
			update((indicator) => {
				indicator.isShow = true;
				indicator.class = 'tie';
				indicator.text = '平手';
				indicator.icon = '🤝';
				indicator.amount = amount;
				return indicator;
			}),
		blackjack: (amount: number) =>
			update((indicator) => {
				indicator.isShow = true;
				indicator.class = 'win';
				indicator.text = '黑杰克';
				indicator.icon = '🃏';
				indicator.amount = amount;
				return indicator;
			})
	};
}

export const Indicator = createIndicator();
