<script lang="ts">
	import { createDataItemSigner } from '@permaweb/aoconnect';
	import { message, result } from '$lib/store/Setting';
	import { bjProcess } from '$lib/index';
	import { Spinner } from '$lib/store/Spinner';
	import { Action } from '$lib/store/Action';
	import { stand as processStand } from '$lib/state/stand';
	import { t } from '$lib/i18n';
	
	async function stand() {
		Action.clearAll();
		Spinner.info($t('action.aoStanding'));
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
		console.log('停牌状态：', aoPlayer);
				
		processStand(aoPlayer);
	}
</script>

<a href="./#" on:click={stand} style="text-decoration: none;">
	<svg width="60" height="60">
		<circle class="back" cx="30" cy="30" r="25" />
		<text x="30" y="43" font-size="35">⃠</text>
		<circle class="hoverCircle" cx="30" cy="30" r="25" />
	</svg>
	<div style="color:#DD443B;text-align:center;font-weight:bolder">{$t('action.stand')}</div>
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
