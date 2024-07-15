import { writable } from 'svelte/store';

export const ChipPosition = {
	player: { left: 120, top: 360 },
	hand1: { left: 477, top: 340 },
	hand2: { left: 677, top: 280 },
	insurance: { left: 310, top: 170 }
};

const initialMoveChip = {
	startPosition: ChipPosition.player,
	endPosition: ChipPosition.hand1,
	amount: 0
};

export const MoveChip = writable(initialMoveChip);
