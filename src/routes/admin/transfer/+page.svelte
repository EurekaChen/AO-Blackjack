<script lang="ts">
	import { bjProcess, egcProcess } from '$lib';
	import { createDataItemSigner } from '@permaweb/aoconnect';
	import { message, result } from '$lib/store/Setting';
	import { Waiting } from '$lib/store/Waiting';
	import { log } from '$lib/store/Debug';

	let addr = 'cjnNO4wraJdTCM4ANTdmCnOnBroT-0MPzKjEIzETTe0';	
	let data = '';
	let amount = 0;

	async function transfer() {

		data='Send({ Target ="'+egcProcess+'", Action = "Transfer", Recipient = "'+addr+'", Quantity = "'+amount*100+'"})';
		log(data);
		$Waiting.isWaiting = true;
		$Waiting.waitingText = '正在转账EGC';
		let msgId = await message({
			process: bjProcess,
			tags: [
				{ name: 'Action', value: 'Eval' }				
			],
			signer: createDataItemSigner(window.arweaveWallet),
			data
		});

		log("转账ID",msgId);
		$Waiting.waitingText = '解析数据';
		let tansferResult = await result({ message: msgId, process: bjProcess });
		$Waiting.isWaiting = false;
		log("转账信息:",tansferResult)
		data = tansferResult.Messages[0].Data;
		log("转账data:",data);		
		
	}
</script>

<div class="fs-5">请输入玩家钱包地址</div>
<input type="text" class="form-control" bind:value={addr} placeholder="请输入钱包地址" />
<div class="fs-5">请输入需转入EGC数量</div>
<input type="number" class="form-control" bind:value={amount} placeholder="金额数量" />
<hr />
<button class="btn btn-outline-primary form-control" on:click={transfer}>给玩家转账EGC</button>
