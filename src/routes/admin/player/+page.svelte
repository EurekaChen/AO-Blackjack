<script lang="ts">
	import { bjProcess } from '$lib';
	import { createDataItemSigner } from '@permaweb/aoconnect';
	import { message, result } from '$lib/store/Setting';
	import { Waiting } from '$lib/store/Waiting';

	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { log } from '$lib/store/Debug';
	

   	let addr;
	onMount(() => {
		addr =	$page.url.searchParams.get('addr')??"cjnNO4wraJdTCM4ANTdmCnOnBroT-0MPzKjEIzETTe0";
		if(addr!=""){
			GetPlayerByAddr()
		}
	});

	let player;
	let data = '';

	async function GetPlayerByAddr() {
		$Waiting.isWaiting = true;
		$Waiting.waitingText = '获取玩家信息';
		let msgId = await message({
			process: bjProcess,
			tags: [{ name: 'Action', value: 'GetPlayer' }],
			signer: createDataItemSigner(window.arweaveWallet),
			data: addr
		});
		
		$Waiting.waitingText = '解析数据';
		let r = await result({ message: msgId, process: bjProcess });
		data = r.Messages[0].Data;
		
		player = JSON.parse(data);

		log("获取到的玩家信息:",player);

		//player = JSON.stringify(player, null, 2);
		$Waiting.isWaiting = false;
	}
</script>

<div class="fs-5">请输入玩家钱包地址</div>
<input type="text" class="form-control" bind:value={addr} placeholder="请输入钱包地址" />
<hr />
<button class="btn btn-outline-primary form-control" on:click={GetPlayerByAddr}>获取玩家信息</button
>

{#if player}
<div class="container-fluid">	
		<h2>玩家昵称：{player.name}</h2>	
		<div class="col">钱包地址：{player.addr}</div>
		<div class="col">在桌余额：{player.balance}</div>		
	
	<hr />
	{#if player.state}	
	<h2>玩家状态：游戏中</h2>
	<div class="row align-items-start">
		<div class="col">正在玩手牌：{player.state.activeHandIndex}</div>
		<div class="col">手牌1下注：{player.state.hands[0].amount} EGC</div>
		<div class="col">手牌1牌面：{player.state.hands[0].cards.toString()}</div>
		{#if player.state.hands.length>1}
		<div class="col">手牌2下注：{player.state.hands[1].amount} EGC</div>
		<div class="col">手牌2牌面：{player.state.hands[1].cards.toString()}</div>
		{/if}
	</div>
	<div class="row align-items-start">
		<div class="col">庄家牌面{player.state.dealerCards.toString()}</div>
		<div class="col">保险：
			{#if player.state.insurance>0}
			{player.state.insurance} EGC
			{:else}
			未下保险
			{/if}
		</div>
		<div class="col">原始下注额：{player.state.originalAmount} EGC</div>	
	</div>
	{:else}
	<h2>玩家状态：未在游戏中</h2>
	{/if}
</div>
{/if}