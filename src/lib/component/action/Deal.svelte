<script lang="ts">
	import { Player } from '$lib/store/Player';
	import { message, result, createDataItemSigner } from '@permaweb/aoconnect';
	import { bjProcess } from '$lib/index';
	import { Spinner } from '$lib/store/Spinner';	
	import { Action } from '$lib/store/Action';
	import { WinLose } from '$lib/store/WinLose';
	
	async function deal() {
		$Spinner.isWaiting = true;
		$Spinner.text = 'OA发牌中';

		$Player.state.originalAmount=$Player.state.hands[0].amount;
		//直接发送发牌信息
		const dealMsgId = await message({
			process: bjProcess,
			tags: [
				{ name: 'Action', value: 'Deal' },
				{ name: 'Amount', value: $Player.state.hands[0].amount.toString() }
			],
			signer: createDataItemSigner(window.arweaveWallet)
		});
		
		console.log('MsgId:', dealMsgId);
		$Spinner.text = '解析数据中';

		
		const readResult = await result({ message: dealMsgId, process: bjProcess });
		console.log('结果信息：', readResult);
		console.log(readResult.Messages[0].Data);

		$Spinner.text = $Spinner.defaultText;
		$Spinner.isWaiting = false;

		//更新状态
		let data = JSON.parse(readResult.Messages[0].Data);
		if (data.balance) {
			//返回余额，说明牌局结束（应该是玩家拿到了黑杰克）
			Action.clearAll();
			$Action.newHand = true;			

			$WinLose.isShow=true;
			$WinLose.class="win";
			$WinLose.text="黑杰克";
			$WinLose.amount=data.balance-$Player.balance;
			$WinLose.icon="🃏";

			$Player.balance = data.balance;		
		} else if(data.dealerCards[0].includes('A')){
			//提示保险
			$Action.insurance=true;

		}
		else

		
		{
			//{playerCards = player.state.hands[player.state.activeHandIndex].cards, dealerCards = player.state.dealerCards}
			//$Dealer.cards = data.dealerCards;
			data.dealerCards.forEach(card => {$Player.state.dealerCards.push(card)});			
			//$Player.state.hands[0].cards = data.playerCards;
			data.playerCards.forEach(card => $Player.state.hands[0].cards.push(card));
			$Player=$Player;
			Action.clearAll();
			$Action.hit = true;
			$Action.stand = true;
			$Action.doubleBet = true;
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
