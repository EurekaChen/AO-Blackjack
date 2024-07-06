<script lang="ts">
	import { bjProcess } from '$lib';
	import { createDataItemSigner, message, result } from '@permaweb/aoconnect';
	import { Waiting } from '$lib/store/Waiting';

	let addr = 'cjnNO4wraJdTCM4ANTdmCnOnBroT-0MPzKjEIzETTe0';
	let players: any;
	let playerState;
	async function GetPlayerByAddr() {
		$Waiting.isWaiting = true;
		$Waiting.waitingText = '获取MsgID';
		let msgId = await message({
			process: bjProcess,
			tags: [{ name: 'Action', value: 'GetPlayers' }],
			signer: createDataItemSigner(window.arweaveWallet)
		});

		console.log(msgId);
		$Waiting.waitingText = '解析数据';
		let r = await result({ message: msgId, process: bjProcess });
		console.log(r);
		let data = r.Messages[0].Data;
		console.log(data);
		players = JSON.parse(data);

		console.log(players);
		$Waiting.isWaiting = false;

		players.forEach((player) => {
			if (player.addr == addr) {
				playerState = player.state;
			}
		});

		console.log("state:",playerState)
	}
</script>

<div class="fs-4">请输入地址</div>
<input
	type="text"
	class="form-control rounded-3 w-50 mx-auto m-1 h-75"
	bind:value={addr}
	placeholder="请输入钱包地址"
/>
<button class="btn btn-primary" on:click={GetPlayerByAddr}>获取玩家信息</button>

{#if players}
	<table class="table table-bordered table-striped">
		<thead>
			<tr>
				<th>名称</th>
				<th>进程</th>
				<th>钱包地址</th>
				<th>筹码</th>
				<th>状态</th>
			</tr>
		</thead>
		<tbody>
			{#each players as player}
				<tr>
					<td>{player.name}</td>
					<td>{player.process}</td>
					<td>{player.addr}</td>
					<td>{player.quantity / 100}</td>
					<td>{player.state}</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
