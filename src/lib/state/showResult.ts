import { Indicator } from '$lib/store/Indicator';
import { Player } from '$lib/store/Player';
import type { AoPlayer } from '$lib/type';
import { get } from 'svelte/store';
import { isBlackjack, isBust } from './evaluate';

export function showResult(aoPlayer: AoPlayer) {

	const backBalance = aoPlayer.balance - get(Player).balance;
	
	if (isBlackjack(aoPlayer.state.hands[0].cards)) {
		//起手21点
		Indicator.blackjack(backBalance);
	} else if (isBust(aoPlayer.state.hands[0].cards) && aoPlayer.state.hands.length==1) {
		//未拆牌，第一手爆牌了
		Indicator.bust(backBalance);
	} else {
		// 总下注
		const totalBet =
			get(Player).state.hands[0].amount +
			get(Player).state.hands[1].amount +
			get(Player).state.insurance;

		if (backBalance > totalBet) {
			Indicator.win(backBalance);
		} else if (backBalance == totalBet) {
			Indicator.tie(backBalance);
		} else {
			Indicator.lose(backBalance - totalBet);
		}
	}

	setTimeout(() => {
		get(Indicator).isShow = false;
	}, 3000);
}
