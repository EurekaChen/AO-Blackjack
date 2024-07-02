<script lang="ts">
	import { Game } from '$lib/store/Game';
	import { Player }from '$lib/store/Player'


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

		console.log($Player.Wager);		
	}

	function clear() {
		//if ($Game.State == 1) return;		

		let amt=$Player.Wager[0];
		$Player.Balance +=amt;
		$Player.Wager[0] =0;			
	}

	function double() {
		//if ($Game.State == 1) return;
		
		let amt=$Player.Wager[0];
		if($Player.Balance>=amt)
		{		
			$Player.Balance -=amt;
			$Player.Wager[0] +=amt;			
		}
	}

</script>
<style>
	.text{
		margin-top:-4px;text-align:center;font-weight: bolder;
	}	 
</style>

<div style="position:absolute;left:580px;top:480px;cursor:pointer;" on:click={double}>	
	<object data="/img/action/double.svg" title="double" style="width:60;height:60;" />
 	<div class="text" style="color:#ff9800">加 倍</div>	
	<div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0;"></div>
</div>


<div id="deal" style="position:absolute;left:680px;top:458px;cursor:pointer;">
	<object data="/img/action/deal.svg" title="hit" style="width:60;height:60;fill:green" />
 	<div class="text" style="color:#90caf9">发 牌</div>
</div>

<div style="position:absolute;left:780px;top:426px;cursor:pointer;" on:click={clear}>
	<object data="/img/action/clear.svg" title="hit" style="width:60;height:60;fill:green" />
 	<div class="text" style="color:#cccccc">清 除</div>
	<div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0;"></div>
</div>


