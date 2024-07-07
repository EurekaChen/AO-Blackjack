<script lang="ts">
	import { Player } from '$lib/store/Player';
	import { message, result, createDataItemSigner } from '@permaweb/aoconnect';
	import { bjProcess } from '$lib/index';
	import { Spinner } from '$lib/store/Spinner';
	import { Dealer } from '$lib/store/Dealer';
	import { Action } from '$lib/store/Action';

	async function stand() {
		$Spinner.isWaiting = true;
		$Spinner.text = '停牌中';

		//直接发送发牌信息
		const standMsgId = await message({
			process: bjProcess,
			tags: [{ name: 'Action', value: 'Stand' }],
			signer: createDataItemSigner(window.arweaveWallet)
		});

		$Spinner.text = '请稍候';

		console.log('MsgId:', standMsgId);

		const readResult = await result({ message: standMsgId, process: bjProcess });

		console.log('结果信息：', readResult);
		$Spinner.text = $Spinner.defaultText;
		//更新状态
		$Spinner.isWaiting = false;

		const msgData = readResult.Messages[0].Data;
		const info = JSON.parse(msgData);

		//两种情况，一种是发下一手牌，一种是庄家发到牌
		if (info.activeHandIndex) {
			//下一手split
		} else {
			$Dealer.cards = info.dealerCards;
			$Player.balance = info.balance;
			$Player.state.hands[0].amount=0;
			Action.clearAll();
		}
	}
</script>

<a href="./#" on:click={stand} style="text-decoration: none;">
	<svg width="60" height="60">
		<circle class="back" cx="30" cy="30" r="25" />
		<text x="30" y="43" font-size="35">⃠</text>
		<circle class="hoverCircle" cx="30" cy="30" r="25" />
	</svg>
	<div style="color:#DD443B;text-align:center;font-weight:bolder">停 牌</div>
</a>

<style>
	.back {
		fill: #223344;
	}

	text {
		fill: #dd443b;
		font-weight: bolder;
	}

	.hoverCircle {
		stroke-width: 2;
		stroke: #dd443b;
		fill: transparent;
		transition: all 0.3s ease;
	}

	.hoverCircle:hover {
		stroke-width: 6;
	}
</style>
