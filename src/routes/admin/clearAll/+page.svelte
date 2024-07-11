<script lang="ts">
	import { bjProcess } from '$lib';
	import { createDataItemSigner,  message, result } from '@permaweb/aoconnect';
	import {Waiting } from '$lib/store/Waiting';

	let players;
	async function GetPlayers() {

		$Waiting.isWaiting=true;
		$Waiting.waitingText="AO清除所有玩家";
		let msgId = await message({
			process: bjProcess,
			tags: [{ name: 'Action', value: 'Eval' }],
			signer: createDataItemSigner(window.arweaveWallet),
			data:"Players = {}"
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


<button class="btn btn-primary" on:click={GetPlayers}>点击清理（删除）所有玩家</button>

