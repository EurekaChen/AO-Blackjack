<script lang="ts">
	import { bjProcess, module, scheduler } from '$lib';
	import { Player } from '$lib/store/Player';

	import { Waiting } from '$lib/store/Waiting';
	import { createDataItemSigner, message, spawn } from '@permaweb/aoconnect';
	import { onMount } from 'svelte';

	export let activeAddress = '';
	$: nickname = activeAddress.substring(activeAddress.length - 8);

	let modal: { show: () => void; hide: () => void };

	onMount(async () => {
		modal = new bootstrap.Modal(document.getElementById('join'));
	});

	export function openModal() {
		modal.show();
	}

	async function join(name: string, addr: string) {
		
		$Waiting.isWaiting = true;
		$Waiting.waitingText = '新用户加入中，请稍候...';		

		const userInfo = { name, addr };
		const userJsonStr = JSON.stringify(userInfo);

		console.log('注册信息:', userJsonStr);

		//直接发送注册信息
		//会连接到arweave.net不翻墙会出错
		await message({
			process: bjProcess,
			tags: [{ name: 'Action', value: 'Join' }],
			signer: createDataItemSigner(window.arweaveWallet),
			data: userJsonStr
		});

		//注册赠送100
		//可以请求AO获得这个100，这里先直接加入
		$Player.balance = 100;
		$Player.name = nickname;

		$Waiting.alertClass = 'primary';
		$Waiting.waitingText = '加入成功...';
		setTimeout(() => {
			$Waiting.isWaiting = false;
		}, 1000);
	}
</script>

<!--加入游戏-->
<div class="modal fade" id="join" tabindex="-1" aria-labelledby="joinTitle" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered">
		<div class="modal-content rounded-2 shadow" style="background-color: #bbdefb;">
			<div class="modal-header p-4 pb-4 border-bottom-0">
				<h1 class="fw-bold mb-0 fs-2 w-100 text-center">欢迎加入21点游戏</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body p-4 pt-0">
				<div class="mb-3 text-center">
					<div class="fs-4">您的钱包地址</div>
					<div>{activeAddress}</div>
					<div class="fs-4">请输入昵称</div>
					<input
						type="text"
						class="form-control rounded-3 w-50 mx-auto m-1 h-75"
						bind:value={nickname}
						placeholder="请输入昵称"
					/>
					<div class="alert alert-info fs-5">首次加入赠送 100EGC 筹码</div>
				</div>
			</div>
			<div class="modal-footer text-center">
				<button
					type="button"
					class="btn btn-primary mx-5 w-100"
					data-bs-dismiss="modal"
					on:click={() => join(nickname, activeAddress)}
					>加 入
				</button>
			</div>
		</div>
	</div>
</div>
