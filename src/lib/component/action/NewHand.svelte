<script lang="ts">
	import { Player } from '$lib/store/Player';
	import { Action } from '$lib/store/Action';
	import { t } from '$lib/i18n';

	function newHand() {		
		$Player.state.hands[0].cards = [];
		$Player.state.hands[1].cards= [];
		$Player.state.hands[0].amount=0;
		$Player.state.hands[1].amount=0;
	    $Player.state.dealerCards=[];
		$Player.state.insurance=0;		
		Action.clearAll();		
	}
</script>

<a href="./#" on:click={newHand} style="text-decoration: none;">
	<svg width="60" height="60">
		<circle class="back" cx="30" cy="30" r="25" />
		<text x="17" y="40" font-size="32">↻</text>
		<circle class="hoverCircle" cx="30" cy="30" r="25" />
	</svg>
	<div style="color:#cccccc;text-align:center;font-weight:bolder"> {$t('action.newHand')}</div>
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
