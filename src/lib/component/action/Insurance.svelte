<script lang="ts">
	import { bjProcess } from '$lib';
	import { Action } from '$lib/store/Action';
	import { Player } from '$lib/store/Player';
	import { Spinner } from '$lib/store/Spinner';
	import { Waiting } from '$lib/store/Waiting';
	import { createDataItemSigner } from '@permaweb/aoconnect';
	import { message, result } from '$lib/store/Setting';
	import { t } from '$lib/i18n';
	import { log } from '$lib/store/Debug';

	async function insurance() {
		if ($Player.balance < $Player.state.hands[0].amount / 2) {
			$Waiting.alertClass = 'warning';
			$Waiting.waitingText = $t('action.balanceLack');
			$Waiting.isWaiting = true;
			setTimeout(() => {
				$Waiting.isWaiting = false;
			}, 1000);
			return;
		}

		Spinner.info($t('action.aoInsurancing'));
		const insuranceMsgId = await message({
			process: bjProcess,
			tags: [{ name: 'Action', value: 'Insurance' }],
			signer: createDataItemSigner(window.arweaveWallet)
		});
		log('保险Id:', insuranceMsgId);

		Spinner.result();
		const readResult = await result({ message: insuranceMsgId, process: bjProcess });
		log('保险信息:', readResult);
		const aoPlayerJson = readResult.Messages[0].Data;
		const aoPlayer = JSON.parse(aoPlayerJson);

		Spinner.stop();

		log('aoPlayer:', aoPlayer);
		Player.getState(aoPlayer);
		$Action.insurance = false;
	}
</script>

<a href="./#" on:click={insurance} style="text-decoration: none;">
	<svg width="60" height="60">
		<circle class="back" cx="30" cy="30" r="25" />
		<text x="6" y="43" font-size="36">🛡️</text>
		<circle class="hoverCircle" cx="30" cy="30" r="25" />
	</svg>
	<div style="color:#90caf9;text-align:center;font-weight:bolder">{$t('action.insurance')}</div>
</a>

<style>
	.back {
		fill: #223344;
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
