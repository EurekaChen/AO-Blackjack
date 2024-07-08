<script lang="ts">
	import { Player } from '$lib/store/Player';
	import { Action } from '$lib/store/Action';

	
	function split() {
		let clearAmount = $Player.state.hands[0].amount;
		$Player.balance = $Player.balance + clearAmount;
		$Player.state.hands[0].amount = 0;
		//$Player.state.hands[1].amount=0;
		Action.clearAll();	
	}
	
</script>

<a href="./#" on:click={split} style="text-decoration: none;">
	<svg width="60" height="60">
		<circle class="back" cx="30" cy="30" r="25" />
		<text x="17" y="35" font-size="24">←</text>
		<text x="20" y="47" font-size="24">→</text>
		<circle class="hoverCircle" cx="30" cy="30" r="25" />
	</svg>
	<div style="color:#e3f2fd;text-align:center;font-weight:bolder">折 牌</div>
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
