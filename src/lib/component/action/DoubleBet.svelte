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
	import { log } from '$lib/store/Debug';
	import { ChipPosition, MoveChip } from '$lib/store/MoveChip';


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

		Action.clearAll();
		//移动筹码：
		let handAmount=$Player.state.originalAmount;
		$Player.balance -= handAmount;
		//产生移动效果：
		$MoveChip.startPosition=ChipPosition.player;
		if($Player.state.activeHandIndex==0){
			$MoveChip.endPosition=ChipPosition.hand1;
		}
		else{
			$MoveChip.endPosition=ChipPosition.hand2;
		}		
		//触发移动
		$MoveChip.amount=handAmount;		
		//在动画结束处处理：$Player.state.hands[0or1].amount += handAmount;


		Spinner.info($t('action.aoDoubling'));
		const doubleBetMsgId = await message({
			process: bjProcess,
			tags: [{ name: 'Action', value: 'Double' }],
			signer: createDataItemSigner(window.arweaveWallet)
		});
		log("加倍Id:",doubleBetMsgId);

		Spinner.result();
		const readResult = await result({ message: doubleBetMsgId, process: bjProcess });
		log('加倍信息:', readResult);
		const aoPlayerJson = readResult.Messages[0].Data;
		const aoPlayer = JSON.parse(aoPlayerJson);
		
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
