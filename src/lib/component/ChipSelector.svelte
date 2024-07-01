<script lang="ts">
	import { Game } from '$lib/store/Game';

	function downChip() {
		let down = document.getElementById('down');
		let up = document.getElementById('up');
		up.style.display = 'block';
		$Game.ChipOffset--;
		if ($Game.ChipOffset < 6) {
			$Game.ChipOffset = 6;
			down.style.display = 'none';
		}
	}

	function upChip() {
		let down = document.getElementById('down');
		let up = document.getElementById('up');
		down.style.display = 'block';
		$Game.ChipOffset++;
		if ($Game.ChipOffset > 9) {
			$Game.ChipOffset = 9;
			up.style.display = 'none';
		}
	}

	function betChip() {
		if (Game.State == 1) return;
		//if(Game.State==2) Game.NewHand();

		//Game.DisableButtons();

		if (Player.Bankroll.Amount < amt) {
			amt = Player.Bankroll.Amount;
		}

		if (amt < 1) {
			Game.UpdateButtons();
			return;
		}

		Player.Bankroll.Decrease(amt);

		var delay = 0;
		var speed = Obj.Turbo.checked ? 10 : 250;
		var stack = Player.Wager[0].Stack;
		var slider = Player.Wager[0].Slider;
		var x1 = Player.Bankroll.Left;
		var y1 = Player.Bankroll.Top;
		var x2 = Player.Wager[0].Left;
		var y2 = Player.Wager[0].Top;

		slider.MoveTo(x1, y1);
		slider.innerHTML = ChipStackHTML(amt);

		delay = slider.Slide(x1, y1, x2, y2, 100, speed, delay);

		setTimeout(
			function () {
				slider.innerHTML = '';
				Player.Wager[0].Increase(amt);
				Game.UpdateButtons();
			},

			delay
		);

		return delay;
	}
</script>

<div id="chipSelector">
	<img
		id="down"
		src="/img/chip/left-arrow.png"
		alt="5"
		style="width:30px;position:absolute;left:-2px;top:357px;cursor:pointer;display:none"
		on:click={downChip}
	/>

	<img
		id="chip0"
		src="/img/chip/{$Game.ChipName[$Game.ChipOffset - 6]}.png"
		alt="5"
		style="width:50px;position:absolute;left:20px;top:367px"
		on:click={() => betChip(0)}
	/>

	<img
		id="chip1"
		src="/img/chip/{$Game.ChipName[$Game.ChipOffset - 5]}.png"
		alt="25"
		style="width:50px;position:absolute;left:80px;top:395px;"
		on:click={() => betChip(1)}
	/>

	<img
		id="chip2"
		src="/img/chip/{$Game.ChipName[$Game.ChipOffset - 4]}.png"
		alt="100"
		style="width:50px;position:absolute;left:138px;top:420px"
		on:click={() => betChip(2)}
	/>

	<img
		id="chip3"
		src="/img/chip/{$Game.ChipName[$Game.ChipOffset - 3]}.png"
		alt="500"
		style="width:50px;position:absolute;left:198px;top:443px"
		on:click={() => betChip(3)}
	/>

	<img
		id="up"
		src="/img/chip/right-arrow.png"
		alt="right arrow"
		style="width:30px;position:absolute;left:255px;top:465px;cursor:pointer"
		on:click={upChip}
	/>
</div>
