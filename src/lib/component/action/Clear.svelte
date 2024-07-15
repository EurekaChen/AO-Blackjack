<script lang="ts">
	import { Player } from '$lib/store/Player';
	import { Action } from '$lib/store/Action';
	import { t } from '$lib/i18n';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import Stack from '../Stack.svelte';

	//实现动画效果：
	let clearAmount=0;
	let startPosition = { left: -305, top: -85 };
	let endPosition = { left: -660, top: -65 };

	const position = tweened(startPosition, { duration: 600, easing: cubicOut });

	function clear() {
		clearAmount=$Player.state.hands[0].amount;
		$Player.state.hands[0].amount = 0;
		//不会有数据：$Player.state.hands[1].amount = 0;		
		position.set(endPosition).then(() => {				
			position.set(startPosition, { duration: 0 });				
			$Player.balance = $Player.balance + clearAmount;				
			clearAmount=0;
			Action.clearAll();
		});		
	}
</script>

<div style="position:absolute;left:{$position.left}px;top:{$position.top}px;">
	<Stack amount={clearAmount} />
</div>

<a href="./#" on:click={clear} style="text-decoration: none;">
	<svg width="60" height="60">
		<circle class="back" cx="30" cy="30" r="25" />
		<text x="19" y="39" font-size="26">✕</text>
		<circle class="hoverCircle" cx="30" cy="30" r="25" />
	</svg>
	<div style="color:#cccccc;text-align:center;font-weight:bolder">{$t('action.clear')}</div>
</a>

<style>
	.back {
		fill: #223344;
	}

	text {
		fill: #cccccc;
		font-weight: bolder;
	}

	.hoverCircle {
		stroke-width: 2;
		stroke: #cccccc;
		fill: transparent;
		transition: all 0.3s ease;
	}

	.hoverCircle:hover {
		stroke-width: 6;
	}
</style>
