<script lang="ts">	
	import ChipSelector from '$lib/component/ChipSelector.svelte'
	import Action from '$lib/component/Action.svelte'
	import PlayerStack from '$lib/component/ChipStack.svelte'
	import GameHand from '$lib/component/GameHand.svelte';
</script>
	
<div style="width:1024px;height:576px;position:fixed">
	<PlayerStack />
	<ChipSelector />
	<Action />
	<GameHand />

</div>