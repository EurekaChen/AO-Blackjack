<script lang="ts">
	import { Player } from '$lib/store/Player';
	import { Action } from '$lib/store/Action';
	import { Waiting } from '$lib/store/Waiting';
	import { t } from '$lib/i18n';

	function repeat() {	
		let repeatAmount=$Player.state.originalAmount
		if($Player.balance<repeatAmount){
			$Waiting.alertClass = 'warning';
			$Waiting.waitingText =  $t('action.balanceLack');
			$Waiting.isWaiting = true;
			setTimeout(() => {
				$Waiting.isWaiting = false;
			}, 1000);
			return;
		}
		Player.clearState();
		$Player.state.hands[0].amount=repeatAmount;
		Action.clearAll();
		Action.beforeDeal();
	}
</script>

<a href="./#" on:click={repeat} style="text-decoration: none;">
	<svg width="60" height="60">
		<circle class="back" cx="30" cy="30" r="25" />
		<text x="17" y="40" font-size="32">↺</text>
		<circle class="hoverCircle" cx="30" cy="30" r="25" />
	</svg>
	<div style="color:#cccccc;text-align:center;font-weight:bolder">{$t('action.repeat')}</div>
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
