//以下等同于AO中代码

export function getPoint(card: string): number {
	const rankChar = card.substring(0, 1);
	if (rankChar == 'T' || rankChar == 'J' || rankChar == 'Q' || rankChar == 'K') {
		return 10; //
	} else if (rankChar == 'A') {
		return 11; //默认先返回11
	} else {
		return Number(rankChar);
	}
}

export function isSamePoint(cards: string[]) {
	const point1 = getPoint(cards[0]);
	const point2 = getPoint(cards[1]);
	return point1 == point2;
}

// 一个辅助函数，用于计算一手牌总值，将A视为1或11
export function getCardsPoints(cards: string[]): number {
	let total = 0;
	let aceCount = 0;

	for (let i = 0; i < cards.length; i++) {
		const point = getPoint(cards[i]);
		total = total + point;
		if (point == 11) {
			aceCount = aceCount + 1;
		}
	}
	//如果点数大于21则调整A计为1
	while (total > 21 && aceCount > 0) {
		total = total - 10;
		aceCount = aceCount - 1;
	}
	return total;
}

export function isBust(cards: string[]) {    
	return getCardsPoints(cards) > 21 ? true : false;
}

export function isBlackjack(cards: string[]) {
	//必须是两张牌
	if (cards.length != 2) return false;
	if (getPoint(cards[1]) != 11 && getPoint(cards[2]) != 11) return false;
	if (getPoint(cards[1]) != 10 && getPoint(cards[2]) != 10) return false;
	return true;
}
