<script lang="ts">	
	import ChipSelector from '$lib/component/ChipSelector.svelte'
	import ActionPanel from '$lib/component/ActionPanel.svelte'
	import PlayerStack from '$lib/component/ChipStack.svelte'
	import GameHand from '$lib/component/GameHand.svelte';
	import Spinner from '$lib/component/Spinner.svelte';
	import Indicator from '$lib/component/Indicator.svelte';
</script>
	
<div style="width:1024px;height:576px;position:fixed">
	<PlayerStack />
	<ChipSelector />
	<ActionPanel />
	<GameHand />
	<Spinner />
	<Indicator />

</div>