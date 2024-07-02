<script lang="ts">
	export let hand:string[]=[];
</script>

{#key hand}
<div style="position:absolute">
	{#each hand as card,i }
		<img src="/img/card/{card}.png" width="80px" alt="{card}" style="position:absolute;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);left:{25*i}px" />
	{/each}
</div>
{/key}

