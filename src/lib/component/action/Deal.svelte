<script lang="ts">
	import { Player } from '$lib/store/Player';	
	import { message, result,createDataItemSigner } from '@permaweb/aoconnect';
	import { bjProcess } from '$lib/index';
	import {Spinner} from '$lib/store/Spinner'

	async function deal() {		

		$Spinner.isWaiting=true;
		$Spinner.text="发牌中";

		//直接发送发牌信息
		const dealMsgId = await message({
			process: bjProcess,
			tags: [
				{ name: 'Action', value: 'Deal' },
				{ name: 'Quantity', value: $Player.state.hands[0].quantity.toString() }
			],
			signer: createDataItemSigner(window.arweaveWallet)
		});

		$Spinner.text="获取中"

		console.log("MsgId:",dealMsgId);

	    const readResult = await result({message:dealMsgId, process:bjProcess });

		console.log('结果信息：', readResult);
		$Spinner.text=$Spinner.defaultText;
        //更新状态
		
	}
</script>

<a href="./#" on:click={deal} style="text-decoration: none;">
	<svg width="60" height="60">
		<circle class="back" cx="30" cy="30" r="25" />
		<rect class="line" x="18" y="15" rx="2" ry="2" width="24" height="30" />
		<rect class="line" x="18" y="15" rx="2" ry="2" width="18" height="30" />
		<text x="22" y="36">♣</text>
		<circle class="hoverCircle" cx="30" cy="30" r="25" />
	</svg>
	<div style="color:#90caf9;text-align:center;font-weight:bolder">发 牌</div>
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
