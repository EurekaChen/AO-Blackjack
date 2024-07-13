import { Action } from "$lib/store/Action";

import { Player } from "$lib/store/Player";
import type { AoPlayer } from "$lib/type";

import { get } from 'svelte/store';
import { showResult } from "./showResult";


export function doubleBet(aoPlayer: AoPlayer) {
    if (aoPlayer.state.activeHandIndex == 2) {
        //到第二手牌了
        get(Player).balance = get(Player).balance - get(Player).state.originalAmount;
        get(Player).state.hands[1].amount += get(Player).state.originalAmount;

        if (aoPlayer.state.hands[1].amount == 0) {
            //第二手结算，说明结束了，玩家会发牌。
            //总共：
            showResult(aoPlayer);
            get(Action).newHand = true;
        } else {
            //不会到这里
            throw '第二手加倍后应该停牌重新开始';
        }
    } else {
        //第一手牌加倍，加倍后停牌
        get(Player).balance = get(Player).balance - get(Player).state.originalAmount;
        get(Player).state.hands[0].amount += get(Player).state.originalAmount;

        if (aoPlayer.state.hands.length > 1) {
            //转到第二手：
            Action.afterDeal(true);
        } else {
            if (aoPlayer.state.dealerCards.length > 1) {
                //庄家发牌了，说明结束了，加倍不会有黑杰克
                showResult(aoPlayer);
                get(Action).newHand = true;
                get(Player).inGame = false;
            }
        }
        Player.getState(aoPlayer);
    }
}
