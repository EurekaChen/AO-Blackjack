<script lang="ts">
	import { t, locales, locale } from '$lib';
</script>
<div>
    <span style="font-size: 24px;" role="img" aria-label="选择语言">🌐</span>
<select bind:value={$locale}>
	{#each $locales as value}
		<option {value}>{$t(`lang.${value}`)}</option>
	{/each}
</select>
</div>
<slot />


