<script lang="ts">
	import { Player } from '$lib/store/Player';

	function doubleRepeat() {
		let handAmount = $Player.state.originalAmount;
		if ($Player.balance >= 2*handAmount) {
			$Player.balance -= 2*handAmount;
			$Player.state.hands[0].amount += 2*handAmount;
		}
	}
</script>

<a href="./#" on:click={doubleRepeat} style="text-decoration: none;">
	<svg width="60" height="60">
		<circle class="back" cx="30" cy="30" r="25" />
		<text x="9" y="38" font-size="26">×</text>
		<text x="18" y="43" font-size="36">２</text>
		<circle class="hoverCircle" cx="30" cy="30" r="25" />
	</svg>
	<div style="color:#ff9800;text-align:center;font-weight:bolder">加倍下注</div>
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
