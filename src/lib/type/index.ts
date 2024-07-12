export type AOPlayer = {
	addr: string;
	balance: number;
	name: string;
	state: AOState;
};

export type AOState = {
	hands: Hand[];
	activeHandIndex: number;
	insurance: number;
	originalAmount: number;
	dealerCards: string[];
};

export type Hand = {
	cards: string[];
	amount: number;
};

export type BJPlayer = {
	addr: string;
	balance: number;
	name: string;
	state: {
		hands: [{ cards: string[]; amount: number }, { cards: string[]; amount: number }];
		activeHandIndex: number;
		insurance: number;
		originalAmount: number;
		dealerCards: string[];
	};
    inGame:boolean;
};
