<script lang="ts">
	import { t } from '$lib/i18n';
	import { Action } from '$lib/store/Action';
	import { ChipPosition, MoveChip } from '$lib/store/MoveChip';
	import { Player } from '$lib/store/Player';
	import { Waiting } from '$lib/store/Waiting';

	function doubleRepeat() {
		let handAmount = $Player.state.originalAmount;

		if ($Player.balance < 2 * handAmount) {
			$Waiting.alertClass = 'warning';
			$Waiting.confirm = true;
			$Waiting.isWaiting = true;
			$Waiting.waitingText = $t('action.balanceLack');
			setTimeout(() => {
				$Waiting.isWaiting = false;
			}, 1000);
			return;
		}

		Player.clearState();
		
		$Player.balance -= 2 * handAmount;		
		//产生移动效果：
		$MoveChip.startPosition=ChipPosition.player;
		$MoveChip.endPosition=ChipPosition.hand1;
		//触发移动
		$MoveChip.amount=2*handAmount;		
		//在动画结束处处理：$Player.state.hands[0].amount +=2* handAmount;			
		
		Action.clearAll();
		Action.beforeDeal();
	}
</script>

<a href="./#" on:click={doubleRepeat} style="text-decoration: none;">
	<svg width="60" height="60">
		<circle class="back" cx="30" cy="30" r="25" />
		<text x="9" y="38" font-size="26">×</text>
		<text x="18" y="43" font-size="36">２</text>
		<circle class="hoverCircle" cx="30" cy="30" r="25" />
	</svg>
	<div style="color:#ff9800;text-align:center;font-weight:bolder">{$t('action.doubleBet')}</div>
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
