<script lang="ts">
	import Stack from '$lib/component/Stack.svelte';
	import { Player } from '$lib/store/Player';
</script>

{#key $Player.quantity}
	<div style="position:absolute;left:120px;top:360px;">
		<Stack amount={$Player.amount} />
	</div>

	<div style="position:absolute;left:477px;top:340px;">
		<Stack amount={$Player.state.hands[0].quantity/100} />
	</div>

	{#if $Player.state.hands.length > 1}
		<div style="position:absolute;left:677px;top:280px;">
			<Stack amount={$Player.state.hands[0].quantity/100} />
		</div>
	{/if}
{/key}
