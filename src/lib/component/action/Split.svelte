<script lang="ts">
	import { Player } from '$lib/store/Player';
	import { Action } from '$lib/store/Action';
	import { Spinner } from '$lib/store/Spinner';
	import { bjProcess } from '$lib';
	import { createDataItemSigner, message, result } from '@permaweb/aoconnect';


	async function split() {
		let amount = $Player.state.hands[0].amount;
		if ($Player.balance >= amount) {
			$Spinner.isWaiting = true;
			$Spinner.text = 'AO拆牌中';
			$Spinner.colorClass = 'info';

			Action.clearAll();

			//直接发送分牌信息
			const splitMsgId = await message({
				process: bjProcess,
				tags: [{ name: 'Action', value: 'Split' }],
				signer: createDataItemSigner(window.arweaveWallet)
			});

			$Spinner.text = '解析中';
			$Spinner.colorClass = 'success';

			const readResult = await result({ message: splitMsgId, process: bjProcess });

			console.log('结果信息：', readResult);
			console.log(readResult.Messages[0].Data);

			$Spinner.text = $Spinner.defaultText;
			$Spinner.isWaiting = false;

			//拆牌后
			const state=JSON.parse(readResult.Messages[0].Data)
			$Player.balance=state.balance;
			$Player.state.dealerCards=state.dealerCards;
			$Player.state.hands[0].cards=state.hands[0].cards;
			$Player.state.hands[0].amount=state.hands[0].amount;

			$Player.state.hands[1].cards=state.hands[1].cards;
			$Player.state.hands[1].amount=state.hands[1].amount;

			if(state.activeHandIndex==0){
				//两手都是21点，牌局结束
				$Player.inGame=false;
				Action.clearAll();
				$Action.newHand=true;
			}
			else if(state.activeHandIndex==1){
				//常规，进入第一手牌
				//另一手不亮：
				
			}

		}		
	}
</script>

<a href="./#" on:click={split} style="text-decoration: none;">
	<svg width="60" height="60">
		<circle class="back" cx="30" cy="30" r="25" />
		<text x="17" y="35" font-size="24">←</text>
		<text x="20" y="47" font-size="24">→</text>
		<circle class="hoverCircle" cx="30" cy="30" r="25" />
	</svg>
	<div style="color:#e3f2fd;text-align:center;font-weight:bolder">折 牌</div>
</a>

<style>
	.back {
		fill: #223344;
	}

	text {
		fill: #e3f2fd;
		font-weight: bolder;
	}

	.hoverCircle {
		stroke-width: 2;
		stroke: #e3f2fd;
		fill: transparent;
		transition: all 0.3s ease;
	}

	.hoverCircle:hover {
		stroke-width: 6;
	}
</style>
