<script lang="ts">
	import { bjProcess } from '$lib';
	import { createDataItemSigner,  message, result } from '@permaweb/aoconnect';
	import {Waiting } from '$lib/store/Waiting';

	let players;
	async function GetPlayers() {

		$Waiting.isWaiting=true;
		$Waiting.waitingText="从AO获取所有玩家信息";
		let msgId = await message({
			process: bjProcess,
			tags: [{ name: 'Action', value: 'GetPlayers' }],
			signer: createDataItemSigner(window.arweaveWallet)
		});
		
		console.log(msgId);
		$Waiting.waitingText="解析AO数据";
		let r = await result({ message: msgId, process: bjProcess });
		console.log(r);
		let data = r.Messages[0].Data;
		console.log(data);
		players = JSON.parse(data);
		console.log(players);		
		$Waiting.isWaiting=false;
	}
</script>


<button class="btn btn-primary" on:click={GetPlayers}>点击获取所有玩家信息</button>
{#if players}
<table class="table table-bordered table-striped">
    <thead>
        <tr>
            <th>名称</th>          
            <th>钱包地址</th>
			<th>筹码</th>
			<th>状态</th>
        </tr>
    </thead>
    <tbody>
        {#each players as player}
            <tr>
                <td>{player.name}</td>             
                <td title="{player.addr}">{player.addr.substring(0,6)}</td>
				<td>{player.balance}</td>
				<td>{player.state}</td>
            </tr>
        {/each}
    </tbody>
</table>
{/if}
