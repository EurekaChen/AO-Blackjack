<script lang="ts">
	import { Player } from '$lib/store/Player';
	import { Action } from '$lib/store/Action';
	import clearSvg from './clear.svg?raw';
	import {Dealer} from '$lib/store/Dealer'

	function clear() {
		//if ($Game.State == 1) return;

		$Dealer.Hand = [];
		$Player.Hand = [];
		let amt = $Player.Wager[0];
		$Player.Balance += amt;
		$Player.Wager[0] = 0;
		$Action.clear = false;
		$Action.deal = false;
		$Action.doubleChip = false;
		$Action.hit = false;
	}

</script>
<a href="./#" on:click={clear} > 
	<div
		style="position:absolute;left:780px;top:426px;cursor:pointer;display:{$Action.clear
			? 'block'
			: 'none'}"
		
	>
{@html clearSvg}

</div>
</a>
