<script lang="ts">	
	import { Player } from '$lib/store/Player';
	import Hand from './Hand.svelte';

	$:activeHandIndex= $Player.state.activeHandIndex;
	let hand1Inactive:boolean;
	let hand2Inactive:boolean;
	$:if(activeHandIndex==-1)
	{
		hand1Inactive=true;
		hand2Inactive=true;
	}
	else if(activeHandIndex==0)
	{
		hand2Inactive=true;
		hand1Inactive=false;
	}
	else if(activeHandIndex==1){
		hand1Inactive=true;
		hand2Inactive=false;
	}

</script>

{#key $Player.state.dealerCards}
	<div style="position:absolute;left:430px;top:62px;">
		<Hand hand={$Player.state.dealerCards} />
	</div>

	<div style="position:absolute;left:430px;top:360px;">
		<Hand hand={$Player.state.hands[0].cards} inactive={hand1Inactive}/>
	</div>

	{#if $Player.state.hands.length > 1}
		<div style="position:absolute;left:630px;top:300px;">
			<Hand hand={$Player.state.hands[1].cards} inactive={hand2Inactive} />
		</div>
	{/if}
{/key}
