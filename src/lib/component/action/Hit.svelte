<script lang="ts">
	import { Player } from '$lib/store/Player';
	import { Action } from '$lib/store/Action';
	import { Spinner } from '$lib/store/Spinner';
	import { createDataItemSigner, message, result } from '@permaweb/aoconnect';
	import { bjProcess } from '$lib';
	import { Indicator } from '$lib/store/Indicator';
	import { isBlackjack, isBust } from '$lib/state/evaluate';
	import type { AOPlayer } from '$lib/type';

	function showResult(aoPlayer: AOPlayer) {
		const backBalance = aoPlayer.balance - $Player.balance;
		console.log('第一手牌为：', aoPlayer.state.hands[0].cards);
		console.log('bust', isBust(aoPlayer.state.hands[0].cards));

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

	async function hit() {
		Spinner.info('AO要牌中');
		Action.clearAll();
		const hitMsgId = await message({
			process: bjProcess,
			tags: [{ name: 'Action', value: 'Hit' }],
			signer: createDataItemSigner(window.arweaveWallet)
		});

		Spinner.result();
		console.log('要牌信息id:', hitMsgId);

		const readResult = await result({ message: hitMsgId, process: bjProcess });
		console.log('要牌结果：', readResult);
		const aoPlayerJson = readResult.Messages[0].Data;
		const aoPlayer = JSON.parse(aoPlayerJson);

		// eslint-disable-next-line no-debugger
		//debugger;

		console.log('aoPlayer:', aoPlayer);
		$Spinner.isWaiting = false;

		if (aoPlayer.state.dealerCards.length > 1) {
			//给庄家发牌，说明牌局结束了。
			console.log('$Player:', $Player);
			showResult(aoPlayer);
			Player.getState(aoPlayer);
			$Action.newHand = true;
			$Player.inGame = false;
		} else {
			Player.getState(aoPlayer);
			Action.afterDeal(false);
		}
	}
</script>

<a href="./#" on:click={hit} style="text-decoration: none;">
	<svg width="60" height="60">
		<circle class="back" cx="30" cy="30" r="25" />
		<rect class="line" x="27" y="15" rx="2" ry="2" width="18" height="30" />
		<text x="31" y="36">♠</text>
		<text x="8" y="38" font-size="24" font-weight="bolder">+</text>
		<circle class="hoverCircle" cx="30" cy="30" r="25" />
	</svg>
	<div style="color:#90caf9;text-align:center;font-weight:bolder">要 牌</div>
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
