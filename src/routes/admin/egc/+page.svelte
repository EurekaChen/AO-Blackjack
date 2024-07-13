<script lang="ts">
	import { egcProcess } from '$lib';
	import { createDataItemSigner } from '@permaweb/aoconnect';
	import { message, result } from '$lib/store/Setting';
	import {Waiting } from '$lib/store/Waiting';

	let egcTable;
	async function GetPlayers() {

		$Waiting.isWaiting=true;
		$Waiting.waitingText="从AO获取所有地址EGC余额信息";
		let msgId = await message({
			process: egcProcess,
			tags: [{ name: 'Action', value: 'Balances' }],
			signer: createDataItemSigner(window.arweaveWallet)
		});
		
		console.log(msgId);
		$Waiting.waitingText="解析AO数据";
		let r = await result({ message: msgId, process: egcProcess });
		console.log(r);
		let data = r.Messages[0].Data;
		console.log(data);
		egcTable = JSON.parse(data);		
		console.log(egcTable);		
		$Waiting.isWaiting=false;
	}
</script>


<button class="btn btn-primary" on:click={GetPlayers}>点击获取所有玩家信息</button>
{#if egcTable}
<table class="table table-bordered table-striped">
    <thead>
        <tr>              
            <th>钱包地址</th>
			<th>EGC数量</th>			
        </tr>
    </thead>
    <tbody>
        {#each  Object.entries(egcTable) as [key, value]}
            <tr>
                <td>{key}</td>                             
				<td>{value}</td>				
            </tr>
        {/each}
    </tbody>
</table>
{/if}
