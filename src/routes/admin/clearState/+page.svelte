<script lang="ts">
	import { bjProcess } from '$lib';
	import { createDataItemSigner, message, result } from '@permaweb/aoconnect';
	import { Waiting } from '$lib/store/Waiting';
	import PlayerPanel from '$lib/component/PlayerPanel.svelte';

	let addr = 'cjnNO4wraJdTCM4ANTdmCnOnBroT-0MPzKjEIzETTe0';
	let player="";
	let data=""
	
	async function clearState() {
		$Waiting.isWaiting = true;
		$Waiting.waitingText = '获取玩家信息';
		let msgId = await message({
			process: bjProcess,
			tags: [{ name: 'Action', value: 'ClearState' }],
			signer: createDataItemSigner(window.arweaveWallet),
			data:addr
		});

		console.log(msgId);
		$Waiting.waitingText = '解析数据';
		let r = await result({ message: msgId, process: bjProcess });		
		data = r.Messages[0].Data;		
		console.log(data);
		player = JSON.parse(data);

		console.log(player);

		player=JSON.stringify(player,null,2)
		$Waiting.isWaiting = false;	
		
	}
</script>

<div class="fs-5">请输入玩家钱包地址</div>
<input
	type="text"
	class="form-control"
	bind:value={addr}
	placeholder="请输入钱包地址"
/>
<hr />
<button class="btn btn-outline-primary form-control" on:click={clearState}>清理玩家状态</button>
<pre>
	{player}	
</pre>
