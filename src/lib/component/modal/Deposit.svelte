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

	let depositAmount = 5;
	let max: number;
	$:disabled=max<5;

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

	function getValueByTag(message, tagName: string) {
		for (let item of message.Tags) {
			if (item.name == tagName) return item.value;
		}
		return null;
	}

	async function deposit(amount: number) {
		try {
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
			$Waiting.alertClass = 'info';
			$Waiting.isWaiting = true;
			$Waiting.confirm = true;
			$Waiting.waitingText = $t('deposit.querying');
			let depositResult = await result({ message: msgId, process: egcProcess });
			$Waiting.isWaiting = false;
			log('存入EGC信息:', depositResult);
			//const value=findMessageByTag(depositResult.Messages,"Quantity");
			const depositQuantity = getValueByTag(depositResult.Messages[0], 'Quantity');
		
			if (depositQuantity == null || depositQuantity < 0) {
				$Waiting.alertClass = 'warning';
				$Waiting.isWaiting = true;
				$Waiting.confirm = true;
				$Waiting.waitingText = $t('deposit.error');
			} else {
				depositAmount = depositQuantity / 100;
				$Player.balance += depositAmount;
				max -= depositAmount;
				$Waiting.alertClass = 'success';
				$Waiting.isWaiting = true;
				$Waiting.confirm = true;
				$Waiting.waitingText = $t('deposit.add') + depositAmount + ' EGC';
			}
		} catch (error) {
			$Waiting.isWaiting = true;
			$Waiting.alertClass = 'info';
			$Waiting.waitingText = $t('deposit.cancel');
			$Waiting.confirm = true;
			log('错误提示:', error);
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
									<strong>({$t('deposit.notEnough')})</strong>
								{/if}
							</label>
							<br />
							<br />
							<input
								type="number"
								step="5"
								class="form-control rounded-3 w-50"
								id="floatingInput"
								min="5"
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
					disabled={disabled}
					on:click={() => deposit(depositAmount)}>{$t('deposit.deposit')}</button
				>
			</div>
		</div>
	</div>
</div>
