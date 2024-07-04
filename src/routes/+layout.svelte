<script lang="ts">
	import { t, locales, locale } from '$lib/i18n';
	import { message, spawn, result, dryrun, createDataItemSigner } from '@permaweb/aoconnect';
	import { onMount } from 'svelte';
	import 'arweave/web';
	import PromptDiv from '$lib/component/Prompt.svelte';
	import Stack from '$lib/component/Stack.svelte';
	import { bjProcess, egcProcess, module, scheduler } from '$lib/index';
	import { Prompt, AddPrompt } from '$lib/store/Prompt';

	let walletInstalled = false;
	let walletConnected = false;
	let promptModal: { show: () => void };
	let depositModal;
	let joinModal;
	let activeAddress: string;

	let depositAmount = 1000;
	let max: number;

	$: modalTitle = '请先连接钱包';
	$: modalContent = 'AO 21点游戏基于 Arweave AO，需先连接钱包';

	$: waiting = false;
	$: waitingAlert = 'info';
	$: waitingText = '数据正在请求中，请稍候...';

	$: nickname = 'player';

	onMount(async () => {
		promptModal = new bootstrap.Modal(document.getElementById('prompt'));
		depositModal = new bootstrap.Modal(document.getElementById('deposit'));
		joinModal = new bootstrap.Modal(document.getElementById('join'));

		if (window.arweaveWallet) {
			walletInstalled = true;
			//如果没有连接，则下面这代码会没有权限！
			//let activeAddress;
			try {
				activeAddress = await window.arweaveWallet.getActiveAddress();
			} catch (error) {
				modalTitle = '请先连接钱包';
				modalContent = `<p>
					AO 21点游戏基于Arweave AO，玩游戏需要首先连接Arweave钱包！
				 </p>
				 <div class="alert-warning alert">提示信息：${error}
				 `;
				promptModal.show();
			}

			try {
				if (activeAddress) {
					walletConnected = true;

					waiting = true;
					//查询是否已经注册：
					let getPlayer = await dryrun({
						process: bjProcess,
						tags: [{ name: 'Action', value: 'GetPlayer' }],
						data: activeAddress
					});

					//查询EGC余额：
					let queryBalance = await dryrun({
						process: egcProcess,
						tags: [
							{ name: 'Action', value: 'Balance' },
							{ name: 'Target', value: activeAddress }
						]
					});
					waiting = false;

					console.log('余额数据:', queryBalance);
					max = queryBalance.Messages[0].Data;

					if (getPlayer.Messages.length > 0) {
						let playerInfo = JSON.parse(getPlayer.Messages[0].Data);
						let addrFirst6 = playerInfo.addr.substring(0, 6);
						let addrLast6 = playerInfo.addr.substring(playerInfo.addr.length - 6);

						modalTitle = '欢迎回来';
						modalContent = `
						<dl class="row">
							<dt class="col-3">钱包地址</dt>
							<dd class="col-9" title="${playerInfo.addr}"> ${addrFirst6}......${addrLast6}</dd>
							<dt class="col-3">玩家名称</dt>
							<dd class="col-9">${playerInfo.name}</dd>
							<dt class="col-3">钱包余额</dt>
							<dd class="col-9">${max} EGC</dd>
							<dt class="col-3">在桌筹码</dt>
							<dd class="col-9">${playerInfo.balance} EGC</dd>
						</dl>					
						`;
						if (playerInfo.balance < 5) {
							modalContent += `<div class="alert alert-warning text-center">筹码不够最低限额，请增加筹码</div>`;
						}

						promptModal.show();
						console.log('palyerInfo:', playerInfo);
					} else {
						//需要加入
						nickname = activeAddress.substring(activeAddress.length - 8);
						joinModal.show();
					}
					console.log('dryRunResult:', getPlayer);
				} else {
					walletConnected = false;
				}
			} catch {
				waitingAlert = 'danger';
				waitingText = '数据请求失败，请刷新重试';
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
		depositModal.show();
	}

	async function deposit() {
		//直接发送转账信息
		let msgId = await message({
			process: egcProcess,
			tags: [
				{ name: 'Action', value: 'Transfer' },
				{ name: 'Target', value: 'JsroQVXlDCD9Ansr-n45SrTTB2LwqX_X6jDeaGiIHMo' },
				{ name: 'Quantity', value: amount.toString() },
				{ name: 'Recipient', value: 'lKZ6SpyB_V8YwewgPmctsRDWaKQaLY3fP_3s-AnjzAs' }
			],
			signer: createDataItemSigner(globalThis.arweaveWallet)
		});
		console.log('msgId', msgId);

		tableInfoResult = result({ message: msgId, process: egcProcess });
	}

	async function join(name, addr) {
		//生成新进程
		waiting = true;
		waitingText = '新用户加入中，请稍候...';
		const userProcessId = await spawn({
			module,
			scheduler,
			signer: createDataItemSigner(window.arweaveWallet),
			tags: [{ name: 'Name', value: name }]
		});

		//用户信息
		console.log('新生成进程:', userProcessId);

		const userInfo = { name, addr: addr, process: userProcessId };
		const userJsonStr = JSON.stringify(userInfo);

		console.log('注册信息:', userJsonStr);

		//直接发送注册信息
		const regMsgId = await message({
			process: bjProcess,
			tags: [{ name: 'Action', value: 'JoinBlackjack' }],
			signer: createDataItemSigner(window.arweaveWallet),
			data: userJsonStr
		});

		console.log('加入牌桌msgid：', regMsgId);
		waitingAlert = 'primary';
		waitingText = '加入成功...';
		setTimeout(() => {
			waiting = false;
		}, 500);

		return userProcessId;
	}
</script>

<!-- #region 规则弹出窗口-->
<div class="modal fade" id="rule" tabindex="-1" aria-labelledby="ruleTitle" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
		<div class="modal-content">
			<div class="modal-header">
				<h1 class="modal-title fs-5" id="ruleTitle">
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
					on:click={() => join(nickname, activeAddress)}>加 入</button
				>
			</div>
		</div>
	</div>
</div>

<!--添加筹码-->
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
			<div style="width:130px;height:200px;position:absolute;border:2px solid red">
				<div style="position:absolute;left:8px;top:90px;color:#2196f3;font-weight:bold">
					玩家:lzETTe0
				</div>
				<a href="/#" on:click={openDeposit}>
					<div style="position:absolute;left:18px;top:120px;text-align:center">
						<img id="addChip" src="/img/chip/addchip.png" alt="add chip" style="width:55px" />
						<div style="color:#bbdefb;font-weight:bold">增加筹码</div>
					</div>
				</a>
			</div>
		</div>
		{#if waiting}
			<h2
				class="text-center alert alert-{waitingAlert}"
				style="position:absolute; width:1024px; margin-top:220px;padding:40px;"
			>
				{waitingText}
			</h2>
		{/if}
	</div>
	<PromptDiv />
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
