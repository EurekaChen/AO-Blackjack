<script lang="ts">
    import {Waiting } from '$lib/store/Waiting';
</script>

{#if $Waiting.isWaiting}
	<h2
		class="text-center alert alert-{$Waiting.alertClass}"
		style="position:absolute; width:1024px; margin-top:220px;padding:40px;"
	>
		{$Waiting.waitingText}
	</h2>
{/if}
