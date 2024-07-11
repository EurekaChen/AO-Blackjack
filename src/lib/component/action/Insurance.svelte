<script lang="ts">
	import { bjProcess } from '$lib';
	import { Action } from '$lib/store/Action';
	import { Player } from '$lib/store/Player';
	import { Spinner } from '$lib/store/Spinner';
	import { Waiting } from '$lib/store/Waiting';
	import { createDataItemSigner, message, result } from '@permaweb/aoconnect';

 	async	function insurance() {

		if ($Player.balance < $Player.state.hands[0].amount/2) {
			$Waiting.alertClass = 'warning';
			$Waiting.waitingText = '余额不够保险';
			$Waiting.isWaiting = true;
			setTimeout(() => {
				$Waiting.isWaiting = false;
			}, 1000);
			return;
		}
		
		//下保险不清空！		
		//Action.clearAll();		
		Spinner.info('AO买保险');
		
		const insuranceMsgId = await message({
			process: bjProcess,
			tags: [{ name: 'Action', value: 'Insurance' }],
			signer: createDataItemSigner(window.arweaveWallet)
		});

		Spinner.result();
		const readResult = await result({ message: insuranceMsgId, process: bjProcess });
		console.log("保险结果:",readResult);
		const aoPlayerJson = readResult.Messages[0].Data;
		const aoPlayer = JSON.parse(aoPlayerJson);
		console.log("aoPlayer:",aoPlayer);
		$Spinner.isWaiting = false;

		let insuranceAmount = aoPlayer.state.insurance;		
		$Player.balance -= insuranceAmount;
		console.log("下保险:",insuranceAmount);
		$Player.state.insurance = insuranceAmount;
		//$Player=$Player;
		$Action.insurance=false;
		
	}
</script>

<a href="./#" on:click={insurance} style="text-decoration: none;">
	<svg width="60" height="60">
		<circle class="back" cx="30" cy="30" r="25" />	
		<text x="6" y="43" font-size="36">🛡️</text>
		<circle class="hoverCircle" cx="30" cy="30" r="25" />
	</svg>
	<div style="color:#90caf9;text-align:center;font-weight:bolder">保 险</div>
</a>

<style>
	.back {
		fill: #223344;
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
