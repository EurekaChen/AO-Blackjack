import { Action } from '$lib/store/Action';

import { Player } from '$lib/store/Player';
import type { AoPlayer } from '$lib/type';

import { get } from 'svelte/store';
import { showResult } from './showResult';
import { log } from '$lib/store/Debug';

export function doubleBet(aoPlayer: AoPlayer) {
	log('加倍后aoPlayer:', aoPlayer);
	if (aoPlayer.state.activeHandIndex == 2) {
		//第二手牌加倍后装将直接庄家发牌并结束牌局
		Player.getState(aoPlayer);
		showResult(aoPlayer);
		//动画说明:因为输赢小框盖注了筹码，故不去实现收付筹码动画。

		//此句不会引起更新：
		//get(Action).newHand = true;
		const currentAction = get(Action);
		currentAction.newHand = true;
		Action.set(currentAction);

		get(Player).inGame=false;
		
	} else {
		//第一手牌加倍
		if (aoPlayer.state.hands.length > 1) {
			//如果有两手，则转到第二手开始要牌
			Action.afterDeal(true);
		} else {
			//第一手牌加倍后将停牌，庄家发牌
			if (aoPlayer.state.dealerCards.length > 1) {
				//庄家发牌了，说明结束了，加倍不会有黑杰克
				showResult(aoPlayer);
				//动画说明:因为输赢小框盖注了筹码，故不去实现收付筹码动画。

				//此句不会引起更新
				//et(Action).newHand = true;
				const currentAction = get(Action);
				currentAction.newHand = true;
				Action.set(currentAction);

				get(Player).inGame = false;
			}
		}
		Player.getState(aoPlayer);
	}
}
