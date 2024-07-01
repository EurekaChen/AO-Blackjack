<script lang="ts">	
	import ChipSelector from '$lib/component/ChipSelector.svelte'
	import Action from '$lib/component/Action.svelte'
	import PlayerStack from '$lib/component/PlayerStack.svelte'
</script>
	
<div style="width:1024px;height:576px;position:fixed">
	<PlayerStack />
	<ChipSelector />
	<Action />

</div>