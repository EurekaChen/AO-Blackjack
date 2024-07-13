import { Action } from "$lib/store/Action";
import { Player } from "$lib/store/Player";
import type { AoPlayer } from "$lib/type";
import { get } from 'svelte/store';
import { isSamePoint } from "./evaluate";


export function restore(aoPlayer:AoPlayer ) {	
    Player.getState(aoPlayer);
    if(aoPlayer.state.activeHandIndex==2){
        //玩第二手牌
        if(aoPlayer.state.hands[1].cards.length==2){				
            //可加倍
            Action.afterDeal(true)
        }
        else{
            //不可加倍
            Action.afterDeal(false)
        }			
    }
    else{
        //玩第一手牌
        if(aoPlayer.state.insurance==0 && aoPlayer.state.dealerCards[0].charAt(0) == 'A')
        {
           get(Action).insurance=true;
        }

        if(aoPlayer.state.hands[0].cards.length==2){
            //可加倍
            Action.afterDeal(true)	
            //可拆牌							
            if(isSamePoint(aoPlayer.state.hands[0].cards)){
                get(Action).split=true;
            }
        }			
        else{
            //不可加倍
            Action.afterDeal(false)
        }
    }	
}