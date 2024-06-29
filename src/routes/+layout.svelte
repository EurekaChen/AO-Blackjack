<script lang="ts">
	import { t, locales, locale } from '$lib';
</script>

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
				<p>
					这里是关于21点的规则
                    。。。
                    
				</p>
				<br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
				<p>Just like that.</p>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>				
			</div>
		</div>
	</div>
</div>

<!--注bet365大小1540x1090   1920x1080下1024x730 左右-->
<!--因此我取用16:9 因定1200x675 // 1024x576象素，高度1280x720  1200x675  bootstrap 1200断点为1140它宽-->
<!--bet365在1440x900下面也是1024  所以工考虑再三，使得1024x576象素大小的牌桌！576暂不包括标题和尾注-->
<div class="container contaner-fruid text-bg-dark mx-0 my-0" style="height: 44px;">
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
					<li><a class="dropdown-item" href="./#"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModalCenteredScrollable"
                    >规则</a></li>
					<li><a class="dropdown-item" href="./#"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModalCenteredScrollable"
                    >设置</a></li>
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



<div style="background-image: url(/img/{$t('table')}.svg);width:1024px;height:576px">
	<slot />
</div>
