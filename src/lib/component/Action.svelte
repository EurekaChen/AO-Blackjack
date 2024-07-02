<script lang="ts">
	
	import { Player }from '$lib/store/Player';
	import { Dealer }from '$lib/store/Dealer';
	import {Action} from '$lib/store/Action';

	import doubleSvg from '$lib/svg/double.svg?raw';
	import clearSvg from '$lib/svg/clear.svg?raw';
	
	//不会更新！
	console.log("double:",doubleChip);
	
	function doubleChip() {
		//if ($Game.State == 1) return;
		
		let amt=$Player.Wager[0];
		if($Player.Balance>=amt)
		{		
			$Player.Balance -=amt;
			$Player.Wager[0] +=amt;			
		}
	}	

	//加倍后发牌并结束！
	function doubleBet() {
		//if ($Game.State == 1) return;
		
		let amt=$Player.Wager[0];
		if($Player.Balance>=amt)
		{		
			$Player.Balance -=amt;
			$Player.Wager[0] +=amt;			
		}
		//结束！
	}	

	function deal() {
		//if ($Game.State == 1) return;
		$Dealer.Hand=["Qs","hole"];
		$Player.Hand=["Th","8s"];	
		$Action.deal=false;
		$Action.hit=true;
		$Action.clear=false;
		$Action.stand=true;
		$Action.doubleChip=false;
		$Action.doubleBet=true;
		console.log("点了发牌按钮")	
	}	

	function clear() {
		//if ($Game.State == 1) return;		

		$Dealer.Hand=[];
		$Player.Hand=[];	
		let amt=$Player.Wager[0];
		$Player.Balance +=amt;
		$Player.Wager[0] =0;		
		$Action.clear=false;
		$Action.deal=false;
		$Action.doubleChip=false;	
		$Action.hit=false;
	}

	function stand(){
		
	}

	function hit(){

	}

</script>
<style>
	.text{
		margin-top:-4px;text-align:center;font-weight: bolder;
	}	 
</style>

{#key doubleChip}
<div style="color:green; position:absolute;left:580px;top:480px;cursor:pointer;display:{$Action.doubleChip?"block":"none"}" on:click={doubleChip}>	
	{@html doubleSvg }
 	<div class="text" style="color:#ff9800">加 倍</div>	
	<div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0;"></div>
</div>

<div style="position:absolute;left:580px;top:480px;cursor:pointer;display:{$Action.stand?"block":"none"}" on:click={stand}>	
	<object data="/img/action/stand.svg" title="double" style="width:60;height:60;" />
 	<div class="text" style="color:#DD443B">停 牌</div>	
	<div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0;"></div>
</div>


<div id="deal" style="position:absolute;left:680px;top:458px;cursor:pointer;display:{$Action.deal?"block":"none"}" on:click={deal}>
	<object data="/img/action/deal.svg" title="deal" style="width:60;height:60;fill:green" />
 	<div class="text" style="color:#90caf9">发 牌</div>
	<div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0;"></div>
</div>

<div id="hit" style="position:absolute;left:680px;top:458px;cursor:pointer;display:{$Action.hit?"block":"none"}" on:click={hit}>
	<object data="/img/action/deal.svg" title="hit" style="width:60;height:60;fill:green" />
 	<div class="text" style="color:#90caf9">要 牌</div>
	<div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0;"></div>
</div>


<div style="position:absolute;left:780px;top:426px;cursor:pointer;display:{$Action.clear?"block":"none"}" on:click={clear}>
	{@html clearSvg }
 	<div class="text" style="color:#cccccc">清 除</div>	
</div>


<div style="position:absolute;left:780px;top:426px;cursor:pointer;display:{$Action.doubleBet?"block":"none"}" on:click={doubleBet}>
	<object data="/img/action/double.svg" title="hit" style="width:60;height:60;fill:green" />
 	<div class="text" style="color:#ff9800">加 倍</div>
	<div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0;"></div>
</div>

{/key}
