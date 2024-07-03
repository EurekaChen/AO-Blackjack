<script lang="ts">
	import { Prompt } from '$lib/store/Prompt';
</script>

{#key $Prompt}
	<div style="color:white">
		<ul>
			{#each $Prompt as p}
				<li>
					{p}
				</li>
			{/each}
		</ul>
	</div>
{/key}
