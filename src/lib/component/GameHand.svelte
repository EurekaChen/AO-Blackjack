<script lang="ts">
	import { Dealer } from '$lib/store/Dealer';
	import { Player } from '$lib/store/Player';
	import Hand from './Hand.svelte';
</script>

{#key $Dealer.Hand}
	<div style="position:absolute;left:430px;top:62px;">
		<Hand hand={$Dealer.Hand} />		
	</div>

	<div style="position:absolute;left:430px;top:360px;">
		<Hand hand={$Player.Hand} />
	</div>
{/key}
