//import { Player } from '$lib/store/Player';

//还原游戏
// function restore(oa) {
//     console.log('oaState:', oaState);	
//     Player.state.activeHandIndex = oaState.activeHandIndex - 1;	

//     for (let card of oaState.hands[0].cards) {
//         $Player.state.hands[0].cards.push(card);
//     }
//     $Player.state.hands[0].amount = oaState.hands[0].amount;

//     if (oaState.hands.length > 1) {
//         //有两手：
//         //恢复第二手
//         for (let card of oaState.hands[1].cards) {
//             $Player.state.hands[1].cards.push(card);
//         }
//         $Player.state.hands[1].amount = oaState.hands[1].amount;

        
//         if(oaState.activeHandIndex==0){
//             //两手21，牌局结束：
//             $Player.inGame=false;
//             $Player.state.originalAmount=oaState.originalAmount;
//             $Action.newHand=true;
//         }
//         else if(oaState.activeHandIndex==1){
//             //第一手活动：			
//         }
//     } else {
//         //一手时判断是否可拆牌
//         let rank1 = oaState.hands[0].cards[0].charAt(0);
//         let rank2 = oaState.hands[0].cards[1].charAt(0);
//         if (rank1 == 'T' || rank1 == 'J' || rank1 == 'Q' || rank1 == 'K') rank1 = '10';
//         if (rank2 == 'T' || rank2 == 'J' || rank2 == 'Q' || rank2 == 'K') rank2 = '10';
//         if (rank1 == rank2) {
//             $Action.split = true;
//         }

//         if (oaState.dealerCards[0].charAt(0) == 'A') {
//             //一手时可下保险
//             if (oaState.insurance > 0) {
//                 //已经下保险
//                 $Player.state.insurance = oaState.insurance;
//             } else {
//                 $Action.insurance = true;
//             }
//         }
//     }

//     $Player.state.dealerCards = oaState.dealerCards;
//     // for (let card of state.dealerCards) {
//     // 	$Player.state.dealerCards.push(card);
//     // }
//     //$Player=$Player;
//     const hand1CanDouble=oaState.activeHandIndex==1 && oaState.hands[0].cards.length==2;
//     const hand2CanDouble=oaState.activeHandIndex==2 && oaState.hands[1].cards.length==2;
    
//     if(hand1CanDouble || hand2CanDouble){
//         Action.afterDeal(true);
//     }
//     else{
//         Action.afterDeal(false);
//     }			
// }