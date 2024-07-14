<script lang="ts">
	import { t, locales, locale } from '$lib/i18n';
	import { dryrun } from '$lib/store/Setting';
	import { onMount } from 'svelte';
	import 'arweave/web';
	import { bjProcess, egcProcess } from '$lib/index';
	import { Player } from '$lib/store/Player';
	import Deposit from '$lib/component/modal/Deposit.svelte';
	import Join from '$lib/component/modal/Join.svelte';
	import Info from '$lib/component/modal/Info.svelte';
	import Rule from '$lib/component/modal/Rule.svelte';
	import { Waiting } from '$lib/store/Waiting';
	import WaitingAlert from '$lib/component/WaitingAlert.svelte';
	import type { AoPlayer } from '$lib/type';
	import { restore } from '$lib/state/restore';
	import About from '$lib/component/modal/About.svelte';
	import { log } from '$lib/store/Debug';

	let walletInstalled = false;
	let walletConnected = false;

	let deposit: Deposit;
	let join: Join;
	let info: Info;
	let rule: Rule;
	let about: About;

	let activeAddress: string;
	let walletEgc: number;

	let modalTitle = $t('connect.pleaseConnect');
	let modalContent = $t('connect.pleaseConnectContent');

	async function connected(activeAddress: string) {
		walletConnected = true;
		walletEgc = await queryWalletEgc(activeAddress);

		let oaPlayer = await GetPlayer(activeAddress);
		if (oaPlayer != null) {
			log('玩家已经存在');
			welcomeBack(oaPlayer);
		} else {
			log('玩家不存在');
			openJoin();
			//加入后允许点击：
			$Player.inGame = false;
		}
	}

	async function queryWalletEgc(addr: string) {
		$Waiting.isWaiting = true;
		$Waiting.alertClass = 'info';
		$Waiting.waitingText = $t('connect.queryEgc');
		let queryBalance = await dryrun({
			process: egcProcess,
			tags: [
				{ name: 'Action', value: 'Balance' },
				{ name: 'Target', value: addr }
			]
		});
		return queryBalance.Messages[0].Data / 100;
	}

	async function GetPlayer(addr: string) {
		$Waiting.waitingText = $t('connect.queryPlayer');
		$Waiting.alertClass = 'info';
		let getPlayerMsg = await dryrun({
			process: bjProcess,
			tags: [{ name: 'Action', value: 'GetPlayer' }],
			data: addr
		});
		$Waiting.isWaiting = false;

		//是否查询到玩家信息
		if (getPlayerMsg.Messages.length > 0) {
			return JSON.parse(getPlayerMsg.Messages[0].Data);
		} else {
			return null;
		}
	}

	function welcomeBack(aoPlayer: AoPlayer) {
		let addrFirst6 = aoPlayer.addr.substring(0, 6);
		let addrLast6 = aoPlayer.addr.substring(aoPlayer.addr.length - 6);
		let shortAddr = addrFirst6 + '......' + addrLast6;

		modalTitle = $t('connect.welcomeBack');
		modalContent = `
		<dl class="row mx-5">		
			<dt class="col-3">${$t('connect.addr')}</dt>
			<dd class="col-9" title="${aoPlayer.addr}"> ${shortAddr}</dd>
			<dt class="col-3">${$t('connect.playerName')}</dt>
			<dd class="col-9">${aoPlayer.name}</dd>
			<dt class="col-3">${$t('connect.walletBalance')}</dt>
			<dd class="col-9">${walletEgc} EGC</dd>
			<dt class="col-3">${$t('connect.tableBalance')}</dt>
			<dd class="col-9">${aoPlayer.balance} EGC</dd>
		</dl>					
		`;
		if (aoPlayer.balance < 5) {
			modalContent += `<div class="alert alert-warning text-center">$t('connect.pleaseAdd')</div>`;
		}

		$Player.balance = aoPlayer.balance;
		$Player.name = aoPlayer.name;
		$Player.addr = aoPlayer.addr;

		if (aoPlayer.state) {
			modalTitle = $t('connect.continue');

			//不允许点击筹码
			$Player.inGame = true;
			restore(aoPlayer);
		} else {
			//允许点击筹码
			$Player.inGame = false;
		}
		info.openModal();
	}

	async function connectWallet() {
		try {
			await window.arweaveWallet.connect([
				'ACCESS_ADDRESS',
				'ACCESS_PUBLIC_KEY',
				'SIGN_TRANSACTION'
			]);
			walletConnected = true;
			activeAddress = await window.arweaveWallet.getActiveAddress();
			connected(activeAddress);
		} catch (error) {
			modalTitle = $t('connect.fail');
			modalContent =
				$t('connect.failContent') +
				`
				 <p class="text-center alert-danger ">
					 ${error}
				 </p>`;
			walletConnected = false;
		}
	}

	async function disconnectWallet() {
		try {
			// 请求断开 ArConnect 钱包
			await window.arweaveWallet.disconnect();
			walletConnected = false;
		} catch (error) {
			console.error('Failed to disconnect from ArConnect wallet', error);
		}
	}

	function openDeposit() {
		deposit.openModal();
	}

	function openJoin() {
		join.openModal();
	}

	onMount(async () => {
		if (window.arweaveWallet) {
			//阻止点击
			$Player.inGame = true;

			walletInstalled = true;
			log('钱包已经安装');

			//如果没有连接，则下面这代码会没有权限！
			//let activeAddress;
			try {
				activeAddress = await window.arweaveWallet.getActiveAddress();
				log('钱包已经连接，钱包地址：' + activeAddress);
			} catch (error) {
				modalTitle = $t('connect.pleaseConnect');
				modalContent = $t('connect.pleaseConnectContent');
				//不向用户展示错误。
				log('连接钱包问题:', error);
				info.openModal();
			}

			try {
				if (activeAddress) {
					connected(activeAddress);
				} else {
					walletConnected = false;
					log('钱包未连接');
				}
			} catch (error) {
				$Waiting.alertClass = 'danger';
				$Waiting.waitingText = $t('connect.refresh');
				console.log(error);
			}
		} else {
			walletInstalled = false;
			log('钱包未安装');

			modalTitle = $t('connect.pleaseInstall');
			modalContent =
				$t('connect.pleaseInstallContent') +
				'<p class="text-center">	<a class="btn btn-primary " href="https://www.arconnect.io/download">' +
				$t('connect.installLink') +
				'</a>';

			info.openModal();
		}
	});
</script>

<!--弹出窗口-->
<Deposit bind:this={deposit} max={walletEgc} />
<Join bind:this={join} {activeAddress} />
<Rule bind:this={rule} />
<About bind:this={about} />
<Info bind:this={info} {modalContent} {modalTitle} />

<!--垂直居中容器-->
<div class="container m-auto main shadow-lg">
	<!--经考虑后牌桌固定大小1024x576，其它（顶部和底部）可以再加 -->
	<div class="row back">
		<!--顶部标题区域-->
		<div class="container text-bg-dark header">
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
								<a class="dropdown-item" href="./#" data-bs-toggle="modal" data-bs-target="#rule"
									>{$t('top.rule.title')}</a
								>
							</li>
							<li>
								<a class="dropdown-item" href="./#" data-bs-toggle="modal" data-bs-target="#about"
									>{$t('top.about.title')}</a
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
		<div style="background-image: url(/img/{$t('table')}.svg);width:1024px;height:576px;">
			<slot />
			<!--防止div覆盖导致无法点击！-->
			<div style="width:138px;height:200px;position:absolute;">
				<div style="position:absolute;left:8px;top:90px;color:#2196f3;font-weight:bold">
					{#if $Player.name != ''}
						{$t('connect.player')}:{$Player.name}
					{/if}
				</div>
				<!--使用./#会导至页面刷新！！-->
				<button on:click={openDeposit} style="background: none;border:none">
					<div style="position:absolute;left:18px;top:120px;text-align:center">
						<img id="addChip" src="/img/chip/addchip.png" alt="add chip" style="width:55px" />
						<div style="color:#bbdefb;font-weight:bold">{$t('connect.addChip')}</div>
					</div>
				</button>
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

	.header {
		height: 45px;
		width: 1024px;
	}
</style>
