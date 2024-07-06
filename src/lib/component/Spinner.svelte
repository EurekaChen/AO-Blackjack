<script lang="ts">
	import { Spinner } from '$lib/store/Spinner';		
</script>

{#if $Spinner.isWaiting}
	<div
		class="spinner-border text-{$Spinner.colorClass}"
		style="position:absolute; width:1024px; margin-top:240px;">
		<span class="visually-hidden">{$Spinner.text}</span>
	>		
	</div>
{/if}
