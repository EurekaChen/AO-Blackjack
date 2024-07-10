import { writable } from 'svelte/store';

//数据结构尽量跟OA Lua保持一致
const initialPlayer = {
	//注意从钱包提到游戏进程(bjProcess)的EGC数量(quantity)不是balance(amount)！
	name: '',
	balance: 0,
	//state在oa中可能为null（未产生牌局），而在js中，因为有下注amout，所以不能通过null判断state状态
	//尽量保持OA和JS的数据结构一致。
	state: {
		dealerCards: [],
		hands: [
			{ cards: [], amount: 0 },
			{ cards: [], amount: 0 }
		],
		//由于序数的不同，在lua要加1
		activeHandIndex: 0,
		//原为null，我觉得也可以为0，用0更简单，0表示没下保险。
		insurance: 0,
		//不考虑投降 Surrendered: false,
		//供repeat使用
		originalAmount: 0
	},
	//在OA中游戏结束后会删除state
	//在Svelte中，不删除State，用inGame示牌局是否结束，可以重新开始。
	//例如一局结束可以一直牌面显示
	inGame: false
};

function createPlayer() {
	const { subscribe, set, update } = writable(initialPlayer);
	return {
		subscribe,
		set,
		clearState: () =>
			update((player) => {
				player.state.dealerCards.length = 0;
				player.state.hands[0].cards.length = 0;
				player.state.hands[1].cards.length = 0;
				//一般下面两个在动作中已经清0
				player.state.hands[0].amount = 0;
				player.state.hands[1].amount = 0;
				player.state.insurance = 0;
				player.state.originalAmount = 0;
				player.state.activeHandIndex = 0;
				player.inGame = false;
				return player;
			}),
		getState: (state) =>
			update((player) => {
				player.balance = state.balance;
				player.state.activeHandIndex = state.activeHandIndex - 1;
				player.state.dealerCards = state.dealerCards;
				player.state.insurance = state.insurance;

				player.state.hands[0].cards = state.hands[0].cards;
				player.state.hands[0].amount = state.hands[0].amount;
				if (state.hands.length > 1) {
					player.state.hands[1].cards = state.hands[1].cards;
					player.state.hands[1].amount = state.hands[1].amount;
				}
				return player;
			})
	};
}

export const Player = createPlayer();
