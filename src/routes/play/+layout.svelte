<script lang="ts">
	import { t, locales, locale } from '$lib/i18n';
	import { dryrun } from '@permaweb/aoconnect';
	import { onMount } from 'svelte';
	import 'arweave/web';
	import { bjProcess, egcProcess } from '$lib/index';
	import { Player } from '$lib/store/Player';
	import { Action } from '$lib/store/Action';
	import Deposit from '$lib/component/modal/Deposit.svelte';
	import Join from '$lib/component/modal/Join.svelte';
	import Info from '$lib/component/modal/Info.svelte';
	import Rule from '$lib/component/modal/Rule.svelte';
	import { Waiting } from '$lib/store/Waiting';
	import WaitingAlert from '$lib/component/WaitingAlert.svelte';

	let walletInstalled = false;
	let walletConnected = false;

	let deposit: Deposit;
	let join: Join;
	let info: Info;
	let rule: Rule;

	let activeAddress: string;
	let walletEgc: number;

	let modalTitle = '请先连接钱包';
	let modalContent = 'AO 21点游戏基于 Arweave AO，需先连接钱包';

	async function queryWalletEgc(addr: string) {
		$Waiting.isWaiting = true;
		$Waiting.alertClass = 'info';
		$Waiting.waitingText = '正在查询您钱包里的的EGC余额';
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
		$Waiting.waitingText = '正在查询玩家信息';
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

	function welcomeBack(aoPlayer: { addr: string; balance: number; name: string; state: any }) {
		let addrFirst6 = aoPlayer.addr.substring(0, 6);
		let addrLast6 = aoPlayer.addr.substring(aoPlayer.addr.length - 6);
		let shortAddr = addrFirst6 + '......' + addrLast6;

		modalTitle = '欢迎回来';
		modalContent = `
		<dl class="row">
			<dt class="col-3">钱包地址</dt>
			<dd class="col-9" title="${aoPlayer.addr}"> ${shortAddr}</dd>
			<dt class="col-3">玩家名称</dt>
			<dd class="col-9">${aoPlayer.name}</dd>
			<dt class="col-3">钱包余额</dt>
			<dd class="col-9">${walletEgc} EGC</dd>
			<dt class="col-3">在桌筹码</dt>
			<dd class="col-9">${aoPlayer.balance} EGC</dd>
		</dl>					
		`;
		if (aoPlayer.balance < 5) {
			modalContent += `<div class="alert alert-warning text-center">筹码不够最低限额，请增加筹码</div>`;
		}

		$Player.balance = aoPlayer.balance;
		$Player.name = aoPlayer.name;

		if (aoPlayer.state) {
			modalTitle = '上一局还未结束';
			$Player.inGame=true;

			//考虑是不是传回balance和不要deck，其实拿到deck也不影响。
			//里面少的牌就是玩家看到的牌，所以无所谓呀！
			restore(aoPlayer.state);
		}
		info.openModal();
	}

	//还原游戏
	function restore(oaState) {
		console.log('oaState:', oaState);	
		$Player.state.activeHandIndex = oaState.activeHandIndex - 1;	

		for (let card of oaState.hands[0].cards) {
			$Player.state.hands[0].cards.push(card);
		}
		$Player.state.hands[0].amount = oaState.hands[0].amount;

		if (oaState.hands.length > 1) {
			//有两手：
			//恢复第二手
			for (let card of oaState.hands[1].cards) {
				$Player.state.hands[1].cards.push(card);
			}
			$Player.state.hands[1].amount = oaState.hands[1].amount;

			
			if(oaState.activeHandIndex==0){
				//两手21，牌局结束：
				$Player.inGame=false;
				$Player.state.originalAmount=oaState.originalAmount;
				$Action.newHand=true;
			}
			else if(oaState.activeHandIndex==1){
				//第一手活动：			
			}
		} else {
			//一手时判断是否可拆牌
			let rank1 = oaState.hands[0].cards[0].charAt(0);
			let rank2 = oaState.hands[0].cards[1].charAt(0);
			if (rank1 == 'T' || rank1 == 'J' || rank1 == 'Q' || rank1 == 'K') rank1 = '10';
			if (rank2 == 'T' || rank2 == 'J' || rank2 == 'Q' || rank2 == 'K') rank2 = '10';
			if (rank1 == rank2) {
				$Action.split = true;
			}

			if (oaState.dealerCards[0].charAt(0) == 'A') {
				//一手时可下保险
				if (oaState.insurance > 0) {
					//已经下保险
					$Player.state.insurance = oaState.insurance;
				} else {
					$Action.insurance = true;
				}
			}
		}

		$Player.state.dealerCards = oaState.dealerCards;
		// for (let card of state.dealerCards) {
		// 	$Player.state.dealerCards.push(card);
		// }
		//$Player=$Player;
		const hand1CanDouble=oaState.activeHandIndex==1 && oaState.hands[0].cards.length==2;
		const hand2CanDouble=oaState.activeHandIndex==2 && oaState.hands[1].cards.length==2;
		
		if(hand1CanDouble || hand2CanDouble){
			Action.afterDeal(true);
		}
		else{
			Action.afterDeal(false);
		}			
	}

	onMount(async () => {
		if (window.arweaveWallet) {
			walletInstalled = true;
			console.log('钱包已经安装');

			//如果没有连接，则下面这代码会没有权限！
			//let activeAddress;
			try {
				activeAddress = await window.arweaveWallet.getActiveAddress();
				console.log('钱包已经连接，地址：' + activeAddress);
			} catch (error) {
				modalTitle = '请先连接钱包';
				modalContent = `<p>
					AO 21点游戏基于Arweave AO，玩游戏需要首先连接Arweave钱包！
				 </p>
				 <div class="alert-warning alert">提示信息：${error}
				 `;
				info.openModal();
			}

			try {
				if (activeAddress) {
					walletConnected = true;
					walletEgc = await queryWalletEgc(activeAddress);

					let oaPlayer = await GetPlayer(activeAddress);
					if (oaPlayer != null) {
						welcomeBack(oaPlayer);
					} else {
						openJoin();
					}
				} else {
					walletConnected = false;
				}
			} catch (error) {
				$Waiting.alertClass = 'danger';
				$Waiting.waitingText = '数据请求失败，请刷新重试';
				console.log(error);
			}
		} else {
			walletInstalled = false;

			modalTitle = '请先安装钱包';
			modalContent = `<p>
					AO 21点游戏基于Arweave AO,需要首先安装Arweave钱包！
				 </p>
				 <p class="text-center">
					<a class="btn btn-primary " href="https://www.arconnect.io/download">钱包下载地址</a>
				 </p>`;

			info.show();
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

	function openDeposit() {
		deposit.openModal();
	}

	function openJoin() {
		join.openModal();
	}
</script>

<Deposit bind:this={deposit} max={walletEgc} />
<Join bind:this={join} {activeAddress} />
<Rule bind:this={rule} />
<Info bind:this={info} {modalContent} {modalTitle} />

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
								<a class="dropdown-item" href="./#" data-bs-toggle="modal" data-bs-target="#rule"
									>{$t('top.rule.title')}</a
								>
							</li>
							<li>
								<a class="dropdown-item" href="./#" data-bs-toggle="modal" data-bs-target="#prompt"
									>{$t('top.settings')}</a
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
						玩家:{$Player.name}
					{/if}
				</div>
				<!--使用./#会导至页面刷新！！-->
				<button on:click={openDeposit} style="background: none;border:none">
					<div style="position:absolute;left:18px;top:120px;text-align:center">
						<img id="addChip" src="/img/chip/addchip.png" alt="add chip" style="width:55px" />
						<div style="color:#bbdefb;font-weight:bold">增加筹码</div>
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
</style>
