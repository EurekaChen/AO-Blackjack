import { writable } from 'svelte/store';

export const count = writable(0);

const initialPlayer = {
    Hands: 0,
    CurrentHand: 0,
    Wager: [null, null, null, null],
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
  
export const Player=writable(initialGame);
