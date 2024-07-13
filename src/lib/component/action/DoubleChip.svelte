<script lang="ts">
	import { Player } from '$lib/store/Player';
	import { Waiting } from '$lib/store/Waiting';

	function doubleChip() {
		let handAmount = $Player.state.hands[0].amount;
		if ($Player.balance < handAmount) {
			$Waiting.alertClass = 'warning';
			$Waiting.confirm = true;
			$Waiting.isWaiting = true;
			$Waiting.waitingText = '加倍筹码不够';
			setTimeout(() => {
				$Waiting.isWaiting = false;
			}, 1000);
			return;
		}
		
		$Player.balance -= handAmount;
		$Player.state.hands[0].amount += handAmount;
	}
</script>

<a href="./#" on:click={doubleChip} style="text-decoration: none;">
	<svg width="60" height="60">
		<circle class="back" cx="30" cy="30" r="25" />
		<text x="9" y="38" font-size="26">×</text>
		<text x="18" y="43" font-size="36">２</text>
		<circle class="hoverCircle" cx="30" cy="30" r="25" />
	</svg>
	<div style="color:#ff9800;text-align:center;font-weight:bolder">加 倍</div>
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
