<script lang="ts">
	import { Player } from '$lib/store/Player';
	import { Dealer } from '$lib/store/Dealer';
	import { Action } from '$lib/store/Action';

	import DoubleChip from './action/DoubleChip.svelte';
	import Clear from './action/Clear.svelte';

	//import doubleSvg from '$lib/svg/double.svg?raw';
	//import clearSvg from '$lib/svg/clear.svg?raw';

	//不会更新！
	console.log('double:', doubleChip);

	function doubleChip() {
		//if ($Game.State == 1) return;

		let amt = $Player.Wager[0];
		if ($Player.Balance >= amt) {
			$Player.Balance -= amt;
			$Player.Wager[0] += amt;
		}
	}

	//加倍后发牌并结束！
	function doubleBet() {
		//if ($Game.State == 1) return;

		let amt = $Player.Wager[0];
		if ($Player.Balance >= amt) {
			$Player.Balance -= amt;
			$Player.Wager[0] += amt;
		}
		//结束！
	}

	function deal() {
		//if ($Game.State == 1) return;
		$Dealer.Hand = ['Qs', 'hole'];
		$Player.Hand = ['Th', '8s'];
		$Action.deal = false;
		$Action.hit = true;
		$Action.clear = false;
		$Action.stand = true;
		$Action.doubleChip = false;
		$Action.doubleBet = true;
		console.log('点了发牌按钮');
	}

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

	function stand() {}

	function hit() {}
</script>

{#key doubleChip}
	<div style="position:absolute;left:580px;top:480px;cursor:pointer;display:{$Action.doubleChip	? 'block'	: 'none'}"><DoubleChip /></div>
	

	<a href="./#"  on:click={stand}>
	<div
		style="position:absolute;left:580px;top:480px;cursor:pointer;display:{$Action.stand
			? 'block'
			: 'none'}"
		
	>
		<object data="/img/action/stand.svg" title="double" style="width:60;height:60;" />
		
		
	</div>
</a>

	<div
		id="deal"
		style="position:absolute;left:680px;top:458px;cursor:pointer;display:{$Action.deal
			? 'block'
			: 'none'}"
		on:click={deal}
	>
		<object data="/img/action/deal.svg" title="deal" style="width:60;height:60;fill:green" />
		<div class="text" style="color:#90caf9">发 牌</div>
		<div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0;"></div>
	</div>

	<div
		id="hit"
		style="position:absolute;left:680px;top:458px;cursor:pointer;display:{$Action.hit
			? 'block'
			: 'none'}"
		on:click={hit}
	>
		<object data="/img/action/deal.svg" title="hit" style="width:60;height:60;fill:green" />
		<div class="text" style="color:#90caf9">要 牌</div>
		<div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0;"></div>
	</div>
	
	<div style="position:absolute;left:780px;top:426px;cursor:pointer;display:{$Action.clear
	? 'block'
	: 'none'}">
		<Clear />
	</div>


	<div
		style="position:absolute;left:780px;top:426px;cursor:pointer;display:{$Action.doubleBet
			? 'block'
			: 'none'}"
		on:click={doubleBet}
	>
		<object data="/img/action/double.svg" title="hit" style="width:60;height:60;fill:green" />
		<div class="text" style="color:#ff9800">加 倍</div>
		<div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0;"></div>
	</div>
{/key}

<style>
	.text {
		margin-top: -4px;
		text-align: center;
		font-weight: bolder;
	}

	.action-back {
		fill: #223344;
	}

	.double-line {
		stroke: #90caf9;
		stroke-width: 2;
		fill: #0d47a1;
	}

	.double-text {
		fill: #ff9800;
		font-weight: bolder;
	}

	.clear-text {
		fill: #cccccc;
		font-weight: bolder;
	}

	.double-circle {
		stroke-width: 2;
		stroke: #ff9800;
		fill: transparent;
		transition: all 0.3s ease;
	}

	.clear-circle {
		stroke-width: 2;
		stroke: #cccccc;
		fill: transparent;
		transition: all 0.3s ease;
	}

	.hover-circle:hover {
		stroke-width: 6;
	}
</style>
