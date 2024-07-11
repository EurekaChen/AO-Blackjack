<script lang="ts">
	import { Player } from '$lib/store/Player';
	import { Action } from '$lib/store/Action';
	import { Spinner } from '$lib/store/Spinner';
	import { createDataItemSigner, message, result } from '@permaweb/aoconnect';
	import { bjProcess } from '$lib';
	import { Indicator } from '$lib/store/Indicator';

	async function hit() {
		Spinner.info('AO要牌中');
		Action.clearAll();
		const hitMsgId = await message({
			process: bjProcess,
			tags: [{ name: 'Action', value: 'Hit' }],
			signer: createDataItemSigner(window.arweaveWallet)
		});

		Spinner.result();
		const readResult = await result({ message: hitMsgId, process: bjProcess });
		const playerJson = readResult.Messages[0].Data;
		const state = JSON.parse(playerJson);

		$Spinner.isWaiting = false;

		if (state.hands[0].amount == 0 && state.dealerCards.length == 2) {
			//玩家筹码被收走，庄家发两张牌，说明爆牌输了
			const loseAmount = $Player.state.hands[0].amount;
			Player.getState(state); //怎么没清掉筹码？
			Indicator.lose(loseAmount);

			$Action.newHand = true;
			//??没起效？！还有amount不归零？
			//$Player.state.
			$Player.inGame = false;
			$Player = $Player;

			setTimeout(() => {
				$Indicator.isShow = false;
			}, 5000);
		} else if (state.balance > $Player.balance) {
			//赢钱了
			const winAmount = state.balance - $Player.balance;
			Action.clearAll();
			$Action.newHand = true;
			Player.getState(state);
			Indicator.win(winAmount);
			$Player.inGame = false;
			setTimeout(() => {
				$Indicator.isShow = false;
			}, 5000);
		} else {
			Player.getState(state);
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
