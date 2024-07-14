<script lang="ts">
	import { t } from '$lib/i18n';
	import { onMount } from 'svelte';
	import Stack from '../Stack.svelte';
	import { createDataItemSigner, dryrun } from '@permaweb/aoconnect';
	import { message, result } from '$lib/store/Setting';
	import { egcProcess } from '$lib';
	import { Player } from '$lib/store/Player';
	import { log } from '$lib/store/Debug';
	import { Waiting } from '$lib/store/Waiting';

	let depositAmount = 10;
	let max: number;

	let modal: { show: () => void; hide: () => void };

	onMount(async () => {
		modal = new bootstrap.Modal(document.getElementById('deposit'));

		
		const activeAddress = await window.arweaveWallet.getActiveAddress();
		let queryBalance = await dryrun({
			process: egcProcess,
			tags: [
				{ name: 'Action', value: 'Balance' },
				{ name: 'Target', value: activeAddress }
			]
		});
		max = queryBalance.Messages[0].Data / 100;
	});

	export function openModal() {
		modal.show();
	}

	/**
	 * 过滤信息并返回指定标签的信息
	 *
	 * @param {Array} messages - The array of message objects to filter.
	 * @param {string} tagName - The tag name to match in the messages.
	 * @returns {Array} An array of messages that have the specified tag.
	 */
	function findMessageByTag(messages, tagName:string) {
		if (messages && messages.length) {
			return messages.filter(
				(m) => m.Tags && m.Tags.length && m.Tags.some((t) => t.name === tagName)
			);
		}
		return [];
	}

	function getValueByTag(message, tagName:string) {		
		for (let item of message.Tags) {
    		if(item.name==tagName) return item.value
		}
		return null;
	}

	async function deposit(amount: number) {
		try{
		let quantity = amount * 100;
		let msgId = await message({
			process: egcProcess,
			tags: [
				{ name: 'Action', value: 'Transfer' },
				{ name: 'Target', value: 'JsroQVXlDCD9Ansr-n45SrTTB2LwqX_X6jDeaGiIHMo' },
				{ name: 'Quantity', value: quantity.toString() },
				{ name: 'Recipient', value: 'lKZ6SpyB_V8YwewgPmctsRDWaKQaLY3fP_3s-AnjzAs' }
			],
			signer: createDataItemSigner(window.arweaveWallet)
		});

		log('存入EGC的Id:', msgId);
		let depositResult = await result({ message: msgId, process: egcProcess });
		log('存入EGC信息:', depositResult);
	    //const value=findMessageByTag(depositResult.Messages,"Quantity");			   
		const depositQuantity=getValueByTag(depositResult.Messages[0],"Quantity");
		//数量x100在：
		//depositResult.Messages[0].Tags[7].value
		//depositResult.Messages[1].Tags[7].value
		//depositResult.Messages[0].Data为有色文本信息
		//不一定在索引7
		//let depositAmount = Number(depositResult.Messages[1].Tags[7].value) / 100;
		if(depositQuantity==null ||depositQuantity<0){
			$Waiting.alertClass="warning";
			$Waiting.isWaiting=true;
			$Waiting.confirm=true;
			$Waiting.waitingText="存入EGC有误，请联系客服人员"
		}
		else
		{
			$Player.balance += depositQuantity/100;
		}	
	}
	catch(error)
	{
		$Waiting.isWaiting = true;
		$Waiting.alertClass = 'info';
		$Waiting.waitingText = $t('connect.queryEgc');
		$Waiting.confirm=true;
		log("Error:",error)
		
	}
}
</script>

<div
	class="modal fade"
	id="deposit"
	tabindex="-1"
	aria-labelledby="depositTitle"
	aria-hidden="true"
>
	<div class="modal-dialog modal-dialog-centered">
		<div class="modal-content rounded-2 shadow" style="background-color: #bbdefb;">
			<div class="modal-header p-5 pb-4 border-bottom-0">
				<h1 class="fw-bold mb-0 fs-2 w-100 text-center">{$t('deposit.more')}</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body p-5 pt-0">
				<div class="container-fluid">
					<div class="row">
						<div class="col-8">
							<label for="floatingInput"
								>{$t('deposit.amount')}
								{#if max >= 5}
									({$t('deposit.total')}{max})
								{:else}
									<strong>(您钱包里的EGC筹码不够)</strong>
								{/if}
							</label>
							<br />
							<br />
							<input
								type="number"
								step="5"
								class="form-control rounded-3 w-50"
								id="floatingInput"
								{max}
								bind:value={depositAmount}
								placeholder={$t('deposit.amount')}
							/>
							<br />
							<input class="w-75" type="range" bind:value={depositAmount} min="5" step="5" {max} />
						</div>
						<div class="col-4">
							{#key depositAmount}
								<div style="position:absolute;left:320px; top:130px">
									<Stack amount={depositAmount} />
								</div>
							{/key}
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer text-center">
				<button
					type="button"
					class="btn btn-primary mx-5 w-100"
					data-bs-dismiss="modal"
					on:click={() => deposit(depositAmount)}>{$t('deposit.deposit')}</button
				>
			</div>
		</div>
	</div>
</div>
