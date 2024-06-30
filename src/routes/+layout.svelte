<script lang="ts">
	import { t, locales, locale } from '$lib';
</script>
<style>
	.test-box{
		border:2px solid red;
	}
	.test-box2{
		border:2px solid green;
	}

	.back{
		background-color:#333333;opacity:0.9;width:1024px

	}
</style>

<!-- #region 规则弹出窗口-->
<div
	class="modal fade"
	id="exampleModalCenteredScrollable"
	tabindex="-1"
	aria-labelledby="exampleModalCenteredScrollableTitle"
	aria-hidden="true"
>
	<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
		<div class="modal-content">
			<div class="modal-header">
				<h1 class="modal-title fs-5" id="exampleModalCenteredScrollableTitle">Modal title</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<p>这里是关于21点的规则 。。。</p>
				<br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
				<p>Just like that.</p>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
			</div>
		</div>
	</div>
</div>
<!-- #endregion -->

<!--垂直居中容器-->
<div class="container m-auto test-box" >	

	<div class="row border-secondary border border-3 shadow-lg test-box2 back" >
		<!--经考虑后牌桌固定大小1024x576，其它（顶部和底部）可以再加 -->		
		<div class="container contaner-fruid text-bg-dark mx-0 my-0" style="height: 44px;">
			<!--顶部标题区域-->
			<header class="d-flex align-items-center justify-content-center justify-content-md-between">
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
									data-bs-target="#exampleModalCenteredScrollable">规则</a
								>
							</li>
							<li>
								<a
									class="dropdown-item"
									href="./#"
									data-bs-toggle="modal"
									data-bs-target="#exampleModalCenteredScrollable">设置</a
								>
							</li>
						</ul>
					</span>
				</div>

				<div class="nav col-12 col-md-auto justify-content-center">
					<h2><strong>{$t('content.title')}</strong></h2>
				</div>
				<div class="col-md-3 text-end">
					<span role="img" aria-label="Choose Language">🌐</span>
					<select bind:value={$locale} style="background-color: #333;border:none">
						{#each $locales as value}
							<option {value}>{$t(`lang.${value}`)}</option>
						{/each}
					</select>
					<button type="button" class="btn btn-primary">Connect Wallet</button>
				</div>
			</header>
		</div>

		<!--牌桌区域-->
		<div style="background-image: url(/img/{$t('table')}.svg);width:1024px;height:576px">
			<slot />
		</div>
	</div>
</div>
