<script lang="ts">
	import { Player } from '$lib/store/Player';
	import { createDataItemSigner } from '@permaweb/aoconnect';
	import { message, result } from '$lib/store/Setting';
	import { bjProcess } from '$lib/index';
	import { Spinner } from '$lib/store/Spinner';
	import { Action } from '$lib/store/Action';
	import { deal as processDeal } from '$lib/state/deal';
	import { t } from '$lib/i18n';
	import {log} from '$lib/store/Debug'
	
	async function deal() {
		//按钮后不能再动筹码
		$Player.inGame = true;
		Action.clearAll();

		Spinner.info($t('action.aoDealing'));
		$Player.state.originalAmount = $Player.state.hands[0].amount;
		
		const dealMsgId = await message({
			process: bjProcess,
			tags: [
				{ name: 'Action', value: 'Deal' },
				{ name: 'Amount', value: $Player.state.hands[0].amount.toString() }
			],
			signer: createDataItemSigner(window.arweaveWallet)
		});
		log("发牌Id:",dealMsgId);

		Spinner.result();
		const readResult = await result({ message: dealMsgId, process: bjProcess });		
		Spinner.stop();
		
		log("发牌信息:",readResult);

		let aoPlayerJson = readResult.Messages[0].Data;
		let aoPlayer = JSON.parse(aoPlayerJson);
		
		processDeal(aoPlayer);
	}
</script>

<a href="./#" on:click={deal} style="text-decoration: none;">
	<svg width="60" height="60">
		<circle class="back" cx="30" cy="30" r="25" />
		<rect class="line" x="18" y="15" rx="2" ry="2" width="24" height="30" />
		<rect class="line" x="18" y="15" rx="2" ry="2" width="18" height="30" />
		<text x="22" y="36">♣</text>
		<circle class="hoverCircle" cx="30" cy="30" r="25" />
	</svg>
	<div style="color:#90caf9;text-align:center;font-weight:bolder">{$t('action.deal')}</div>
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
