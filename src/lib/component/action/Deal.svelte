<script lang="ts">
	import { Player } from '$lib/store/Player';
	import { createDataItemSigner } from '@permaweb/aoconnect';
	import { message, result } from '$lib/store/Setting';
	import { bjProcess } from '$lib/index';
	import { Spinner } from '$lib/store/Spinner';	
	import { Action } from '$lib/store/Action';
	import { Indicator } from '$lib/store/Indicator';
	
	async function deal() {
		//按钮后不能再动筹码
		$Player.inGame=true;
		Action.clearAll();

		Spinner.info("AO发牌中");
		$Player.state.originalAmount=$Player.state.hands[0].amount;	
		const dealMsgId = await message({
			process: bjProcess,
			tags: [
				{ name: 'Action', value: 'Deal' },
				{ name: 'Amount', value: $Player.state.hands[0].amount.toString() }
			],
			signer: createDataItemSigner(window.arweaveWallet)
		});		
	
		Spinner.result();		
		const readResult = await result({ message: dealMsgId, process: bjProcess });	
		console.log("oa返回信息：",readResult)	
	    Spinner.stop();			

		//返回数据处理
		let aoPlayerJson= readResult.Messages[0].Data
		let aoPlayer = JSON.parse(aoPlayerJson);
		console.log("玩家状态：",aoPlayer);
		if (aoPlayer.balance>$Player.balance) {
			//发牌动作返回余额有多，说明牌局已经结束，玩家拿到了黑杰克。
			Player.getState(aoPlayer);					
			Indicator.blackjack(aoPlayer.balance-$Player.balance)		
			setTimeout(() => {
			    $Indicator.isShow=false;	
			}, 3000);
			
			//可以开始新游戏
			$Player.inGame=false;			
			$Action.newHand=true;				
		} else 		
		{
			//发到两张牌
			Player.getState(aoPlayer)
			//oaPlayer.dealerCards.forEach(card => {$Player.state.dealerCards.push(card)});						
			//oaPlayer.hands[0].cards.forEach(card => $Player.state.hands[0].cards.push(card));			
			//Action.clearAll();

			let rank1=aoPlayer.state.hands[0].cards[0].charAt(0);
			let rank2=aoPlayer.state.hands[0].cards[1].charAt(0);		

			if(rank1=="T" || rank1=="J" || rank1=="Q" || rank1=="K") rank1="10";
			if(rank2=="T" || rank2=="J" || rank2=="Q" || rank2=="K") rank2="10";

			if(rank1==rank2){
				//可拆牌
				$Action.split=true;
			}

			Action.afterDeal(true)		
			$Player.inGame=true;
		}

		//保险为另外加的赌注
		if(aoPlayer.state.dealerCards[0].includes('A')){
			//提示保险
			$Action.insurance=true;
		}
	}
</script>

<a href="./#" on:click={deal} style="text-decoration: none;">
	<svg width="60" height="60">
		<circle class="back" cx="30" cy="30" r="25" />
		<rect class="line" x="18" y="15" rx="2" ry="2" width="24" height="30" />
		<rect class="line" x="18" y="15" rx="2" ry="2" width="18" height="30" />
		<text x="22" y="36">♣</text>
		<circle class="hoverCircle" cx="30" cy="30" r="25" />
	</svg>
	<div style="color:#90caf9;text-align:center;font-weight:bolder">发 牌</div>
</a>

<style>
	.back {
		fill: #223344;
	}

	.line {
		stroke: #90caf9;
		stroke-width: 2;
		fill: #0d47a1;
	}

	text {
		fill: #90caf9;
		font-weight: bolder;
	}

	.hoverCircle {
		stroke-width: 2;
		stroke: #90caf9;
		fill: transparent;
		transition: all 0.3s ease;
	}

	.hoverCircle:hover {
		stroke-width: 6;
	}
</style>
