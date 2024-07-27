<script lang="ts">
	import { egcProcess } from '$lib';
	import { createDataItemSigner } from '@permaweb/aoconnect';
	import { message, result } from '$lib/store/Setting';
	import { Waiting } from '$lib/store/Waiting';
	import { LightPaginationNav, paginate } from 'svelte-paginate';
	import { log } from '$lib/store/Debug';

	let currentPage = 1;
	let pageSize = 10;
	let items = [];
	$: paginatedItems = paginateAsync(currentPage);

	async function refresh() {
		items = await GetEgcBalaces();
		paginatedItems = paginateAsync(currentPage);
	}

	async function paginateAsync(currentPage: number) {
		let pageItems = paginate({ items, pageSize, currentPage });
		return pageItems;
	}

	async function GetEgcBalaces() {
		$Waiting.isWaiting = true;
		$Waiting.waitingText = '从AO获取所有地址EGC余额信息';
		let msgId = await message({
			process: egcProcess,
			tags: [{ name: 'Action', value: 'Balances' }],
			signer: createDataItemSigner(window.arweaveWallet)
		});

		console.log(msgId);
		$Waiting.waitingText = '解析AO数据';
		let r = await result({ message: msgId, process: egcProcess });
		console.log(r);
		let data = r.Messages[0].Data;
		console.log(data);
		let balances = JSON.parse(data);
		log('余额数据', balances);
		$Waiting.isWaiting = false;

		let entries = Object.entries(balances);

		return entries;
	}
</script>

<button class="btn btn-primary" on:click={refresh}>点击获取所有EGC地址信息</button>
{#await paginatedItems then pitems}
	<table class="table table-bordered table-striped">
		<thead>
			<tr>
				<th>钱包地址</th>
				<th>EGC数量</th>
			</tr>
		</thead>
		<tbody>
			{#each pitems as addr}
				<tr>
					<td>{addr[0]}</td>
					<td>{addr[1] / 100}</td>
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
