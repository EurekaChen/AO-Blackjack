<script lang="ts">
	import { Dealer } from '$lib/store/Dealer';
	import { Player } from '$lib/store/Player';
	import Hand from './Hand.svelte';
</script>

{#key $Dealer.hand}
	<div style="position:absolute;left:430px;top:62px;">
		<Hand hand={$Dealer.hand} />
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
