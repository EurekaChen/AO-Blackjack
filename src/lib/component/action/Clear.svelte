<script lang="ts">
	import { Player } from '$lib/store/Player';
	import { Action } from '$lib/store/Action';
	import { t } from '$lib/i18n';
	import { ChipPosition, MoveChip } from '$lib/store/MoveChip';
	
	function clear() {
		let amount=$Player.state.hands[0].amount;
		
		$MoveChip.startPosition = ChipPosition.hand1;
		$MoveChip.endPosition = ChipPosition.player;
		
		$Player.state.hands[0].amount=0;
		//触发动画
		$MoveChip.amount = amount;
		Action.clearAll();
	}
</script>

<a href="./#" on:click={clear} style="text-decoration: none;">
	<svg width="60" height="60">
		<circle class="back" cx="30" cy="30" r="25" />
		<text x="19" y="39" font-size="26">✕</text>
		<circle class="hoverCircle" cx="30" cy="30" r="25" />
	</svg>
	<div style="color:#cccccc;text-align:center;font-weight:bolder">{$t('action.clear')}</div>
</a>

<style>
	.back {
		fill: #223344;
	}

	text {
		fill: #cccccc;
		font-weight: bolder;
	}

	.hoverCircle {
		stroke-width: 2;
		stroke: #cccccc;
		fill: transparent;
		transition: all 0.3s ease;
	}

	.hoverCircle:hover {
		stroke-width: 6;
	}
</style>
