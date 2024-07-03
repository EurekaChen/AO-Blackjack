<script lang="ts">
	import { Player } from '$lib/store/Player';
	import { Action } from '$lib/store/Action';

	function doubleChip() {
		//if ($Game.State == 1) return;

		let amt = $Player.Wager[0];
		if ($Player.Balance >= amt) {
			$Player.Balance -= amt;
			$Player.Wager[0] += amt;
		}
	}
</script>
<a href="./#" on:click={doubleChip} > 
<div 
	style="position:absolute;left:580px;top:480px;cursor:pointer;display:{$Action.doubleChip
		? 'block'
		: 'none'}"	
>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" width="60" height="60">
		<style>
			.back {
				fill: #223344;
			}

			.line {
				stroke: #90caf9;
				stroke-width: 2;
				fill: #0d47a1;
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
		<circle class="back" cx="30" cy="30" r="25" />
		<text x="9" y="38" font-size="26">×</text>
		<text x="18" y="43" font-size="36">２</text>
		<circle class="hoverCircle" cx="30" cy="30" r="25" />
	</svg>
	<div class="text" style="color:#ff9800">加 倍</div>
</div>
</a>
