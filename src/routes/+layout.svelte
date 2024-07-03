<script lang="ts">	
	import { t, locales, locale } from '$lib/i18n';
	import { onMount } from 'svelte';
	import 'arweave/web';
	import Prompt from '$lib/component/Prompt.svelte';

	let walletInstalled=false;
	let walletConnected = false;
	let	joinModal: { show: () => void; };
	onMount(() => {
		// 检查 ArConnect 是否已安装
		if (!window.arweaveWallet) {

			console.error('没有安装ArConnect');
		}	
	   joinModal = new bootstrap.Modal(document.getElementById('prompt'));		
	   joinModal.show();   
	});

	async function connectWallet() {
		try {
			// 请求连接 ArConnect 钱包
			await window.arweaveWallet.connect([
				'ACCESS_ADDRESS',
				'ACCESS_PUBLIC_KEY',
				'SIGN_TRANSACTION'
			]);
			walletConnected = true;
			joinModal.show();
			//await tick(); //强制更新UI
			console.log('Connected to ArConnect wallet');
		} catch (error) {
			console.error('Failed to connect to ArConnect wallet', error);
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

<!-- #region 规则弹出窗口-->
<div
	class="modal fade"
	id="promptedScrollable"
	tabindex="-1"
	aria-labelledby="promptedScrollableTitle"
	aria-hidden="true"
>
	<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
		<div class="modal-content">
			<div class="modal-header">
				<h1 class="modal-title fs-5" id="promptedScrollableTitle">
					{$t('top.rule.title')}
				</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				{@html $t('top.rule.content')}
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
			</div>
		</div>
	</div>
</div>
<!-- #endregion -->

<!--输入信息-->
<div
	class="modal fade"
	id="prompt"
	tabindex="-1"
	aria-labelledby="promptTitle"
	aria-hidden="true"
>
	<div class="modal-dialog modal-dialog-centered">
		<div class="modal-content rounded-4 shadow">			
			<div class="modal-header">
				<h1 class="modal-title fs-5 mx-auto text-center" style="border:1px solid green"  id="promptTitle">提示请先连接钱包</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<p>This is a vertically centered modal.</p>
			</div>
			<div class="modal-footer text-center" style="border:1px solid green">
				<button type="button" class="btn btn-lg btn-primary mt-5 w-100" data-bs-dismiss="modal">Great, thanks!</button>			
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
				<div class="col-md-3">
					<span class="dropdown">
						<span
							class="btn btn-secondary dropdown-toggle"
							id="dropdownMenuButton"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							☰
						</span>
						<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
							<li>
								<a
									class="dropdown-item"
									href="./#"
									data-bs-toggle="modal"
									data-bs-target="#promptedScrollable">{$t('top.rule.title')}</a
								>
							</li>
							<li>
								<a
									class="dropdown-item"
									href="./#"
									data-bs-toggle="modal"
									data-bs-target="#prompt">{$t('top.settings')}</a
								>
							</li>
						</ul>
					</span>
				</div>

				<!--标题-->
				<div class="nav col-12 col-md-auto justify-content-center">
					<h2><strong>{$t('top.title')}</strong></h2>
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
						{#if walletConnected}
							<button type="button" class="btn btn-primary" on:click={disconnectWallet}
								>{$t('top.disconnect')}</button
							>
						{:else}
							<button type="button" class="btn btn-primary" on:click={connectWallet}
								>{$t('top.connect')}</button
							>
						{/if}
					</div>
				</div>
			</header>
		</div>

		<!--牌桌区域，使用固定宽度1024x756-->
		<div style="background-image: url(/img/{$t('table')}.svg);width:1024px;height:576px;">
			<slot />
		</div>		
		<Prompt />
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
