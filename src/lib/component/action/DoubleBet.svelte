<script lang="ts">
	import { Player } from '$lib/store/Player';
	import { Action } from '$lib/store/Action';
	import { Spinner } from '$lib/store/Spinner';
	import { createDataItemSigner, message, result } from '@permaweb/aoconnect';
	import { bjProcess } from '$lib';
	import { Indicator } from '$lib/store/Indicator';
	import { Waiting } from '$lib/store/Waiting';
	import { isBlackjack, isBust } from '$lib/state/evaluate';
	import type { AOPlayer } from '$lib/type';


	function showResult(aoPlayer: AOPlayer) {
		const backBalance = aoPlayer.balance - $Player.balance;		

		if (isBlackjack(aoPlayer.state.hands[0].cards)) {
			Indicator.blackjack(backBalance);
		} else if (isBust(aoPlayer.state.hands[0].cards)) {
			Indicator.bust(backBalance);
		} else {
			const totalBet =
				$Player.state.hands[0].amount + $Player.state.hands[1].amount + $Player.state.insurance;
			if (backBalance > totalBet) {
				Indicator.win(backBalance);
			} else if (backBalance == totalBet) {
				Indicator.tie(backBalance);
			} else {
				Indicator.lose(backBalance - totalBet);
			}
		}
		setTimeout(() => {
			$Indicator.isShow = false;
		}, 3000);
	}

	async function doubleBet() {		
		if ($Player.balance < $Player.state.hands[0].amount) {
			$Waiting.alertClass = 'warning';
			$Waiting.waitingText = '余额不够加倍';
			$Waiting.isWaiting = true;
			setTimeout(() => {
				$Waiting.isWaiting = false;
			}, 1000);
			return;
		}

		Action.clearAll();
		Spinner.info('AO加倍中');
		const doubleBetMsgId = await message({
			process: bjProcess,
			tags: [{ name: 'Action', value: 'Double' }],
			signer: createDataItemSigner(window.arweaveWallet)
		});

		Spinner.result();
		const readResult = await result({ message: doubleBetMsgId, process: bjProcess });		
		const aoPlayerJson = readResult.Messages[0].Data;
		const aoPlayer = JSON.parse(aoPlayerJson);
		console.log('加倍后:', aoPlayer);

		$Spinner.isWaiting = false;

		if (aoPlayer.activeAddress == 2) {
			//到第二手牌了
			if (aoPlayer.hands[1].amount == 0) {
				//第二手结算，说明结束了，玩家会发牌。
				//总共：
				showResult(aoPlayer);
				// const backBalance = aoPlayer.balance - $Player.balance;
				// if (backBalance > 0) {
				// 	Indicator.win(backBalance);
				// } else if (backBalance == 0) {
				// 	Indicator.tie(backBalance);
				// } else {
				// 	//const loseAmount=$Player.state.hands[0].amount+$Player.state.
				// 	Indicator.lose(0);
				// }
				$Action.newHand = true;
			} else {
				//不会到这里
				throw '第二手加倍后应该停牌重新开始';
			}
		} else {
			//第一手牌加倍，加倍后停牌
			if (aoPlayer.state.hands.length > 1) {
				//转到第二手：
				Action.afterDeal(true);
			} else {
				if (aoPlayer.state.dealerCards.length > 1) {
					//庄家发牌了，说明结束了，加倍不会有黑杰克					
					const backBalance = aoPlayer.balance - $Player.balance;

					if (backBalance > 0) {
						Indicator.win(backBalance);
					} else if (backBalance == 0) {
						Indicator.tie(backBalance);
					} else {
						//const loseAmount=$Player.state.hands[0].amount+$Player.state.
						Indicator.lose(0);
					}
					setTimeout(() => {
				    $Indicator.isShow = false;
					}, 1000);
					$Action.newHand = true;		
					$Player.inGame=false;			
				}
			}
			Player.getState(aoPlayer);
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
