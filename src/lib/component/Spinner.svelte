<script lang="ts">
	import { Spinner } from '$lib/store/Spinner';
</script>

{#if $Spinner.isWaiting}
	<div class="text-center" style="position:absolute;left:920px; top:500px;">
		<div class="spinner-border text-{$Spinner.colorClass}">
			<span class="visually-hidden">Querying...</span>
		</div>
		<div class="text-{$Spinner.colorClass}">{$Spinner.text}</div>
	</div>
{/if}
