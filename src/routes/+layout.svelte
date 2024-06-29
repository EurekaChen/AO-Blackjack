<script lang="ts">
	import { t, locales, locale } from '$lib';
</script>
<!--注bet365大小1540x1090   1920x1080下1024x730 左右-->
<!--因此我取用16:9 因定1200x675 // 1024x576象素，高度1280x720  1200x675  bootstrap 1200断点为1140它宽-->
<!--bet365在1440x900下面也是1024  所以工考虑再三，使得1024x576象素大小的牌桌！576暂不包括标题和尾注-->
<div class="container contaner-fruid text-bg-dark mx-0 my-0" style="height: 44px;">
	<header
		class="d-flex align-items-center justify-content-center justify-content-md-between"
	>
		<div class="col-md-3">
			<span role="img" aria-label="Choose Language">🌐</span>
			<select bind:value={$locale} style="background-color: #333;border:none">
				{#each $locales as value}
					<option {value}>{$t(`lang.${value}`)}</option>
				{/each}
			</select>
		</div>
		<div class="nav col-12 col-md-auto justify-content-center">
			<h2><strong>{$t('content.title')}</strong></h2>
		</div>
		<div class="col-md-3 text-end">			
			<button type="button" class="btn btn-primary">Connect Wallet</button>
		</div>
	</header>   
</div>
<div style="background-image: url(/img/{$t('table')}.svg);width:1024px;height:576px">
<slot />
</div>
