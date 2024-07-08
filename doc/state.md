# 游戏状态解析

## AO游戏状态(参见Deal.lua)
``` lua
player.state = 
{       
    --初始为空，产生后插入    
    hands = { 
        { 
            cards = playerCards, 
            amount = amount } 
        },            
    activeHandIndex = 1,            
    dealerCards = dealerCards,            
    deck = deck,
    originalAmount,            
    insuranceBet = 0
}

player.balance
```

## Svelte游戏状态

数据结构尽量跟OA Lua保持一致
``` javascript
const initialPlayer = {	
	balance: 0,
	//state在oa为null表示未产生牌局
    //js中初始状态如下，不是null，产生后直接写入
	//尽量保持OA和JS的数据结构一致。
	state: {
		hands: [
			{ cards: [], amount: 0 },
			{ cards: [], amount: 0 } //拆牌
		],
		//由于序数的不同，在lua要加1
		activeHandIndex: 0,
		//0表示没下保险。
		insurance: 0,		
		//供repeat使用
		originalAmount: 0
        //庄家牌
        dealerCards:[]        
	}
};
```