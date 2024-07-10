<script lang="ts">
	import { Player } from '$lib/store/Player';
	import { Action } from '$lib/store/Action';
	import { Spinner } from '$lib/store/Spinner';
	import { createDataItemSigner, message, result } from '@permaweb/aoconnect';
	import { bjProcess } from '$lib';
	import { Indicator } from '$lib/store/Indicator';
	import { Waiting } from '$lib/store/Waiting';

	async function doubleBet() {
		//如果有分牌，金额是一至的
		if ($Player.balance < $Player.state.hands[0].amount) {
			$Waiting.alertClass = 'warning';
			$Waiting.waitingText = '余额不够加倍';
			$Waiting.isWaiting = true;
			setTimeout(() => {
				$Waiting.isWaiting = false;
			}, 5000);
			return;
		}

		Spinner.info('AO加倍中');
		const doubleBetMsgId = await message({
			process: bjProcess,
			tags: [{ name: 'Action', value: 'Double' }],
			signer: createDataItemSigner(window.arweaveWallet)
		});

		Spinner.result();
		const readResult = await result({ message: doubleBetMsgId, process: bjProcess });
		const stateJson = readResult.Messages[0].Data;
		const state = JSON.parse(stateJson);
		console.log("加倍后:",state);

		$Spinner.isWaiting = false;

		if (state.activeAddress == 2) {
			//到第二手牌了
			if (state.hands[1].amount == 0) {
				//第二手结算，说明结束了，玩家会发牌。
				//总共：
				const backBalance = state.balance - $Player.balance;
				if (backBalance > 0) {
					Indicator.win(backBalance);
				} else if (backBalance == 0) {
					Indicator.tie(backBalance);
				} else {
					//const loseAmount=$Player.state.hands[0].amount+$Player.state.
					Indicator.lose(0);
				}
			} else {
				//
			}
		} else {
			//第一手牌加倍，没结束，可继续			
			if(state.dealerCards.length>1){
				//庄家发牌了，说明结束了
				Action.clearAll();
				$Action.newHand=true;

			}
			Player.getState(state); 	

		}
	}
</script>

<a href="./#" on:click={doubleBet} style="text-decoration: none;">
	<svg width="60" height="60">
		<circle class="back" cx="30" cy="30" r="25" />
		<text x="9" y="38" font-size="26">×</text>
		<text x="18" y="43" font-size="36">２</text>
		<circle class="hoverCircle" cx="30" cy="30" r="25" />
	</svg>
	<div style="color:#ff9800;text-align:center;font-weight:bolder">加 倍</div>
</a>

<style>
	.back {
		fill: #223344;
	}

	text {
		fill: #ff9800;
		font-weight: bolder;
	}

	.hoverCircle {
		stroke-width: 2;
		stroke: #ff9800;
		fill: transparent;
		transition: all 0.3s ease;
	}

	.hoverCircle:hover {
		stroke-width: 6;
	}
</style>
