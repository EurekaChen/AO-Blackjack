<script lang="ts">
	import { t, locales, locale } from '$lib/i18n';
</script>
<style>
	.main{
		width:1032px;
		min-width: 1032px;		
		border: 4px solid #1565c0;
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
				<h1 class="modal-title fs-5" id="exampleModalCenteredScrollableTitle">{$t('top.rule.title')}</h1>
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

<!--垂直居中容器-->
<div class="container m-auto main shadow-lg" >	
	<!--经考虑后牌桌固定大小1024x576，其它（顶部和底部）可以再加 -->	
	<div class="row back" >
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
									data-bs-target="#exampleModalCenteredScrollable">{$t('top.rule.title')}</a
								>
							</li>
							<li>
								<a
									class="dropdown-item"
									href="./#"
									data-bs-toggle="modal"
									data-bs-target="#exampleModalCenteredScrollable">{$t('top.settings')}</a
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
				<div class="col-md-3 text-end">
					<span role="img" aria-label="Choose Language">🌐</span>
					<select bind:value={$locale} style="background-color: #333;border:none">
						{#each $locales as value}
							<option {value}>{$t(`lang.${value}`)}</option>
						{/each}
					</select>
					<button type="button" class="btn btn-primary">{$t('top.connect')}</button>
				</div>
			</header>
		</div>

		<!--牌桌区域，使用固定宽度1024x756-->
		<div style="background-image: url(/img/{$t('table')}.svg);width:1024px;height:576px;">
			<slot />
		</div>
	</div>
</div>
