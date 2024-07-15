<script lang="ts">
	import { ChipRank } from '$lib/store/Setting';
	import { Player } from '$lib/store/Player';
	import { Action } from '$lib/store/Action';
	import { Waiting } from '$lib/store/Waiting';
	import { t } from '$lib/i18n';

	//动画
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import Stack from './Stack.svelte';
	import { ChipPosition, MoveChip } from '$lib/store/MoveChip';
	let moveAmount=0;
	let startPosition = { left: 120, top: 360 };
	let endPosition = { left: 477, top: 340 };

	const position = tweened(startPosition, { duration: 600, easing: cubicOut });

	function startAnimation(amount:number) {
		moveAmount=amount;
		position.set(endPosition).then(() => {				
			position.set(startPosition, { duration: 0 });	
			$Player.state.hands[0].amount += amount;
			$Player=$Player;	
			moveAmount=0;
		});		
	}



	let chipOffset = 6;
	$: disabled = $Player.inGame;
	$: cursor = $Player.inGame ? 'cursor: not-allowed' : 'cursor: pointer';

	function downChip() {
		let down = document.getElementById('down');
		let up = document.getElementById('up');
		up.style.display = 'block';

		chipOffset--;
		if (chipOffset < 6) {
			chipOffset = 6;
			down.style.display = 'none';
		}
	}

	function upChip() {
		let down = document.getElementById('down');
		let up = document.getElementById('up');
		down.style.display = 'block';
		chipOffset++;
		if (chipOffset > 9) {
			chipOffset = 9;
			up.style.display = 'none';
		}
	}

	function betChip(amount: number) {
		//限额
		
		if (amount < 5 || $Player.state.hands[0].amount + amount > 5000) {
			$Waiting.alertClass = 'warning';
			$Waiting.waitingText = $t('action.outRange');
			$Waiting.isWaiting = true;
			setTimeout(() => {
				$Waiting.isWaiting = false;
			}, 1000);
			return;
		}
		//余额不够
		if ($Player.balance < amount) {
			$Waiting.alertClass = 'warning';
			$Waiting.waitingText = $t('action.balanceLack');
			$Waiting.isWaiting = true;
			setTimeout(() => {
				$Waiting.isWaiting = false;
			}, 1000);
			return;
		}

		//有牌才需要清一下
		if (!$Player.inGame && $Player.state.dealerCards.length > 0) {
			Player.clearState();
		}

		//减去数量
		$Player.balance -= amount;		
		//触发动画
		$MoveChip.startPosition = ChipPosition.player;
		$MoveChip.endPosition = ChipPosition.hand1;			
		$MoveChip.amount = amount;	
		//触发后添加

		Action.clearAll();
		Action.beforeDeal();
	}

	function handleClick(event) {
		if ($Player.inGame) {
			event.stopPropagation();
			event.preventDefault();
		}
	}
</script>

<div id="move" style="position:absolute;left:{$position.left}px;top:{$position.top}px;">
	<Stack amount={moveAmount} />
</div>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
 
<div id="chipSelector" class:disabled on:click|capture={handleClick}>
	<button on:click={downChip}>
		<img
			id="down"
			src="/img/chip/left-arrow.png"
			alt="down"
			style="width:30px;position:absolute;left:-2px;top:357px;{cursor};display:none"
		/>
	</button>

	<button on:click={() => betChip($ChipRank[chipOffset])}>
		<img
			id="chip0"
			src="/img/chip/{$ChipRank[chipOffset]}.png"
			alt="5"
			style="width:50px;position:absolute;left:20px;top:367px;{cursor};"
		/>
	</button>

	<button on:click={() => betChip($ChipRank[chipOffset + 1])}>
		<img
			id="chip1"
			src="/img/chip/{$ChipRank[chipOffset + 1]}.png"
			alt="25"
			style="width:50px;position:absolute;left:80px;top:395px;{cursor};"
		/>
	</button>

	<button on:click={() => betChip($ChipRank[chipOffset + 2])}>
		<img
			id="chip2"
			src="/img/chip/{$ChipRank[chipOffset + 2]}.png"
			alt="100"
			style="width:50px;position:absolute;left:138px;top:420px;{cursor};"
		/>
	</button>

	<button on:click={() => betChip($ChipRank[chipOffset + 3])}>
		<img
			id="chip3"
			src="/img/chip/{$ChipRank[chipOffset + 3]}.png"
			alt="500"
			style="width:50px;position:absolute;left:198px;top:443px;{cursor};"
		/>
	</button>

	<button on:click={upChip}>
		<img
			id="up"
			src="/img/chip/right-arrow.png"
			alt="right arrow"
			style="width:30px;position:absolute;left:255px;top:465px;{cursor};"
		/>
	</button>
</div>

<style>
	button {
		background: none;
		border: none;
	}
</style>
