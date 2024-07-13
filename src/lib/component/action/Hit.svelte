<script lang="ts">
	import { Action } from '$lib/store/Action';
	import { Spinner } from '$lib/store/Spinner';
	import { createDataItemSigner } from '@permaweb/aoconnect';
	import { message, result } from '$lib/store/Setting';
	import { bjProcess } from '$lib';
	import {hit as processHit} from '$lib/state/hit';
	import { t } from '$lib/i18n';

	async function hit() {
		Spinner.info($t('action.aoHiting'));
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
		console.log('aoPlayer:', aoPlayer);
		$Spinner.isWaiting = false;

		processHit(aoPlayer);
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
	<div style="color:#90caf9;text-align:center;font-weight:bolder">{$t('action.hit')}</div>
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
