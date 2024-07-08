<script lang="ts">
	import { Player } from '$lib/store/Player';	
	import { Action } from '$lib/store/Action';
	import { Spinner } from '$lib/store/Spinner';
	import { createDataItemSigner, message, result } from '@permaweb/aoconnect';
	import { bjProcess } from '$lib';
	import { Waiting } from '$lib/store/Waiting';
	import { Indicator } from '$lib/store/Indicator';
	
 	async	function hit() {
		$Spinner.isWaiting = true;
		$Spinner.text = '要牌中';
		$Spinner.colorClass="info";

		//直接发送发牌信息
		const hitMsgId = await message({
			process: bjProcess,
			tags: [
				{ name: 'Action', value: 'Hit' },			
			],
			signer: createDataItemSigner(window.arweaveWallet)
		});

		$Spinner.text = '解析中';	
		$Spinner.colorClass="success"

		const readResult = await result({ message: hitMsgId, process: bjProcess });

		console.log('结果信息：', readResult);
		console.log(readResult.Messages[0].Data);
		
		$Spinner.text = $Spinner.defaultText;
		$Spinner.isWaiting = false;	

		//更新状态
		let data:string = readResult.Messages[0].Data;

		let hitInfo=JSON.parse(data)
		if(hitInfo.dealerCard)
		{
			//返回庄家的牌，说明已经爆了！
			Action.clearAll();
			$Action.newHand = true;			
			$Waiting.isWaiting=true;
			$Waiting.alertClass="danger";
			$Waiting.confirm=true;
			$Waiting.waitingText="暴牌了！"

			$Player.state.hands[0].cards.push(hitInfo.playerCard);
			$Player.state.dealerCards.push(hitInfo.dealerCard);

			//清掉筹码
			$Player.state.hands[0].amount=0;
			//更新
			$Player=$Player;			

			Indicator.win(-hitInfo.balance);		
			
		}
		else{					
			$Player.state.hands[0].cards.push(hitInfo.playerCard);
			console.log("发到牌："+hitInfo.playerCard);	
			//更新牌界面
			$Player=$Player;
		}		
	}
</script>

<a href="./#" on:click={hit} style="text-decoration: none;">
	<svg width="60" height="60">
		<circle class="back" cx="30" cy="30" r="25" />
		<rect class="line" x="27" y="15" rx="2" ry="2" width="18" height="30" />
		<text x="31" y="36">♠</text>
		<text x="8" y="38" font-size="24" font-weight="bolder">+</text>
		<circle class="hoverCircle" cx="30" cy="30" r="25" />
	</svg>
	<div style="color:#90caf9;text-align:center;font-weight:bolder">要 牌</div>
</a>

<style>
	.back {
		fill: #223344;
	}

	.line {
		stroke: #90caf9;
		stroke-width: 2;
		fill: #0d47a1;
	}

	text {
		fill: #90caf9;
		font-weight: bolder;
	}

	.hoverCircle {
		stroke-width: 2;
		stroke: #90caf9;
		fill: transparent;
		transition: all 0.3s ease;
	}

	.hoverCircle:hover {
		stroke-width: 6;
	}
</style>
