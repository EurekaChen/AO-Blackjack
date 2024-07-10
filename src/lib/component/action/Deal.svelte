<script lang="ts">
	import { Player } from '$lib/store/Player';
	import { message, result, createDataItemSigner } from '@permaweb/aoconnect';
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
	    Spinner.stop();			

		let oaStateJson= readResult.Messages[0].Data
		let oaState = JSON.parse(oaStateJson);
		if (oaState.balance>$Player.balance) {
			//返回余额有多，说明牌局结束（应该是玩家拿到了黑杰克）
			Player.getState(oaState);	
			Action.clearAll();		
			Indicator.blackjack(oaState.balance-$Player.balance)			
			$Player.inGame=false;			
			$Action.newHand=true;	

			setTimeout(() => {
			    $Indicator.isShow=false;	
			}, 5000);
				
		} else 		
		{
			oaState.dealerCards.forEach(card => {$Player.state.dealerCards.push(card)});						
			oaState.hands[0].cards.forEach(card => $Player.state.hands[0].cards.push(card));			
			Action.clearAll();

			let rank1=oaState.hands[0].cards[0].charAt(0);
			let rank2=oaState.hands[0].cards[1].charAt(0);		

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
		if(oaState.dealerCards[0].includes('A')){
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
