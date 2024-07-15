<script lang="ts">
	import Stack from '$lib/component/Stack.svelte';
	import { Player } from '$lib/store/Player';
</script>

<div style="position:absolute;left:120px;top:360px;">
	<Stack amount={$Player.balance} />
</div>

<div style="position:absolute;left:477px;top:340px;">
	<Stack amount={$Player.state.hands[0].amount} />
</div>

<div style="position:absolute;left:677px;top:280px;">
	<Stack amount={$Player.state.hands[1].amount} />
</div>

<div style="position:absolute;left:310px;top:170px;">
	<Stack amount={$Player.state.insurance} />
</div>
