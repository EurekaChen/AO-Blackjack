<script lang="ts">
	import { Player } from '$lib/store/Player';
	import { message, result, createDataItemSigner } from '@permaweb/aoconnect';
	import { bjProcess } from '$lib/index';
	import { Spinner } from '$lib/store/Spinner';
	import { Action } from '$lib/store/Action';
	import { Indicator } from '$lib/store/Indicator';


	async function stand() {

		Action.clearAll();
		Spinner.info("停牌中")		
		const standMsgId = await message({
			process: bjProcess,
			tags: [{ name: 'Action', value: 'Stand' }],
			signer: createDataItemSigner(window.arweaveWallet)
		});

		Spinner.result();	
		const readResult = await result({ message: standMsgId, process: bjProcess });	
		Spinner.stop();

		const aoPlayerJson = readResult.Messages[0].Data;
		const aoPlayer = JSON.parse(aoPlayerJson);
		console.log("停牌状态：",aoPlayer);

		//两种情况，一种是发下一手牌，一种是庄家发到牌		
		if (aoPlayer.activeHandIndex>1) {
			//开始下一手牌
			Player.getState(aoPlayer);
		} else {
			//牌局结束
			let totalBetAmount = 0;
			$Player.state.hands.forEach((hand) => {
				totalBetAmount += hand.amount;
			});

			let backBalance =aoPlayer.balance - $Player.balance;

			if (backBalance > totalBetAmount) {
				Indicator.win(backBalance)			
			} else if (backBalance == totalBetAmount) {				
				Indicator.tie(backBalance)
			} else {
				Indicator.lose(backBalance-totalBetAmount)
			}

			//获取状态
			Player.getState(aoPlayer);

			setTimeout(() => {
				$Indicator.isShow = false;
			}, 5000);

			
			$Action.newHand = true;		
			$Player.inGame=false;			
		}
	}
</script>

<a href="./#" on:click={stand} style="text-decoration: none;">
	<svg width="60" height="60">
		<circle class="back" cx="30" cy="30" r="25" />
		<text x="30" y="43" font-size="35">⃠</text>
		<circle class="hoverCircle" cx="30" cy="30" r="25" />
	</svg>
	<div style="color:#DD443B;text-align:center;font-weight:bolder">停 牌</div>
</a>

<style>
	.back {
		fill: #223344;
	}

	text {
		fill: #dd443b;
		font-weight: bolder;
	}

	.hoverCircle {
		stroke-width: 2;
		stroke: #dd443b;
		fill: transparent;
		transition: all 0.3s ease;
	}

	.hoverCircle:hover {
		stroke-width: 6;
	}
</style>
