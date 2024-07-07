<script lang="ts">
	import { Action } from '$lib/store/Action';
	import { Player } from '$lib/store/Player';

	function insurance() {
		
		let insuranceAmount = $Player.state.hands[0].amount/2;
		if ($Player.balance >= insuranceAmount) {
			$Player.balance -= insuranceAmount;
			console.log("下保险:",insuranceAmount);
			$Player.state.insurance = insuranceAmount;
			//$Player=$Player;
			$Action.insurance=false;
		}
	}
</script>

<a href="./#" on:click={insurance} style="text-decoration: none;">
	<svg width="60" height="60">
		<circle class="back" cx="30" cy="30" r="25" />	
		<text x="6" y="43" font-size="36">🛡️</text>
		<circle class="hoverCircle" cx="30" cy="30" r="25" />
	</svg>
	<div style="color:#90caf9;text-align:center;font-weight:bolder">保 险</div>
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
