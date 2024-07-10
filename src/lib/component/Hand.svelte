<script lang="ts">
	export let hand: string[] = [];
	let haveHoleCard = hand.length == 1 ? true : false;
	export let inactive=false;
	$:disabled=inactive?"filter: brightness(50%);":"filter: brightness(100%);";
</script>

{#key hand}
	<div style="position:absolute">
		{#each hand as card, i}
			<img
				src="/img/card/{card}.png"
				width="80px"
				alt={card}
				style="position:absolute;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);left:{25 * i}px;{disabled}"
			/>
		{/each}
		{#if haveHoleCard}
			<img
				src="/img/card/hole.png"
				width="80px"
				alt="Hole Card"
				style="position:absolute;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);left:25px;"
			/>
		{/if}
	</div>
{/key}
