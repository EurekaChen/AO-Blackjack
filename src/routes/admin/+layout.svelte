<script lang="ts">
	import { t, locales, locale } from '$lib/i18n';
	import { message, spawn, result, dryrun, createDataItemSigner } from '@permaweb/aoconnect';
	import { onMount } from 'svelte';
	import 'arweave/web';
	import PromptDiv from '$lib/component/Prompt.svelte';
	import { bjProcess, egcProcess, module, scheduler } from '$lib/index';
	import { Prompt, AddPrompt } from '$lib/store/Prompt';
	import { Player } from '$lib/store/Player';
	import {Waiting } from '$lib/store/Waiting';
	import WaitingAlert from '$lib/component/WaitingAlert.svelte';

	let walletInstalled = false;
	let walletConnected = false;
	let promptModal: { show: () => void };

	let activeAddress: string;

	$: modalTitle = '请先连接钱包';
	$: modalContent = 'AO 21点游戏基于 Arweave AO，需先连接钱包';
	

	onMount(async () => {
		promptModal = new bootstrap.Modal(document.getElementById('prompt'));
		if (window.arweaveWallet) {
			walletInstalled = true;

			//如果没有连接，则下面这代码会没有权限！
			//let activeAddress;
			try {
			   $Waiting.isWaiting = true;
			   $Waiting.waitingText = '请先连接钱包...';
				activeAddress = await window.arweaveWallet.getActiveAddress();
			   $Waiting.isWaiting = false;
			} catch (error) {
				modalTitle = '请先连接钱包';
				modalContent = `<p>AO 21点游戏管理需要首先连接Arweave钱包！</p>
				 <div class="alert-warning alert">提示信息：${error}
				 `;
				promptModal.show();
			}

			if (activeAddress) {
				walletConnected = true;
			} else {
				walletConnected = false;
			}

			//尝试连接：
			//await connectWallet();
		} else {
			walletInstalled = false;
			//未安装钱包，跳出提示框，提示安装钱包：
			modalTitle = '请先安装钱包';
			modalContent = `<p>
					AO 21点游戏基于Arweave AO,需要首先安装Arweave钱包！
				 </p>
				 <p class="text-center">
					<a class="btn btn-primary " href="https://www.arconnect.io/download">钱包下载地址</a>
				 </p>`;

			promptModal.show();
		}
	});

	async function connectWallet() {
		try {
			await window.arweaveWallet.connect([
				'ACCESS_ADDRESS',
				'ACCESS_PUBLIC_KEY',
				'SIGN_TRANSACTION'
			]);
			walletConnected = true;
		   $Waiting.isWaiting = false;
		} catch (error) {
			modalTitle = '连接钱包失败';
			modalContent = `<p>
					AO 21点游戏基于Arweave AO,需要首先连接Arweave钱包！
				 </p>
				 <p class="text-center alert-danger ">
					错误信息: ${error}
				 </p>`;
			walletConnected = false;
		}
	}

	async function disconnectWallet() {
		try {
			// 请求断开 ArConnect 钱包
			await window.arweaveWallet.disconnect();
			walletConnected = false;
			console.log('Disconnected from ArConnect wallet');
		} catch (error) {
			console.error('Failed to disconnect from ArConnect wallet', error);
		}
	}
</script>

<!--提示信息-->
<div class="modal fade" id="prompt" tabindex="-1" aria-labelledby="promptTitle" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered">
		<div class="modal-content rounded-2 shadow" style="background-color: #bbdefb;">
			<div class="modal-header p-4 pb-4 border-bottom-0">
				<h1 class="fw-bold mb-0 fs-2 w-100 text-center">{modalTitle}</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body p-4 pt-0">
				<div class="form-floating mb-3">
					{@html modalContent}
				</div>
			</div>
			<div class="modal-footer text-center">
				<button type="button" class="btn btn-primary mx-5 w-100" data-bs-dismiss="modal">OK</button>
			</div>
		</div>
	</div>
</div>

<!--垂直居中容器-->
<div class="container m-auto main shadow-lg">
	<!--经考虑后牌桌固定大小1024x576，其它（顶部和底部）可以再加 -->
	<div class="row back">
		<!--顶部标题区域-->
		<div class="container text-bg-dark" style="height: 45px;width:1024px">
			<header class="d-flex align-items-center justify-content-center justify-content-md-between">
				<!--下拦菜单-->

				<!--标题-->
				<div class="nav col-12 col-md-auto justify-content-center">
					<h2><strong>21点管理界面</strong></h2>
				</div>

				<!--语言和连接钱包-->
				<div class="col-md-4 text-end">
					<span role="img" aria-label="Choose Language">🌐</span>
					<select bind:value={$locale} style="background-color: #333;border:none">
						{#each $locales as value}
							<option {value}>{$t(`lang.${value}`)}</option>
						{/each}
					</select>
					<div class="d-none d-md-inline">
						{#if walletInstalled}
							{#if walletConnected}
								<button type="button" class="btn btn-primary" on:click={disconnectWallet}
									>{$t('top.disconnect')}</button
								>
							{:else}
								<button type="button" class="btn btn-primary" on:click={connectWallet}
									>{$t('top.connect')}</button
								>
							{/if}
						{:else}
							<a class="btn btn-primary" href="https://www.arconnect.io/download">
								{$t('top.installWallet')}</a
							>
						{/if}
					</div>
				</div>
			</header>
		</div>

		<!--牌桌区域，使用固定宽度1024x756-->
		<div style="width:1024px;height:576px;">
			<!--防止div覆盖导致无法点击！-->
			<div class="row" style="height:576px">
				<div class="col-3" style="height:576px; border:1px solid gray">
					<nav class="mt-2" style="color:aliceblue">
						<ul class="nav nav-pills nav-sidebar flex-column">
							<li class="nav-item">
								<a class="nav-link" href="/admin/load"> 装载代码 </a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="/admin/players"> 玩家信息 </a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="/Schedule?category=major"> 玩家状态 </a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="/Practice"> 代码调试 </a>
							</li>
						</ul>
					</nav>
				</div>
				<div class="col-9" style="border:1px solid green">
					<slot />
				</div>
			</div>
		</div>

		<WaitingAlert />
	</div>	
</div>

<style>
	.main {
		width: 1032px;
		min-width: 1032px;
		border: 4px solid #1565c0;
	}

	.back {
		background-color: #333333;
		opacity: 0.9;
		width: 1024px;
	}
</style>
