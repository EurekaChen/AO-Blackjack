<script lang="ts">
	import { Player } from '$lib/store/Player';
	import { Action } from '$lib/store/Action';
	import { Spinner } from '$lib/store/Spinner';
	import { createDataItemSigner } from '@permaweb/aoconnect';
	import { message, result } from '$lib/store/Setting';
	import { bjProcess } from '$lib';
	import { doubleBet as processDoubleBet} from '$lib/state/doubleBet';

	import { Waiting } from '$lib/store/Waiting';
	import { t } from '$lib/i18n';


	async function doubleBet() {
		if ($Player.balance < $Player.state.hands[0].amount) {
			$Waiting.alertClass = 'warning';
			$Waiting.waitingText = $t('action.balanceLack');
			$Waiting.isWaiting = true;
			setTimeout(() => {
				$Waiting.isWaiting = false;
			}, 1000);
			return;
		}

		//显示一下：

		Action.clearAll();
		Spinner.info($t('action.aoDoubling'));
		const doubleBetMsgId = await message({
			process: bjProcess,
			tags: [{ name: 'Action', value: 'Double' }],
			signer: createDataItemSigner(window.arweaveWallet)
		});

		Spinner.result();
		const readResult = await result({ message: doubleBetMsgId, process: bjProcess });
		console.log('加倍Result', readResult);
		const aoPlayerJson = readResult.Messages[0].Data;
		const aoPlayer = JSON.parse(aoPlayerJson);
		console.log('加倍后:', aoPlayer);
		$Spinner.isWaiting = false;

	    processDoubleBet(aoPlayer);
	}
</script>

<a href="./#" on:click={doubleBet} style="text-decoration: none;">
	<svg width="60" height="60">
		<circle class="back" cx="30" cy="30" r="25" />
		<text x="9" y="38" font-size="26">×</text>
		<text x="18" y="43" font-size="36">２</text>
		<circle class="hoverCircle" cx="30" cy="30" r="25" />
	</svg>
	<div style="color:#ff9800;text-align:center;font-weight:bolder">{$t('action.double')}</div>
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
