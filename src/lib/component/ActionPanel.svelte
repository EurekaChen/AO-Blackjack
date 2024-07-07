<script lang="ts">
	import { Action } from '$lib/store/Action';
	
	import DoubleChip from './action/DoubleChip.svelte';
	import Clear from './action/Clear.svelte';
	import Stand from './action/Stand.svelte';
	import Deal from './action/Deal.svelte';
	import Hit from './action/Hit.svelte';
	import DoubleBet from './action/DoubleBet.svelte';
	import NewHand from './action/NewHand.svelte';
	import Repeat from './action/Repeat.svelte';
	import DoubleRepeat from './action/DoubleRepeat.svelte';
	import Insurance from './action/Insurance.svelte';

	$: newHandDisplay = $Action.newHand ? 'block' : 'none';	
	$: doubleChipDisplay = $Action.doubleChip ? 'block' : 'none';
	$: standDisplay = $Action.stand ? 'block' : 'none';
	$: dealDisplay = $Action.deal ? 'block' : 'none';
	$: hitDisplay = $Action.hit ? 'block' : 'none';
	$: clearDisplay = $Action.clear ? 'block' : 'none';
	$: doubleBetDisplay = $Action.doubleBet ? 'block' : 'none';
	$: insuranceDisplay = $Action.insurance ? 'block' : 'none';
</script>

<div style="position:absolute;left:580px;top:480px;display:{newHandDisplay}">
	<NewHand />
</div>

<div style="position:absolute;left:680px;top:458px;display:{newHandDisplay}">
	<Repeat />
</div>

<div style="position:absolute;left:780px;top:426px;display:{newHandDisplay}">
	<DoubleRepeat />
</div>

<div style="position:absolute;left:580px;top:480px;display:{doubleChipDisplay}">
	<DoubleChip />
</div>

<div style="position:absolute;left:580px;top:480px;display:{standDisplay}">
	<Stand />
</div>

<div style="position:absolute;left:680px;top:458px;display:{dealDisplay}">
	<Deal />
</div>

<div style="position:absolute;left:680px;top:458px;display:{hitDisplay}">
	<Hit />
</div>

<div style="position:absolute;left:780px;top:426px;display:{clearDisplay}">
	<Clear />
</div>

<div style="position:absolute;left:780px;top:426px;display:{doubleBetDisplay}">
	<DoubleBet />
</div>

<div style="position:absolute;left:880px;top:384px;display:{insuranceDisplay}">
	<Insurance />
</div>
