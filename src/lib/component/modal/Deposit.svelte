<script lang="ts">
	import { onMount } from "svelte";
	import Stack from "../Stack.svelte";
	import { createDataItemSigner } from '@permaweb/aoconnect';
	import { message, result } from '$lib/store/Setting';
	import { egcProcess } from "$lib";
	import { Player } from "$lib/store/Player";
	import { log } from "$lib/store/Debug";
   
    
    let depositAmount= 10;
    export let max:number;
 
    let modal: { show: () => void; hide: () => void; };

    onMount(async () => {				
       modal= new bootstrap.Modal(document.getElementById('deposit'));
    }); 

    export function openModal(){
        modal.show();
    }
   
    async function deposit(amount: number) {
	
		//需x100才能显示正常（有两位小数）
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

		let depositResult =await result({ message: msgId, process: egcProcess });
		log('存入EGC信息:',depositResult);			
		//数量x100在：
		//depositResult.Messages[0].Tags[7].value
		//depositResult.Messages[1].Tags[7].value
		//depositResult.Messages[0].Data为有色文本信息
	    let depositAmount= Number(depositResult.Messages[1].Tags[7].value)/100;
		$Player.balance+=depositAmount;	
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
				<h1 class="fw-bold mb-0 fs-2 w-100 text-center">带入更多筹码</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body p-5 pt-0">
				<div class="container-fluid">
					<div class="row">
						<div class="col-8">
							<label for="floatingInput"
								>请输入数量
								{#if max}
									(共有{max})
								{/if}
							</label>
							<br />
							<br />
							<input
								type="number"
								step="5"
								class="form-control rounded-3 w-50"
								id="floatingInput"
								bind:value={depositAmount}
								placeholder="请输入数量"
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
					on:click={() => deposit(depositAmount)}>带入筹码</button
				>
			</div>
		</div>
	</div>
</div>