<script lang="ts">
	import { Player } from '$lib/store/Player';
	import { Action } from '$lib/store/Action';	
	import { Dealer } from '$lib/store/Dealer';

	function clear() {
		//if ($Game.State == 1) return;
		$Dealer.Hand = [];
		$Player.Hand = [];
		let amt = $Player.Wager[0];
		$Player.balance += amt;
		$Player.Wager[0] = 0;
		$Action.clear = false;
		$Action.deal = false;
		$Action.doubleChip = false;
		$Action.hit = false;
	}
</script>

<a href="./#" on:click={clear} style="text-decoration: none;">
	<svg width="60" height="60">
		<circle class="back" cx="30" cy="30" r="25" />
		<text x="19" y="39" font-size="26">✕</text>
		<circle class="hoverCircle" cx="30" cy="30" r="25" />
	</svg>
	<div style="color:#cccccc;text-align:center;font-weight:bolder">清 除</div>
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
