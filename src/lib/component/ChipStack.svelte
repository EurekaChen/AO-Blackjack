<script lang="ts">
	import Stack from '$lib/component/Stack.svelte'  
	import { Player} from '$lib/store/Player';
</script>

{#key $Player.balance}
<div style="position:absolute;left:120px;top:360px;">
	<Stack amount={$Player.balance}/>
</div>

<div style="position:absolute;left:477px;top:340px;">
	<Stack amount={$Player.Wager[0]}/>
</div>
{/key}

