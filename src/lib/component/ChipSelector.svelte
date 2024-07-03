<script lang="ts">
	import {ChipRank} from '$lib/store/Setting'
	import { Game } from '$lib/store/Game';
	import { Player} from '$lib/store/Player';
	import {Action} from '$lib/store/Action';

	let chipOffset=0;

	function downChip() {
		let down = document.getElementById('down');
		let up = document.getElementById('up');
		up.style.display = 'block';
		
		chipOffset--;
		if (chipOffset < 0) {
			chipOffset = 0;
			down.style.display = 'none';
		}
	}

	function upChip() {
		let down = document.getElementById('down');
		let up = document.getElementById('up');
		down.style.display = 'block';
		chipOffset++;
		if (chipOffset > 3) {
			chipOffset = 3;
			up.style.display = 'none';
		}
	}

	function betChip(amt:number) {
		if ($Game.State == 1) return;		

		if ($Player.Balance < amt) {
			amt = $Player.Balance;
		}

		if (amt < 5) {
			//Game.UpdateButtons();
			return;
		}
		$Player.Balance-=amt;
		$Player.Wager[0]+=amt;		

		$Action.doubleChip=true;
		$Action.deal=true;
		$Action.clear=true;

		console.log($Player.Wager);
		
	}
</script>

<div id="chipSelector">
	<a href="./#" on:click={downChip}>
	<img
		id="down"
		src="/img/chip/left-arrow.png"
		alt="down"
		style="width:30px;position:absolute;left:-2px;top:357px;cursor:pointer;display:none"		
	/>
	</a>

	<a href="./#" on:click={() => betChip($ChipRank[chipOffset])}>
	<img
		id="chip0"
		src="/img/chip/{$ChipRank[chipOffset]}.png"
		alt="5"
		style="width:50px;position:absolute;left:20px;top:367px;cursor:pointer;"		
	/>
	</a>

	<img
		id="chip1"
		src="/img/chip/{$ChipRank[chipOffset+1]}.png"
		alt="25"
		style="width:50px;position:absolute;left:80px;top:395px;cursor:pointer;"
		on:click={() => betChip($ChipRank[chipOffset+1])}
	/>

	<img
		id="chip2"
		src="/img/chip/{$ChipRank[chipOffset+2]}.png"
		alt="100"
		style="width:50px;position:absolute;left:138px;top:420px;cursor:pointer;"
		on:click={() => betChip($ChipRank[chipOffset+2])}
	/>

	<img
		id="chip3"
		src="/img/chip/{$ChipRank[chipOffset+3]}.png"
		alt="500"
		style="width:50px;position:absolute;left:198px;top:443px;cursor:pointe;"
		on:click={() => betChip($ChipRank[chipOffset+3])}
	/>

	<img
		id="up"
		src="/img/chip/right-arrow.png"
		alt="right arrow"
		style="width:30px;position:absolute;left:255px;top:465px;cursor:pointer;"
		on:click={upChip}
	/>
</div>
