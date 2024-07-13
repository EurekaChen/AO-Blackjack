<script lang="ts">
	import { Player } from '$lib/store/Player';
	import { Action } from '$lib/store/Action';
	import { Spinner } from '$lib/store/Spinner';
	import { bjProcess } from '$lib';
	import { createDataItemSigner } from '@permaweb/aoconnect';
	import { message, result } from '$lib/store/Setting';
	import { Waiting } from '$lib/store/Waiting';

	async function split() {
		let amount = $Player.state.hands[0].amount;
		if ($Player.balance < amount) {
			$Waiting.alertClass = 'warning';
			$Waiting.waitingText = '余额不够拆牌';
			$Waiting.isWaiting = true;
			setTimeout(() => {
				$Waiting.isWaiting = false;
			}, 1000);
			return;
		}

		Action.clearAll();
		Spinner.info('AO拆牌中');
		const splitMsgId = await message({
			process: bjProcess,
			tags: [{ name: 'Action', value: 'Split' }],
			signer: createDataItemSigner(window.arweaveWallet)
		});
		Spinner.result();		
		const readResult = await result({ message: splitMsgId, process: bjProcess });
		console.log(readResult)
		const aoPlayerJson = readResult.Messages[0].Data;
		const aoPlayer = JSON.parse(aoPlayerJson);
		console.log('分牌后:', aoPlayer);
		Spinner.stop();

		Player.getState(aoPlayer);

		if (aoPlayer.state.activeHandIndex == 0) {
			//两手都是21点，牌局结束
			$Player.inGame = false;
			Action.clearAll();
			$Action.newHand = true;
		} else {
			Action.afterDeal(true);
		}
		// else if(aoState.activeHandIndex==1){
		// 	//常规，进入第一手牌
		// 	//另一手不亮：
		// 	Action.afterDeal(true);
		// }else if(aoState.activeHandIndex==2){
		// 	//进入了第二手
		// 	Action.afterDeal(true);
		// }
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
