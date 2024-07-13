import { get, writable } from 'svelte/store';
import { t } from '$lib/i18n';

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
				indicator.text = get(t)('indicator.win');
				indicator.amount = amount;
				indicator.icon = '🏆';
				return indicator;
			}),
		lose: (amount: number) =>
			update((indicator) => {
				indicator.isShow = true;
				indicator.class = 'lose';
				indicator.text = get(t)('indicator.lose');
				indicator.amount = amount;
				indicator.icon = '😞';
				return indicator;
			}),
		tie: (amount: number) =>
			update((indicator) => {
				indicator.isShow = true;
				indicator.class = 'tie';
				indicator.text = get(t)('indicator.tie');
				indicator.icon = '🤝';
				indicator.amount = amount;
				return indicator;
			}),
		blackjack: (amount: number) =>
			update((indicator) => {
				indicator.isShow = true;
				indicator.class = 'win';
				indicator.text = get(t)('indicator.blackjack');
				indicator.icon = '🃏';
				indicator.amount = amount;
				return indicator;
			}),
		bust: (amount: number) =>
			update((indicator) => {
				indicator.isShow = true;
				indicator.class = 'lose';
				indicator.text = get(t)('indicator.bust');
				indicator.icon = '💥';
				indicator.amount = amount;
				return indicator;
			})
	};
}

export const Indicator = createIndicator();
