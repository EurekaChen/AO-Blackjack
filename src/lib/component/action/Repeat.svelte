<script lang="ts">
	import { Player } from '$lib/store/Player';
	import { Action } from '$lib/store/Action';

	function repeat() {		
		$Player.state.hands[0].cards = [];
		$Player.state.dealerCards=[]	
		$Player.state.hands[0].amount=$Player.state.originalAmount;
		$Player.balance-=$Player.state.originalAmount;	

		//$Action.
	}
</script>

<a href="./#" on:click={repeat} style="text-decoration: none;">
	<svg width="60" height="60">
		<circle class="back" cx="30" cy="30" r="25" />
		<text x="17" y="40" font-size="32">↺</text>
		<circle class="hoverCircle" cx="30" cy="30" r="25" />
	</svg>
	<div style="color:#cccccc;text-align:center;font-weight:bolder">再次下注</div>
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
