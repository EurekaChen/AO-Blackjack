<script lang="ts">
	import { Player } from '$lib/store/Player';
	import Stack from './Stack.svelte';

	//移动筹码产生一个动画
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { ChipPosition, MoveChip } from '$lib/store/MoveChip';

	let moveAmount = 0;
	let position = tweened($MoveChip.startPosition, { duration: 600, easing: cubicOut });

	//数量大于0时触发移动
	$: if ($MoveChip.amount > 0) {
		position = tweened($MoveChip.startPosition, { duration: 600, easing: cubicOut });
		moveAmount = $MoveChip.amount;
		position.set($MoveChip.endPosition).then(() => {
			//移动结束后再加筹码
			if ($MoveChip.endPosition == ChipPosition.player) {
				$Player.balance += moveAmount;
			} else if ($MoveChip.endPosition == ChipPosition.hand1) {
				$Player.state.hands[0].amount += moveAmount;
			} else if ($MoveChip.endPosition == ChipPosition.hand2) {
				$Player.state.hands[1].amount += moveAmount;
			} else if ($MoveChip.endPosition == ChipPosition.insurance) {
				$Player.state.insurance += moveAmount;
			}
			//不显示移动后的筹码
			moveAmount = 0;
		});
		//停止触发移动
		$MoveChip.amount = 0;
	}
</script>

<div style="position:absolute;left:{$position.left}px;top:{$position.top}px;">
	<Stack amount={moveAmount} />
</div>

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
