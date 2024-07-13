import { Action } from "$lib/store/Action";

import { Player } from "$lib/store/Player";
import type { AoPlayer } from "$lib/type";

import { get } from 'svelte/store';
import { showResult } from "./showResult";


export function hit(aoPlayer:AoPlayer) {
    if (aoPlayer.state.dealerCards.length > 1) {
        //给庄家发牌，说明牌局结束了。       
        showResult(aoPlayer);
        Player.getState(aoPlayer);
        get(Action).newHand = true;
        get(Player).inGame = false;
    } else {
        Player.getState(aoPlayer);
        Action.afterDeal(false);
    }
}

