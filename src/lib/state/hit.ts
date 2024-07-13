import { Action } from '$lib/store/Action';

import { Player } from '$lib/store/Player';
import type { AoPlayer } from '$lib/type';

import { get } from 'svelte/store';
import { showResult } from './showResult';
import { log } from '$lib/store/Debug';

export function hit(aoPlayer: AoPlayer) {
	log('要牌后aoPlayer:', aoPlayer);
	if (aoPlayer.state.dealerCards.length > 1) {
		//给庄家发牌，说明牌局结束了。
		showResult(aoPlayer);
		Player.getState(aoPlayer);

		//get(Action).newHand = true;
		const currentAction = get(Action);
		currentAction.newHand = true;
		Action.set(currentAction);
		log('newHand:', get(Action).newHand);

		get(Player).inGame = false;
	} else {
		Player.getState(aoPlayer);
		Action.afterDeal(false);
	}
}
