<script lang="ts">
	import { Waiting } from '$lib/store/Waiting';
	function confirm() {
		$Waiting.isWaiting = false;
		$Waiting.confirm=false;
	}
</script>

{#if $Waiting.isWaiting}
	<div
		class="text-center alert alert-{$Waiting.alertClass}"
		style="position:absolute; width:1024px; margin-top:220px;padding:40px;"
	>
		<h3>{@html $Waiting.waitingText}</h3>
		{#if $Waiting.confirm}
			<button class="btn btn-primary " on:click={confirm}> OK </button>
		{/if}
	</div>
{/if}
