import { writable } from 'svelte/store';

export const count = writable(0);

const initialPlayer = {
    //从钱包提到游戏进程的EGC数量，变成数字，随着游戏变化。
    Balance:100,
    Wager:[0, 0, 0, 0],
    Hands: 0,
    CurrentHand: 0,

    Hand:["As","Jh"],
   
    Insurance: null,
    CardIndex: [[], [], [], []],
    CardValue: [[], [], [], []],
    Left: [443],
    Top: [416],
    OffsetLeft: 24,
    OffsetTop: -4,
    Total: [0, 0, 0, 0],
    Aces: [0, 0, 0, 0],
    Bankroll: null,
    Busy: false,
    LastBet: 0,
    Surrendered: false,
    IsAnalyzed: false,
    AnalysisData: {},
    LastPlay: ''
	};
  
export const Player=writable(initialPlayer);
