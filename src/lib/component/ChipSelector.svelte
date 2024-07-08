<script lang="ts">
	import { ChipRank } from '$lib/store/Setting';	
	import { Player } from '$lib/store/Player';
	import { Action } from '$lib/store/Action';

	let chipOffset = 6;
	let disabled = false;

	//发了两张牌，不能再去改变筹码
	$: {
		if ($Player.state.hands[0].cards.length > 1) {
			disabled = true;
		}
		else{
			disabled=false;
		}
		console.log('disabled:', disabled);
	}

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
		console.log("下注",amount);				

		if ($Player.balance < amount) {
			amount = $Player.balance;
		}
		
		//限额
		if(amount<5 || amount>5000) return
		
		$Player.balance -= amount;
		$Player.state.hands[0].amount += amount;

		Action.clearAll();
		Action.beforeDeal();	
	}

	function handleClick(event) {
		if (disabled) {
			event.stopPropagation();
			event.preventDefault();
		}
	}
</script>
<style>
	button{
		background: none;
		border: none;
	}
</style>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div id="chipSelector" class:disabled on:click|capture={handleClick}>
	<button on:click={downChip}>
		<img
			id="down"
			src="/img/chip/left-arrow.png"
			alt="down"
			style="width:30px;position:absolute;left:-2px;top:357px;cursor:pointer;display:none"
		/>
	</button>

	<button on:click={() => betChip($ChipRank[chipOffset])}>
		<img
			id="chip0"
			src="/img/chip/{$ChipRank[chipOffset]}.png"
			alt="5"
			style="width:50px;position:absolute;left:20px;top:367px;cursor:pointer;"
		/>
	</button>

	<button on:click={() => betChip($ChipRank[chipOffset + 1])}>
		<img
			id="chip1"
			src="/img/chip/{$ChipRank[chipOffset + 1]}.png"
			alt="25"
			style="width:50px;position:absolute;left:80px;top:395px;cursor:pointer;"
		/>
	</button>

	<button on:click={() => betChip($ChipRank[chipOffset + 2])}>
		<img
			id="chip2"
			src="/img/chip/{$ChipRank[chipOffset + 2]}.png"
			alt="100"
			style="width:50px;position:absolute;left:138px;top:420px;cursor:pointer;"
		/>
	</button>

	<button on:click={() => betChip($ChipRank[chipOffset + 3])}>
		<img
			id="chip3"
			src="/img/chip/{$ChipRank[chipOffset + 3]}.png"
			alt="500"
			style="width:50px;position:absolute;left:198px;top:443px;cursor:pointe;"
		/>
	</button>

	<button on:click={upChip}>
		<img
			id="up"
			src="/img/chip/right-arrow.png"
			alt="right arrow"
			style="width:30px;position:absolute;left:255px;top:465px;cursor:pointer;"
		/>
	</button>
</div>
