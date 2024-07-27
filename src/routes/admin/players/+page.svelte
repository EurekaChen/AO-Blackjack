<script lang="ts">
	import { bjProcess } from '$lib';
	import { createDataItemSigner } from '@permaweb/aoconnect';
	import { message, result } from '$lib/store/Setting';
	import { Waiting } from '$lib/store/Waiting';
	import { paginate, LightPaginationNav } from 'svelte-paginate';
	import { log } from '$lib/store/Debug';

	let currentPage = 1;
	let pageSize = 10;
	let items = [];
	$: paginatedItems = paginateAsync(currentPage);

	async function refresh() {
		items = await GetPlayers();
		paginatedItems = paginateAsync(currentPage);
	}

	//$: paginatedItems = paginate({ items, pageSize, currentPage })

	async function paginateAsync(currentPage: number) {
		//items = await GetPlayers();
		let pageItems = paginate({ items, pageSize, currentPage });
		return pageItems;
	}

	async function GetPlayers() {
		$Waiting.isWaiting = true;
		$Waiting.waitingText = '从AO获取所有玩家信息';
		let msgId = await message({
			process: bjProcess,
			tags: [{ name: 'Action', value: 'GetPlayers' }],
			signer: createDataItemSigner(window.arweaveWallet)
		});

		log('获取所有玩家msgId:', msgId);

		$Waiting.waitingText = '解析AO数据';
		let getPlayrsResult = await result({ message: msgId, process: bjProcess });
		let data = getPlayrsResult.Messages[0].Data;
		items = JSON.parse(data);

		log('获取到玩家:', items);
		$Waiting.isWaiting = false;
		return items;
	}
</script>

<button class="btn btn-primary" on:click={refresh}>点击获取所有玩家信息</button>
{#await paginatedItems then pitems}
	<table class="table table-bordered table-striped">
		<thead>
			<tr>
				<th>序号</th>
				<th>名称</th>
				<th>钱包地址</th>
				<th>筹码</th>
				<th>状态</th>
			</tr>
		</thead>
		<tbody>
			{#each pitems as player, index}
				<tr>
					<td>{index + 1}</td>
					<td>{player.name}</td>
					<td title={player.addr}>{player.addr.substring(0, 6)}</td>
					<td>{player.balance}</td>
					<td>{#if player.state}
						<span>游戏中</span>
						{:else}
						<span>未在游戏</span>
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<LightPaginationNav
		totalItems={items.length}
		{pageSize}
		{currentPage}
		limit={1}
		showStepOptions={true}
		on:setPage={(e) => {
			currentPage = e.detail.page;
		}}
	/>
{/await}
