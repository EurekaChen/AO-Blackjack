import { Action } from "$lib/store/Action";
import { Indicator } from "$lib/store/Indicator";
import { Player } from "$lib/store/Player";
import type { AoPlayer } from "$lib/type";
import { isSamePoint } from "./evaluate";
import { get } from 'svelte/store';


export function deal(aoPlayer:AoPlayer) {
    if (aoPlayer.balance > get(Player).balance) {
        //发牌动作返回余额有多，说明牌局已经结束，玩家拿到了黑杰克。
        Indicator.blackjack(aoPlayer.balance - get(Player).balance);
        Player.getState(aoPlayer);
        setTimeout(() => {
            get(Indicator).isShow = false;
        }, 4000);

        //可以开始新游戏
        get(Player).inGame = false;
        get(Action).newHand = true;
    } else {
        //发到两张牌
        Player.getState(aoPlayer);

        if (isSamePoint(aoPlayer.state.hands[0].cards)) {
            //可拆牌
           get(Action).split = true;
        }

        Action.afterDeal(true);
        get(Player).inGame = true;
    }

    //保险为另外加的赌注
    if (aoPlayer.state.dealerCards[0].includes('A')) {
        //提示保险
        get(Action).insurance = true;
    }
}
