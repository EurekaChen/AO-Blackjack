import { Action } from "$lib/store/Action";

import { Player } from "$lib/store/Player";
import type { AoPlayer } from "$lib/type";

import { get } from 'svelte/store';
import { showResult } from "./showResult";


export function stand(aoPlayer:AoPlayer) {
    //两种情况，一种是发下一手牌，一种是庄家发到牌
    if (aoPlayer.state.activeHandIndex > 1) {
        //开始下一手牌		
        if(aoPlayer.state.dealerCards.length>1){
            //庄家发牌，牌局结束
            showResult(aoPlayer);
            get(Action).newHand=true;
            get(Player).inGame=false;
        }
        else{
            //开始下一手
            Action.afterDeal(true);
        }
    } else {
        //牌局结束
        showResult(aoPlayer);

        get(Action).newHand = true;
        get(Player).inGame = false;
    }

    //获取状态，如果之前获取，会让showResult的balance比较出错。
    Player.getState(aoPlayer);
}
