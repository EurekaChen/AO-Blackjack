<script lang="ts">	
	import { Player } from '$lib/store/Player';
	import Hand from './Hand.svelte';
</script>

{#key $Player.state.dealerCards}
	<div style="position:absolute;left:430px;top:62px;">
		<Hand hand={$Player.state.dealerCards} />
	</div>

	<div style="position:absolute;left:430px;top:360px;">
		<Hand hand={$Player.state.hands[0].cards} />
	</div>

	{#if $Player.state.hands.length > 1}
		<div style="position:absolute;left:630px;top:300px;">
			<Hand hand={$Player.state.hands[1].cards} />
		</div>
	{/if}
{/key}
