<script lang="ts">
	import { t } from '$lib/translations';
	const pageName = 'This page is Home page!';
</script>

<div>
	<!-- you can use `placeholders` and `modifiers` in your definitions (see docs) -->
	<h2>{$t('common.page', { pageName })}</h2>
	<p>{$t('home.content')}</p>
</div>
