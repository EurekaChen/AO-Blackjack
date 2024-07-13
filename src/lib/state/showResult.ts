import { Indicator } from '$lib/store/Indicator';
import { Player } from '$lib/store/Player';
import type { AoPlayer } from '$lib/type';
import { get } from 'svelte/store';
import { isBlackjack, isBust } from './evaluate';

export function showResult(aoPlayer: AoPlayer) {
	const backBalance = aoPlayer.balance - get(Player).balance;

	if (isBlackjack(aoPlayer.state.hands[0].cards)) {
		Indicator.blackjack(backBalance);
	} else if (isBust(aoPlayer.state.hands[0].cards)) {
		Indicator.bust(backBalance);
	} else {
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


// hit里的：
// function showResult(aoPlayer: AoPlayer) {
//     const backBalance = aoPlayer.balance - $Player.balance;		

//     if (isBlackjack(aoPlayer.state.hands[0].cards)) {
//         Indicator.blackjack(backBalance);
//     } else if (isBust(aoPlayer.state.hands[0].cards)) {
//         Indicator.bust(backBalance);
//     } else {
//         const totalBet =
//             $Player.state.hands[0].amount + $Player.state.hands[1].amount + $Player.state.insurance;
//         if (backBalance > totalBet) {
//             Indicator.win(backBalance);
//         } else if (backBalance == totalBet) {
//             Indicator.tie(backBalance);
//         } else {
//             Indicator.lose(backBalance - totalBet);
//         }
//     }
//     setTimeout(() => {
//         $Indicator.isShow = false;
//     }, 3000);
// }

// stand：


// function showResult(aoPlayer: AoPlayer) {
// 	let totalBetAmount = 0;
// 	$Player.state.hands.forEach((hand) => {
// 		totalBetAmount += hand.amount;
// 	});

// 	let backBalance = aoPlayer.balance - $Player.balance;

// 	if (backBalance > totalBetAmount) {
// 		Indicator.win(backBalance);
// 	} else if (backBalance == totalBetAmount) {
// 		Indicator.tie(backBalance);
// 	} else {
// 		Indicator.lose(backBalance - totalBetAmount);
// 	}

// 	setTimeout(() => {
// 		$Indicator.isShow = false;
// 	}, 3000);
// }