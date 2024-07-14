<script lang="ts">
	import { bjProcess } from '$lib';
	import { createDataItemSigner } from '@permaweb/aoconnect';
	import { message, result } from '$lib/store/Setting';
	import { Waiting } from '$lib/store/Waiting';

	let addr = 'cjnNO4wraJdTCM4ANTdmCnOnBroT-0MPzKjEIzETTe0';
	let player = '';
	let data = '';
	let amount = 0;

	async function addBalance() {
		$Waiting.isWaiting = true;
		$Waiting.waitingText = '添加玩家余额';
		let msgId = await message({
			process: bjProcess,
			tags: [
				{ name: 'Action', value: 'AddBalance' },
				{ name: 'Amount', value: amount.toString() },
				{ name: 'Addr', value: addr }
			],
			signer: createDataItemSigner(window.arweaveWallet),
			data: amount.toString()
		});

		console.log(msgId);
		$Waiting.waitingText = '解析数据';
		let r = await result({ message: msgId, process: bjProcess });
		data = r.Messages[0].Data;
		console.log(data);
		player = JSON.parse(data);

		console.log(player);

		player = JSON.stringify(player, null, 2);
		$Waiting.isWaiting = false;
	}
</script>

<div class="fs-5">请输入玩家钱包地址</div>
<input type="text" class="form-control" bind:value={addr} placeholder="请输入钱包地址" />
<div class="fs-5">请输入玩家余额</div>
<input type="number" class="form-control" bind:value={amount} placeholder="金额数量" />
<hr />
<button class="btn btn-outline-primary form-control" on:click={addBalance}>添加玩家余额</button>
<pre>
	{player}	
</pre>
