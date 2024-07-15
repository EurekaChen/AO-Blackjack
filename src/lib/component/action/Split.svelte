<script lang="ts">
	import { Player } from '$lib/store/Player';
	import { Action } from '$lib/store/Action';
	import { Spinner } from '$lib/store/Spinner';
	import { bjProcess } from '$lib';
	import { createDataItemSigner } from '@permaweb/aoconnect';
	import { message, result } from '$lib/store/Setting';
	import { Waiting } from '$lib/store/Waiting';
	import { t } from '$lib/i18n';
	import { log } from '$lib/store/Debug';
	import { showResult } from '$lib/state/showResult';
	import { ChipPosition, MoveChip } from '$lib/store/MoveChip';

	async function split() {
		let amount = $Player.state.hands[0].amount;
		if ($Player.balance < amount) {
			$Waiting.alertClass = 'warning';
			$Waiting.waitingText =  $t('action.balanceLack');
			$Waiting.isWaiting = true;
			setTimeout(() => {
				$Waiting.isWaiting = false;
			}, 1000);
			return;
		}

		//移动筹码动画：
		let handAmount=$Player.state.originalAmount;
		$Player.balance -= handAmount;
		//产生移动效果：
		$MoveChip.startPosition=ChipPosition.player;
		$MoveChip.endPosition=ChipPosition.hand2;				
		//触发移动
		$MoveChip.amount=handAmount;		
		//在动画结束处处理：$Player.state.hands[1].amount += handAmount;

		Action.clearAll();
		Spinner.info( $t('action.aoSpliting'));
		const splitMsgId = await message({
			process: bjProcess,
			tags: [{ name: 'Action', value: 'Split' }],
			signer: createDataItemSigner(window.arweaveWallet)
		});
		log("分牌Id:",splitMsgId);

		Spinner.result();		
		const readResult = await result({ message: splitMsgId, process: bjProcess });
		log("分牌信息:", readResult)
		const aoPlayerJson = readResult.Messages[0].Data;
		const aoPlayer = JSON.parse(aoPlayerJson);		
		Spinner.stop();

		log('分牌后aoPlayer:', aoPlayer);
		Player.getState(aoPlayer);
		if (aoPlayer.state.activeHandIndex == 0) {
			//两手都已经结束
			showResult(aoPlayer);
			$Player.inGame = false;		
			$Action.newHand = true;
			
		} else {
			Action.afterDeal(true);
		}		
	}
</script>

<a href="./#" on:click={split} style="text-decoration: none;">
	<svg width="60" height="60">
		<circle class="back" cx="30" cy="30" r="25" />
		<text x="17" y="35" font-size="24">←</text>
		<text x="20" y="47" font-size="24">→</text>
		<circle class="hoverCircle" cx="30" cy="30" r="25" />
	</svg>
	<div style="color:#e3f2fd;text-align:center;font-weight:bolder">{$t('action.split')}</div>
</a>

<style>
	.back {
		fill: #223344;
	}

	text {
		fill: #e3f2fd;
		font-weight: bolder;
	}

	.hoverCircle {
		stroke-width: 2;
		stroke: #e3f2fd;
		fill: transparent;
		transition: all 0.3s ease;
	}

	.hoverCircle:hover {
		stroke-width: 6;
	}
</style>
