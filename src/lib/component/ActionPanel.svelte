<script lang="ts">
	import { Action } from '$lib/store/Action';
	
	import DoubleChip from './action/DoubleChip.svelte';
	import Clear from './action/Clear.svelte';
	import Stand from './action/Stand.svelte';
	import Deal from './action/Deal.svelte';
	import Hit from './action/Hit.svelte';
	import DoubleBet from './action/DoubleBet.svelte';

	$: doubleChipDisplay = $Action.doubleChip ? 'block' : 'none';
	$: standDisplay = $Action.stand ? 'block' : 'none';
	$: dealDisplay = $Action.deal ? 'block' : 'none';
	$: hitDisplay = $Action.hit ? 'block' : 'none';
	$: clearDisplay = $Action.clear ? 'block' : 'none';
	$: doubleBetDisplay = $Action.doubleBet ? 'block' : 'none';
</script>

<div style="position:absolute;left:580px;top:480px;display:{doubleChipDisplay}">
	<DoubleChip />
</div>

<div style="position:absolute;left:580px;top:480px;cursor:pointer;display:{standDisplay}">
	<Stand />
</div>

<div style="position:absolute;left:680px;top:458px;cursor:pointer;display:{dealDisplay}">
	<Deal />
</div>

<div style="position:absolute;left:680px;top:458px;cursor:pointer;display:{hitDisplay}">
	<Hit />
</div>

<div style="position:absolute;left:780px;top:426px;cursor:pointer;display:{clearDisplay}">
	<Clear />
</div>

<div style="position:absolute;left:780px;top:426px;cursor:pointer;display:{doubleBetDisplay}">
	<DoubleBet />
</div>
